import pytest
from fastapi.testclient import TestClient

from app.api.dependencies import get_model_service
from app.main import app
from app.schemas.prediction import PredictionData, PredictionResponse


class FakeModelService:
    def get_manufacturers(self):
        return ["Acura", "Audi", "BMW", "Toyota"]

    def get_vehicle_types(self):
        return ["Car", "Passenger"]

    def get_model_info(self):
        from app.schemas.metadata import ModelInfo
        return ModelInfo(
            name="car_price_model.pkl",
            type="Pipeline",
            version="1.0.0",
            library_versions={
                "scikit-learn": "1.5.0",
                "pandas": "2.2.0",
                "joblib": "1.4.0",
                "python": "3.11.0",
            },
            file_info={
                "size_bytes": 1024,
                "last_modified": "2024-01-01T00:00:00",
            },
            features=[
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
            ],
            feature_importance={
                "Engine_size": 1.5,
                "Horsepower": 2.0,
            },
            parameters={"step1": "scaler", "step2": "regressor"},
            pipeline_steps=["preprocessor", "regressor"],
            manufacturers=self.get_manufacturers(),
            vehicle_types=self.get_vehicle_types(),
        )

    def predict(self, payload):
        return PredictionResponse(
            success=True,
            message="Prediction generated successfully.",
            data=PredictionData(
                predicted_price=19.07,
                model_name="car_price_model.pkl",
                explanation={
                    "summary": "The predicted price is primarily driven by Horsepower.",
                    "feature_contributions": [
                        {"feature": "Horsepower", "impact": 10.5, "type": "positive"},
                        {"feature": "Engine_size", "impact": 5.2, "type": "positive"}
                    ]
                }
            ),
        )


@pytest.fixture(autouse=True)
def api_key_env(monkeypatch):
    monkeypatch.setenv("API_KEY", "test-api-key")


@pytest.fixture()
def client():
    app.dependency_overrides[get_model_service] = lambda: FakeModelService()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
