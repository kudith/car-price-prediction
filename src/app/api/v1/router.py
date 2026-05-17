from fastapi import APIRouter

from app.api.v1.endpoints.predict import router as predict_router
from app.api.v1.endpoints.metadata import router as metadata_router

api_router = APIRouter()
api_router.include_router(predict_router, tags=["prediction"])
api_router.include_router(metadata_router, tags=["metadata"])
