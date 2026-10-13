from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions.exceptions import (
    ConflictException,
    NotFoundException,
)
from app.modules.categories.models import Category
from app.modules.products.models import Product
from app.modules.products.schemas import ProductCreate, ProductUpdate


async def create_product(
    db: AsyncSession,
    data: ProductCreate,
) -> Product:
    category = await db.get(Category, data.category_id)

    if not category:
        raise NotFoundException(
            resource="Category",
            key="id",
            value=data.category_id,
        )

    existing = await db.scalar(
        select(Product).where(Product.slug == data.slug)
    )
    if existing:
        raise ConflictException("Product slug already exists")

    product = Product(**data.model_dump(mode="json"))
    db.add(product)
    await db.commit()
    await db.refresh(product)

    return product


async def get_products(
    db: AsyncSession,
    category_id: int | None = None,
    active_only: bool = True,
) -> list[Product]:
    query = select(Product).order_by(Product.id)

    if active_only:
        query = query.where(Product.is_active.is_(True))

    if category_id is not None:
        query = query.where(Product.category_id == category_id)

    result = await db.scalars(query)
    return list(result.all())


async def get_product(
    db: AsyncSession,
    product_id: int,
    active_only: bool = True,
) -> Product:
    product = await db.get(Product, product_id)

    if not product or (active_only and not product.is_active):
        raise NotFoundException(
            resource="Product",
            key="id",
            value=product_id,
        )

    return product


async def update_product(
    db: AsyncSession,
    product_id: int,
    data: ProductUpdate,
) -> Product:
    product = await get_product(db, product_id, active_only=False)
    updates = data.model_dump(exclude_unset=True, mode="json")

    if updates.get("category_id") is not None:
        category = await db.get(Category, updates["category_id"])
        if not category:
            raise NotFoundException(
                resource="Category",
                key="id",
                value=updates["category_id"],
            )

    if updates.get("slug") is not None:
        existing = await db.scalar(
            select(Product).where(
                Product.slug == updates["slug"],
                Product.id != product_id,
            )
        )
        if existing:
            raise ConflictException("Product slug already exists")

    for field, value in updates.items():
        setattr(product, field, value)

    await db.commit()
    await db.refresh(product)

    return product


async def delete_product(
    db: AsyncSession,
    product_id: int,
) -> None:
    product = await get_product(db, product_id, active_only=False)

    await db.delete(product)
    await db.commit()