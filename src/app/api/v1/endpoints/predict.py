from typing import Annotated

from fastapi import APIRouter, Body, Depends, Request

from app.api.dependencies import get_model_service
from app.core.config import settings
from app.core.limiter import limiter
from app.core.security import get_api_key
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.model_service import ModelService

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post(
    "/predict",
    dependencies=[Depends(get_api_key)],
    summary="Predict car price",
    description="Predict the car price in thousand USD based on vehicle specifications.",
    response_description="Standardized prediction response.",
    responses={
        200: {
            "description": "Prediction generated successfully.",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Prediction generated successfully.",
                        "data": {
                            "predicted_price": 19.07,
                            "currency": "thousand_usd",
                            "model_name": "car_price_model.pkl",
                        },
                    }
                }
            },
        },
        401: {
            "description": "Unauthorized - missing or invalid API key.",
            "content": {
                "application/json": {
                    "example": {"detail": "Invalid or missing API key."}
                }
            },
        },
        400: {
            "description": "Bad request - validation error.",
            "content": {
                "application/json": {
                    "example": {
                        "success": False,
                        "message": "Bad request. Validation failed.",
                        "details": [
                            {
                                "type": "missing",
                                "loc": ["body", "Engine_size"],
                                "msg": "Field required",
                                "input": None,
                            }
                        ],
                    }
                }
            },
        },
        429: {
            "description": "Rate limit exceeded.",
            "content": {
                "application/json": {
                    "example": {
                        "success": False,
                        "message": "Rate limit exceeded.",
                        "details": [{"type": "rate_limit", "limit": "10/minute"}],
                    }
                }
            },
        },
    },
)
@limiter.limit(settings.rate_limit_predict)
def predict(
    request: Request,
    payload: Annotated[
        PredictionRequest,
        Body(
            ..., 
            openapi_examples={
                "sample": {
                    "summary": "Sample car specification",
                    "value": {
                        "Manufacturer": "Toyota",
                        "Vehicle_type": "Sedan",
                        "Engine_size": 2.5,
                        "Horsepower": 180,
                        "Wheelbase": 109,
                        "Width": 70,
                        "Length": 184,
                        "Curb_weight": 3200,
                        "Fuel_capacity": 14,
                        "Fuel_efficiency": 28,
                    },
                }
            },
        ),
    ],
    model_service: Annotated[ModelService, Depends(get_model_service)],
) -> PredictionResponse:
    return model_service.predict(payload)
