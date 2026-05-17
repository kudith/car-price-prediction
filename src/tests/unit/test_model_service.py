from pathlib import Path
from unittest.mock import MagicMock

from app.schemas.prediction import PredictionRequest
from app.services.model_service import ModelService


class DummyModel:
    def __init__(self):
        self.named_steps = MagicMock()
        # Mock preprocessor and regressor
        self.named_steps.get.side_effect = lambda x: MagicMock()
        self.named_steps.__getitem__.side_effect = lambda x: MagicMock()
        
    def predict(self, data):
        return [123.45]


def test_model_service_predict(monkeypatch):
    # Mock _load_model to return our DummyModel
    dummy = DummyModel()
    monkeypatch.setattr(ModelService, "_load_model", lambda self: dummy)
    
    # Mock _calculate_base_metrics and _get_closest_models to avoid issues with DummyModel
    monkeypatch.setattr(ModelService, "_calculate_base_metrics", lambda self: None)
    monkeypatch.setattr(ModelService, "_get_closest_models", lambda self, input_df, n=3: [])
    
    service = ModelService(model_path=Path("/tmp/unused.pkl"))

    payload = PredictionRequest(
        Manufacturer="Toyota",
        Vehicle_type="Sedan",
        Engine_size=2.5,
        Horsepower=180,
        Wheelbase=109,
        Width=70,
        Length=184,
        Curb_weight=3200,
        Fuel_capacity=14,
        Fuel_efficiency=28,
    )

    result = service.predict(payload)

    assert result.data.predicted_price == 123.45
    assert result.data.currency == "thousand_usd"
    assert result.data.confidence_interval >= 0
    assert result.data.lower_bound <= 123.45
    assert result.data.upper_bound >= 123.45
    assert result.success is True
