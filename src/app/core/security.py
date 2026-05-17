import os
import secrets

from fastapi import Depends, HTTPException, status
from fastapi.security import APIKeyHeader

from app.core.config import settings

api_key_header = APIKeyHeader(name=settings.api_key_header, auto_error=False)


def get_api_key(x_api_key: str | None = Depends(api_key_header)) -> str:
    expected_key = os.getenv(settings.api_key_env_name)

    if not expected_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Environment variable {settings.api_key_env_name} is not configured.",
        )

    if not x_api_key or not secrets.compare_digest(x_api_key, expected_key):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key.",
        )

    return x_api_key
