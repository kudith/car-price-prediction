from pathlib import Path
import sys

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded

if __package__ in {None, ""}:
    sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.limiter import limiter


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="API prediksi harga mobil berbasis model Linear Regression.",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda request, exc: JSONResponse(
    status_code=429,
    content={
        "success": False,
        "message": "Rate limit exceeded.",
        "details": [{"type": "rate_limit", "limit": str(exc.detail)}],
    },
))


@app.exception_handler(RequestValidationError)
def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={
            "success": False,
            "message": "Bad request. Validation failed.",
            "details": exc.errors(),
        },
    )

app.include_router(api_router, prefix=settings.api_prefix)


@app.get("/", tags=["health"])
def root() -> dict[str, str]:
    return {
        "message": "Car price prediction API is running.",
        "docs": "/docs",
        "health": "/api/v1/health",
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=False)
