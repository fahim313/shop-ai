from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.modules.categories.models import Category
from app.modules.categories.schemas import CategoryResponse
from app.modules.categories.service import get_categories, get_category

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=list[CategoryResponse])
async def list_categories(
    db: AsyncSession = Depends(get_db),
) -> list[Category]:
    return await get_categories(db)


@router.get("/{category_id}", response_model=CategoryResponse)
async def retrieve_category(
    category_id: int,
    db: AsyncSession = Depends(get_db),
) -> Category:
    return await get_category(db, category_id)
