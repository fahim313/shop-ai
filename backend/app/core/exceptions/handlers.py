from typing import cast

from fastapi import Request
from fastapi.responses import JSONResponse

from app.core.exceptions.exceptions import AppException


async def app_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    app_exc = cast(AppException, exc)

    return JSONResponse(
        status_code=app_exc.status_code,
        content={
            "detail": app_exc.message,
        },
    )