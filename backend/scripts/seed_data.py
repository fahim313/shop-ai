import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import SessionLocal
from app.modules.categories.models import Category
from app.modules.products.models import Product

CATEGORIES = [
    {"name": "Panjabi", "slug": "panjabi"},
    {"name": "T-Shirts", "slug": "t-shirts"},
    {"name": "Shirts", "slug": "shirts"},
    {"name": "Pants", "slug": "pants"},
]

PRODUCTS = [
    {
        "name": "Classic Cotton Panjabi",
        "slug": "classic-cotton-panjabi",
        "category_slug": "panjabi",
        "description": "Classic cotton panjabi for everyday wear.",
        "price": 1800,
        "stock": 20,
        "image_url": None,
    },
    {
        "name": "Basic Oversized T-Shirt",
        "slug": "basic-oversized-t-shirt",
        "category_slug": "t-shirts",
        "description": "Comfortable oversized cotton t-shirt.",
        "price": 750,
        "stock": 30,
        "image_url": None,
    },
    {
        "name": "Casual Oxford Shirt",
        "slug": "casual-oxford-shirt",
        "category_slug": "shirts",
        "description": "Versatile casual shirt for daily wear.",
        "price": 1250,
        "stock": 15,
        "image_url": None,
    },
    {
        "name": "Slim Fit Chino Pants",
        "slug": "slim-fit-chino-pants",
        "category_slug": "pants",
        "description": "Slim fit chino pants for casual outfits.",
        "price": 1500,
        "stock": 12,
        "image_url": None,
    },
]


async def seed_data(db: AsyncSession) -> None:
    for item in CATEGORIES:
        category = await db.scalar(
            select(Category).where(Category.slug == item["slug"])
        )

        if category is None:
            db.add(Category(**item))

    await db.flush()

    categories = {
        category.slug: category.id
        for category in (await db.scalars(select(Category))).all()
    }

    for item in PRODUCTS:
        existing = await db.scalar(
            select(Product).where(Product.slug == item["slug"])
        )

        if existing is None:
            product_data = {
                key: value
                for key, value in item.items()
                if key != "category_slug"
            }
            product_data["category_id"] = categories[item["category_slug"]]
            db.add(Product(**product_data))

    await db.commit()


async def main() -> None:
    async with SessionLocal() as db:
        try:
            await seed_data(db)
            print("Seed data inserted successfully.")
        except Exception:
            await db.rollback()
            raise


if __name__ == "__main__":
    asyncio.run(main())