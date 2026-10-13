from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.exceptions.exceptions import (
    ForbiddenException,
    UnauthorizedException,
)
from app.core.security import decode_access_token
from app.db.session import get_db
from app.modules.users.models import User

bearer = HTTPBearer(auto_error=False)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
    db: AsyncSession = Depends(get_db),
) -> User:
    token = credentials.credentials if credentials else None
    user_id = decode_access_token(token) if token else None

    user = await db.get(User, user_id) if user_id else None

    if not user or not user.is_active:
        raise UnauthorizedException("Not authenticated")

    return user


async def require_admin(
    user: User = Depends(get_current_user),
) -> User:
    if user.role != "admin":
        raise ForbiddenException("Admin access required")

    return user
