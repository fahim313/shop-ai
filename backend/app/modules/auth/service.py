from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, verify_password
from app.modules.auth.schemas import LoginRequest
from app.modules.users.models import User


async def login_user(
    db: AsyncSession,
    data: LoginRequest,
) -> str | None:
    user = await db.scalar(
        select(User).where(User.email == data.email)
    )

    if not user or not user.is_active:
        return None

    if not verify_password(data.password, user.password_hash):
        return None

    return create_access_token(user.id)