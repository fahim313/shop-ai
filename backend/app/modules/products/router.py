from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.products.models import Product
from app.modules.products.schemas import ProductResponse
from app.modules.products.service import get_product, get_products

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=list[ProductResponse])
async def list_products(
    category_id: int | None = Query(default=None, gt=0),
    db: AsyncSession = Depends(get_db),
) -> list[Product]:
    return await get_products(db, category_id=category_id)


@router.get("/{product_id}", response_model=ProductResponse)
async def retrieve_product(
    product_id: int,
    db: AsyncSession = Depends(get_db),
) -> Product:
    return await get_product(db, product_id)