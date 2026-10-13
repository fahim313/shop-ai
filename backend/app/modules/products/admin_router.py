from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import require_admin
from app.modules.products.models import Product
from app.modules.products.schemas import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)
from app.modules.products.service import (
    create_product,
    delete_product,
    update_product,
)

router = APIRouter(
    prefix="/admin/products",
    tags=["Admin Products"],
    dependencies=[Depends(require_admin)],
)


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    data: ProductCreate,
    db: AsyncSession = Depends(get_db),
) -> Product:
    return await create_product(db, data)


@router.patch("/{product_id}", response_model=ProductResponse)
async def update(
    product_id: int,
    data: ProductUpdate,
    db: AsyncSession = Depends(get_db),
) -> Product:
    return await update_product(db, product_id, data)


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete(
    product_id: int,
    db: AsyncSession = Depends(get_db),
) -> Response:
    await delete_product(db, product_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)