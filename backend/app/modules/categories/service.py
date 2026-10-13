from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions.exceptions import (
    ConflictException,
    NotFoundException,
)
from app.modules.categories.models import Category
from app.modules.categories.schemas import CategoryCreate, CategoryUpdate


async def create_category(
    db: AsyncSession,
    data: CategoryCreate,
) -> Category:
    existing = await db.scalar(
        select(Category).where(
            (Category.name == data.name) | (Category.slug == data.slug)
        )
    )

    if existing:
        raise ConflictException("Category name or slug already exists")

    category = Category(**data.model_dump())
    db.add(category)
    await db.commit()
    await db.refresh(category)

    return category


async def get_categories(
    db: AsyncSession,
    active_only: bool = True,
) -> list[Category]:
    query = select(Category).order_by(Category.id)

    if active_only:
        query = query.where(Category.is_active.is_(True))

    result = await db.scalars(query)
    return list(result.all())


async def get_category(
    db: AsyncSession,
    category_id: int,
) -> Category:
    category = await db.get(Category, category_id)

    if not category:
        raise NotFoundException(
            resource="Category",
            key="id",
            value=category_id,
        )

    return category


async def update_category(
    db: AsyncSession,
    category_id: int,
    data: CategoryUpdate,
) -> Category:
    category = await get_category(db, category_id)
    updates = data.model_dump(exclude_unset=True)

    if "name" in updates and updates["name"] is not None:
        existing = await db.scalar(
            select(Category).where(
                Category.name == updates["name"],
                Category.id != category_id,
            )
        )
        if existing:
            raise ConflictException("Category name already exists")

    if "slug" in updates and updates["slug"] is not None:
        existing = await db.scalar(
            select(Category).where(
                Category.slug == updates["slug"],
                Category.id != category_id,
            )
        )
        if existing:
            raise ConflictException("Category slug already exists")

    for field, value in updates.items():
        setattr(category, field, value)

    await db.commit()
    await db.refresh(category)

    return category


async def delete_category(
    db: AsyncSession,
    category_id: int,
) -> None:
    category = await get_category(db, category_id)

    await db.delete(category)
    await db.commit()
