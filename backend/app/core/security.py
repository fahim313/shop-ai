from datetime import UTC, datetime, timedelta

import bcrypt
import jwt

from app.core.config import settings


def _encode_password(password: str) -> bytes:
    return password.encode("utf-8")[:72]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        _encode_password(password),
        bcrypt.gensalt(),
    ).decode("utf-8")


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return bcrypt.checkpw(
            _encode_password(password),
            password_hash.encode("utf-8"),
        )
    except ValueError:
        return False


def create_access_token(user_id: int) -> str:
    expire = datetime.now(UTC) + timedelta(
        minutes=settings.jwt_expire_minutes
    )

    return jwt.encode(
        {
            "sub": str(user_id),
            "exp": expire,
        },
        settings.jwt_secret,
        algorithm="HS256",
    )


def decode_access_token(token: str) -> int | None:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=["HS256"],
        )
        return int(payload["sub"])
    except (jwt.PyJWTError, KeyError, ValueError):
        return None