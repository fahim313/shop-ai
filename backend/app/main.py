from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.exceptions.exceptions import (
    AppException,
    ServiceUnavailableException,
)
from app.core.exceptions.handlers import app_exception_handler
from app.db.session import get_db
from app.modules.auth.router import router as auth_router

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)


app.add_exception_handler(
    AppException,
    app_exception_handler,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    auth_router,
    prefix="/api",
)


@app.get("/api/health")
async def health(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("SELECT 1"))

        vector = (
            await db.execute(
                text(
                    "SELECT extname FROM pg_extension "
                    "WHERE extname = 'vector'"
                )
            )
        ).scalar()

    except SQLAlchemyError:
        raise ServiceUnavailableException("Database unavailable")

    return {
        "status": "ok",
        "environment": settings.environment,
        "database": "connected",
        "pgvector": vector == "vector",
    }