from dataclasses import dataclass
import os
from pathlib import Path

from dotenv import load_dotenv


load_dotenv()


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Car Price Prediction API")
    app_version: str = os.getenv("APP_VERSION", "1.0.0")
    api_prefix: str = "/api/v1"
    api_key_header: str = "X-API-Key"
    api_key_env_name: str = "API_KEY"
    model_filename: str = "car_price_model.pkl"
    rate_limit_default: str = os.getenv("RATE_LIMIT_DEFAULT", "30/minute")
    rate_limit_predict: str = os.getenv("RATE_LIMIT_PREDICT", "10/minute")

    @property
    def model_path(self) -> Path:
        return Path(__file__).resolve().parents[2] / "models" / self.model_filename


settings = Settings()
