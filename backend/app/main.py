from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db


class Product(BaseModel):
    id: int
    name: str
    price: float


products = []

app = FastAPI(
    title=settings.app_name,
    debug=settings.debug,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
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
        raise HTTPException(
            status_code=503,
            detail="Database unavailable",
        )

    return {
        "status": "ok",
        "environment": settings.environment,
        "database": "connected",
        "pgvector": vector == "vector",
    }


@app.get("/api/products")
async def get_products():
    return {"products": products}


@app.post("/api/products")
async def create_product(product: Product):
    products.append(product)
    return {
        "message": "Product created successfully",
        "product": product,
    }