from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.auth.dependencies import require_admin
from app.modules.categories.models import Category
from app.modules.categories.schemas import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)
from app.modules.categories.service import (
    create_category,
    delete_category,
    update_category,
)

router = APIRouter(
    prefix="/admin/categories",
    tags=["Admin Categories"],
    dependencies=[Depends(require_admin)],
)


@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create(
    data: CategoryCreate,
    db: AsyncSession = Depends(get_db),
) -> Category:
    return await create_category(db, data)


@router.patch("/{category_id}", response_model=CategoryResponse)
async def update(
    category_id: int,
    data: CategoryUpdate,
    db: AsyncSession = Depends(get_db),
) -> Category:
    return await update_category(db, category_id, data)


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    category_id: int,
    db: AsyncSession = Depends(get_db),
) -> Response:
    await delete_category(db, category_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)