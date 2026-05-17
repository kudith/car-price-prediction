from functools import lru_cache

from app.services.model_service import ModelService


@lru_cache(maxsize=1)
def get_model_service() -> ModelService:
    return ModelService()
