from pathlib import Path

import joblib
import pandas as pd
from fastapi import HTTPException, status

from app.core.config import settings
from app.schemas.metadata import ModelInfo
from app.schemas.prediction import ClosestModel, PredictionData, PredictionRequest, PredictionResponse


def _install_sklearn_compatibility_shim() -> None:
    """
    Install runtime patches for scikit-learn compatibility between different versions.
    This handles cases where models were saved with older/newer versions of scikit-learn
    than the one currently installed.
    """
    # 1. Fix for ColumnTransformer (_RemainderColsList missing in some versions)
    try:
        from sklearn.compose import _column_transformer as column_transformer_module

        if not hasattr(column_transformer_module, "_RemainderColsList"):
            class _RemainderColsList(list):
                pass

            column_transformer_module._RemainderColsList = _RemainderColsList
    except (ImportError, AttributeError):
        pass

    # 2. Fix for SimpleImputer (_fill_dtype missing in older models when loaded in 1.5+)
    try:
        from sklearn.impute import SimpleImputer

        original_setstate = SimpleImputer.__setstate__

        def patched_setstate(self, state):
            if "_fill_dtype" not in state and "_fit_dtype" in state:
                state["_fill_dtype"] = state["_fit_dtype"]
            return original_setstate(self, state)

        if not hasattr(SimpleImputer, "_is_patched"):
            SimpleImputer.__setstate__ = patched_setstate
            SimpleImputer._is_patched = True
    except (ImportError, AttributeError):
        pass


import numpy as np
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances

