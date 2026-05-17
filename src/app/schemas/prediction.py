from pydantic import BaseModel, ConfigDict, Field


class PredictionRequest(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
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
                }
            ]
        }
    )

    Manufacturer: str = Field(..., examples=["Toyota"])
    Vehicle_type: str = Field(..., examples=["Sedan"])
    Engine_size: float = Field(..., ge=0, examples=[2.5])
    Horsepower: float = Field(..., ge=0, examples=[180])
    Wheelbase: float = Field(..., ge=0, examples=[109])
    Width: float = Field(..., ge=0, examples=[70])
    Length: float = Field(..., ge=0, examples=[184])
    Curb_weight: float = Field(..., ge=0, examples=[3200])
    Fuel_capacity: float = Field(..., ge=0, examples=[14])
    Fuel_efficiency: float = Field(..., ge=0, examples=[28])


class ClosestModel(BaseModel):
    index: int
    Manufacturer: str
    Model: str
    Price_in_thousands: float
    Similarity_Score: float


class PredictionData(BaseModel):
    predicted_price: float
    confidence_interval: float
    lower_bound: float
    upper_bound: float
    currency: str = "thousand_usd"
    model_name: str
    explanation: dict[str, str | list[dict[str, float | str]]]
    closest_models: list[ClosestModel] = []


class PredictionResponse(BaseModel):
    model_config = ConfigDict(
        json_schema_extra={
            "examples": [
                {
                    "success": True,
                    "message": "Prediction generated successfully.",
                    "data": {
                        "predicted_price": 19.07,
                        "currency": "thousand_usd",
                        "model_name": "car_price_model.pkl",
                    },
                }
            ]
        }
    )

    success: bool = True
    message: str
    data: PredictionData
