from functools import lru_cache
from pathlib import Path
from typing import Literal

from pydantic import SecretStr, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.engine import URL

BASE_DIR = Path(__file__).resolve().parents[3]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "shop ai"
    environment: Literal["development", "test", "production"] = "development"
    debug: bool = False

    db_host: str = "localhost"
    db_port: int = 5433
    db_user: str = "postgres"
    db_password: SecretStr = SecretStr("postgres")
    db_name: str = "shop_ai"
    db_schema: str = "public"
    jwt_secret: str
    jwt_expire_minutes: int = 480
    
    admin_email: str = "admin@noirmen.com"
    admin_password: str

    cors_origins: list[str] = [
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ]

    @model_validator(mode="after")
    def check_production_safety(self) -> "Settings":
        if self.environment == "production":
            if self.debug:
                raise ValueError("DEBUG must be disabled in production")

            if self.db_user == "postgres":
                raise ValueError(
                    "The postgres superuser must not be used in production"
                )

            if self.db_password.get_secret_value() in {
                "postgres",
                "password",
                "",
            }:
                raise ValueError(
                    "A strong database password is required in production"
                )

        return self

    @property
    def database_url(self) -> URL:
        return URL.create(
            drivername="postgresql+asyncpg",
            username=self.db_user,
            password=self.db_password.get_secret_value(),
            host=self.db_host,
            port=self.db_port,
            database=self.db_name,
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()