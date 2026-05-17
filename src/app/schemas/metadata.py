from pydantic import BaseModel, ConfigDict


class ModelInfo(BaseModel):
    name: str
    type: str
    version: str
    library_versions: dict[str, str]
    file_info: dict[str, str | int]
    features: list[str]
    feature_importance: dict[str, float]
    parameters: dict
    pipeline_steps: list[str]
    manufacturers: list[str]
    vehicle_types: list[str]


class ModelInfoResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "success": True,
                    "data": {
                        "name": "car_price_model.pkl",
                        "type": "Pipeline",
                        "version": "1.0.0",
                        "library_versions": {
                            "scikit-learn": "1.5.0",
                            "pandas": "2.2.0",
                            "joblib": "1.4.0",
                            "python": "3.11.0"
                        },
                        "file_info": {
                            "size_bytes": 1024,
                            "last_modified": "2024-01-01T00:00:00"
                        },
                        "features": ["Manufacturer", "Vehicle_type", "Engine_size", "Horsepower", "Wheelbase", "Width", "Length", "Curb_weight", "Fuel_capacity", "Fuel_efficiency"],
                        "parameters": {"memory": None, "steps": "..."},
                        "pipeline_steps": ["preprocessor", "regressor"],
                        "manufacturers": ["Acura", "Audi"],
                        "vehicle_types": ["Car", "Passenger"]
                    }
                }
            ]
        }
    )
    success: bool = True
    data: ModelInfo


class ManufacturerListResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "success": True,
                    "manufacturers": ["Acura", "Audi", "BMW"]
                }
            ]
        }
    )
    success: bool = True
    manufacturers: list[str]


class VehicleTypeListResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "success": True,
                    "vehicle_types": ["Car", "Passenger"]
                }
            ]
        }
    )
    success: bool = True
    vehicle_types: list[str]
