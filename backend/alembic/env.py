from logging.config import fileConfig

from sqlalchemy import text

from alembic import context
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Import new feature models here so Alembic can detect their tables.
# from app.products import models as products_models

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata


def run_migrations_offline() -> None:
    context.configure(
        url=settings.database_url.render_as_string(hide_password=False),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    with engine.connect() as connection:
        connection.execute(
            text(f'CREATE SCHEMA IF NOT EXISTS "{settings.db_schema}"')
        )
        connection.commit()

        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()