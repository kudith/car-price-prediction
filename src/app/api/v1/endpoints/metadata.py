from fastapi import APIRouter, Depends

from app.api.dependencies import get_model_service
from app.schemas.metadata import (
    ManufacturerListResponse,
    ModelInfoResponse,
    VehicleTypeListResponse,
)
from app.services.model_service import ModelService

router = APIRouter()


@router.get("/info", response_model=ModelInfoResponse)
def get_model_info(
    model_service: ModelService = Depends(get_model_service),
) -> ModelInfoResponse:
    """
    Get detailed information about the machine learning model.
    """
    model_info = model_service.get_model_info()
    return ModelInfoResponse(success=True, data=model_info)


@router.get("/manufacturers", response_model=ManufacturerListResponse)
def get_manufacturers(
    model_service: ModelService = Depends(get_model_service),
) -> ManufacturerListResponse:
    """
    Get the list of all available car manufacturers in the model.
    """
    manufacturers = model_service.get_manufacturers()
    return ManufacturerListResponse(success=True, manufacturers=manufacturers)


@router.get("/vehicle-types", response_model=VehicleTypeListResponse)
def get_vehicle_types(
    model_service: ModelService = Depends(get_model_service),
) -> VehicleTypeListResponse:
    """
    Get the list of all available vehicle types in the model.
    """
    vehicle_types = model_service.get_vehicle_types()
    return VehicleTypeListResponse(success=True, vehicle_types=vehicle_types)
