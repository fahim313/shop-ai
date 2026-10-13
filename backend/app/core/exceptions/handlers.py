
import logging
from collections.abc import Mapping
from typing import Any, cast

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.types import ExceptionHandler

from app.core.exceptions.exceptions import AppException

logger = logging.getLogger(__name__)


def _error_response(
    status_code: int,
    message: str,
    errors: list[dict[str, Any]] | None = None,
    headers: Mapping[str, str] | None = None,
) -> JSONResponse:
    content: dict[str, Any] = {
        "success": False,
        "message": message,
    }

    if errors:
        content["errors"] = errors

    return JSONResponse(
        status_code=status_code,
        content=content,
        headers=headers,
    )


async def app_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    if not isinstance(exc, AppException):
        raise exc

    return _error_response(
        status_code=exc.status_code,
        message=exc.message,
    )


async def http_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    if not isinstance(exc, StarletteHTTPException):
        raise exc

    return _error_response(
        status_code=exc.status_code,
        message=str(exc.detail),
        headers=exc.headers,
    )


async def validation_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    if not isinstance(exc, RequestValidationError):
        raise exc

    errors: list[dict[str, str]] = []

    for error in exc.errors():
        location = [
            str(part)
            for part in error["loc"]
            if part not in ("body", "query", "path")
        ]

        errors.append(
            {
                "field": ".".join(location),
                "message": error["msg"],
            }
        )

    first_error = errors[0] if errors else None

    message = (
        f"{first_error['field']}: {first_error['message']}"
        if first_error and first_error["field"]
        else "Validation failed"
    )

    return _error_response(
        status_code=422,
        message=message,
        errors=errors,
    )


async def unhandled_exception_handler(
    request: Request,
    exc: Exception,
) -> JSONResponse:
    logger.error(
        "Unhandled error on %s %s",
        request.method,
        request.url.path,
        exc_info=(type(exc), exc, exc.__traceback__),
    )

    return _error_response(
        status_code=500,
        message="Internal server error",
    )


def register_exception_handlers(app: FastAPI) -> None:
    app.add_exception_handler(
        AppException,
        cast(ExceptionHandler, app_exception_handler),
    )
    app.add_exception_handler(
        StarletteHTTPException,
        cast(ExceptionHandler, http_exception_handler),
    )
    app.add_exception_handler(
        RequestValidationError,
        cast(ExceptionHandler, validation_exception_handler),
    )
    app.add_exception_handler(
        Exception,
        cast(ExceptionHandler, unhandled_exception_handler),
    )