class ModelService:
    expected_features = [
        "Manufacturer",
        "Vehicle_type",
        "Engine_size",
        "Horsepower",
        "Wheelbase",
        "Width",
        "Length",
        "Curb_weight",
        "Fuel_capacity",
        "Fuel_efficiency",
    ]

    def __init__(self, model_path: Path | None = None) -> None:
        self.model_path = model_path or settings.model_path
        model_data = self._load_model()
        
        if isinstance(model_data, dict):
            self.model = model_data.get("model")
            self.reference_df = model_data.get("reference_df")
            self.selected_features = model_data.get("selected_features", self.expected_features)
        else:
            self.model = model_data
            self.reference_df = None
            self.selected_features = self.expected_features
            
        self._manufacturers = []
        self._vehicle_types = []
        self._feature_importance = {}
        self._rmse = 6.7 # Default fallback if calculation fails
        
        self._extract_categories()
        self._extract_feature_importance()
        self._calculate_base_metrics()

    def _load_model(self):
        if not self.model_path.exists():
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Model file not found at {self.model_path}",
            )

        _install_sklearn_compatibility_shim()

        try:
            return joblib.load(self.model_path)
        except Exception as exc:  # pragma: no cover - runtime compatibility guard
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to load model: {exc}",
            ) from exc

    def _calculate_base_metrics(self) -> None:
        if self.reference_df is not None:
            try:
                # Clean up reference_df columns for processing
                # The inspection showed: [Manufacturer, Model, Price_in_thousands, Manufacturer, Vehicle_type, ...]
                # We want to extract the target and the features
                y_true = self.reference_df.iloc[:, 2].values # Price_in_thousands
                
                # Features are from index 3 onwards
                features_df = self.reference_df.iloc[:, 3:].copy()
                features_df.columns = self.expected_features
                
                y_pred = self.model.predict(features_df)
                self._rmse = float(np.sqrt(np.mean((y_true - y_pred)**2)))
            except Exception as exc:
                print(f"Warning: Could not calculate base metrics: {exc}")

    def _extract_categories(self) -> None:
        try:
            preprocessor = self.model.named_steps.get("preprocessor")
            if not preprocessor:
                return

            cat_pipe = next(t for n, t, c in preprocessor.transformers_ if n == "cat")
            encoder = cat_pipe.named_steps["encoder"]
            
            # Assuming 'Manufacturer' is index 0 and 'Vehicle_type' is index 1 in the 'cat' transformer
            self._manufacturers = sorted(encoder.categories_[0].tolist())
            self._vehicle_types = sorted(encoder.categories_[1].tolist())
        except (AttributeError, StopIteration, IndexError) as exc:
            # Fallback or log error if structure is different
            print(f"Warning: Could not extract categories from model: {exc}")

    def _extract_feature_importance(self) -> None:
        try:
            regressor = self.model.named_steps.get("regressor")
            if not regressor:
                return

            importance_values = []
            if hasattr(regressor, "coef_"):
                importance_values = regressor.coef_.tolist()
            elif hasattr(regressor, "feature_importances_"):
                importance_values = regressor.feature_importances_.tolist()

            if importance_values:
                # We align with expected_features.
                self._feature_importance = dict(zip(self.expected_features, importance_values))
        except Exception as exc:
            print(f"Warning: Could not extract feature importance: {exc}")

    def get_manufacturers(self) -> list[str]:
        return self._manufacturers

    def get_vehicle_types(self) -> list[str]:
        return self._vehicle_types

    def get_model_info(self) -> ModelInfo:
        import platform
        import sklearn
        from datetime import datetime

        pipeline_steps = []
        try:
            if hasattr(self.model, "named_steps"):
                pipeline_steps = list(self.model.named_steps.keys())
        except Exception:
            pass

        params = {}
        try:
            # Extract basic parameters, avoiding potentially large or non-serializable objects
            all_params = self.model.get_params()
            for k, v in all_params.items():
                if isinstance(v, (str, int, float, bool, list, dict, type(None))):
                    params[k] = v
                else:
                    params[k] = str(v)
        except Exception:
            pass

        file_stat = self.model_path.stat()
        
        return ModelInfo(
            name=self.model_path.name,
            type=type(self.model).__name__,
            version=settings.app_version,
            library_versions={
                "scikit-learn": sklearn.__version__,
                "pandas": pd.__version__,
                "joblib": joblib.__version__,
                "python": platform.python_version(),
            },
            file_info={
                "size_bytes": file_stat.st_size,
                "last_modified": datetime.fromtimestamp(file_stat.st_mtime).isoformat(),
            },
            features=self.expected_features,
            feature_importance=self._feature_importance,
            parameters=params,
            pipeline_steps=pipeline_steps,
            manufacturers=self._manufacturers,
            vehicle_types=self._vehicle_types,
        )

    def _get_closest_models(self, input_dict: dict, n: int = 3) -> list[ClosestModel]:
        if self.reference_df is None:
            return []

        try:
            ref = self.reference_df.copy()
            
            # The reference_df has duplicate columns as seen in inspection:
            # [Manufacturer, Model, Price_in_thousands, Manufacturer, Vehicle_type, ...]
            # We use positional indexing to be safe.
            # Index 0: Manufacturer, Index 1: Model, Index 2: Price_in_thousands
            # Index 3-12: Features
            
            manuf = input_dict.get("Manufacturer")
            # Check manufacturer in index 0
            if manuf in ref.iloc[:, 0].values:
                ref = ref[ref.iloc[:, 0] == manuf].copy()

            # Numeric features for distance calculation (exclude Manufacturer and Vehicle_type)
            # These correspond to columns index 5 to 12 in the reference_df
            num_features = self.expected_features[2:] # Engine_size onwards
            
            dist_sq = 0
            for i, feature in enumerate(num_features):
                # Feature index in reference_df is 5 + i
                col_idx = 5 + i
                
                # Use the full reference_df (original self.reference_df) for min/max to match Colab behavior
                f_min = self.reference_df.iloc[:, col_idx].min()
                f_max = self.reference_df.iloc[:, col_idx].max()
                f_range = f_max - f_min if f_max != f_min else 1
                
                input_val = input_dict.get(feature, 0)
                dist_sq += ((ref.iloc[:, col_idx] - input_val) / f_range) ** 2
            
            ref["Similarity_Score"] = np.sqrt(dist_sq)
            closest_df = ref.sort_values("Similarity_Score").head(n)
            
            results = []
            for _, row in closest_df.iterrows():
                results.append(ClosestModel(
                    index=int(row.name),
                    Manufacturer=str(row.iloc[0]),
                    Model=str(row.iloc[1]),
                    Price_in_thousands=float(row.iloc[2]),
                    Similarity_Score=float(row["Similarity_Score"])
                ))
            return results
        except Exception as exc:
            print(f"Warning: Could not find closest models: {exc}")
            import traceback
            traceback.print_exc()
            return []

    def predict(self, payload: PredictionRequest) -> PredictionResponse:
        input_dict = payload.model_dump()
        input_df = pd.DataFrame([input_dict])[self.expected_features]
        prediction = float(self.model.predict(input_df)[0])

        # Confidence interval calculation (95% CI: 1.96 * RMSE)
        ci = 1.96 * self._rmse
        lower_bound = prediction - ci
        upper_bound = prediction + ci

        # Closest models using Colab logic
        closest_models = self._get_closest_models(input_dict)
        
        # Interpretation summary in English
        best_match = closest_models[0] if closest_models else None
        interpretation = f"Predicted price: ${prediction:,.2f}k (Range: ${lower_bound:,.2f}k - ${upper_bound:,.2f}k). "
        if best_match:
            interpretation += (
                f"This specification most closely matches the {best_match.Manufacturer} {best_match.Model} "
                f"with an original price in the database of ${best_match.Price_in_thousands:,.2f}k."
            )

        # Generate explanation based on feature importance
        contributions = []
        for feature, importance in self._feature_importance.items():
            value = input_dict.get(feature)
            if isinstance(value, (int, float)):
                impact = importance * value
                contributions.append({
                    "feature": feature,
                    "impact": impact,
                    "type": "positive" if impact >= 0 else "negative"
                })
        
        contributions = sorted(contributions, key=lambda x: abs(x["impact"]), reverse=True)

        explanation_summary = "Prediction generated based on input features."
        if len(contributions) > 0:
            top_f = contributions[0]["feature"]
            reason = "increases" if contributions[0]["type"] == "positive" else "decreases"
            explanation_summary = f"The predicted price is primarily driven by {top_f}, which {reason} the estimate."

        return PredictionResponse(
            success=True,
            message="Prediction generated successfully.",
            data=PredictionData(
                predicted_price=prediction,
                confidence_interval=abs(upper_bound - prediction),
                lower_bound=lower_bound,
                upper_bound=upper_bound,
                model_name=self.model_path.name,
                explanation={
                    "summary": explanation_summary,
                    "interpretation": interpretation,
                    "feature_contributions": contributions[:5]
                },
                closest_models=closest_models
            ),
        )
