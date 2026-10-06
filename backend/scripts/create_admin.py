import asyncio

from sqlalchemy import select

from app.core.config import settings
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.modules.users.models import User


async def create_admin() -> None:
    async with SessionLocal() as db:
        result = await db.scalar(
            select(User).where(User.email == settings.admin_email)
        )

        if result:
            print(f"Admin already exists: {settings.admin_email}")
            return

        admin = User(
            name="Admin",
            email=settings.admin_email,
            password_hash=hash_password(settings.admin_password),
            role="admin",
            is_active=True,
        )

        db.add(admin)
        await db.commit()

        print(f"Admin created: {settings.admin_email}")


if __name__ == "__main__":
    asyncio.run(create_admin())