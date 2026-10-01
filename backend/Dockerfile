# ---------- Stage 1: Build dependencies ----------
FROM python:3.13.3-slim AS builder

# Copy uv from the pinned official uv image
COPY --from=ghcr.io/astral-sh/uv:0.12.17 /uv /usr/local/bin/uv

WORKDIR /app

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# Copy dependency files first to improve Docker layer caching
COPY pyproject.toml uv.lock ./

# Install production dependencies into the virtual environment
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --no-dev


# ---------- Stage 2: Runtime ----------
FROM python:3.13.3-slim

# Create a non-root user for better security
RUN groupadd --system app && \
    useradd --system --gid app --create-home app

WORKDIR /app

# Copy the virtual environment from the builder stage
COPY --from=builder /app/.venv /app/.venv

# Use the virtual environment and configure Python
ENV PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copy application files
COPY --chown=app:app app/ ./app/
COPY --chown=app:app alembic/ ./alembic/
COPY --chown=app:app alembic.ini ./
COPY --chown=app:app scripts/ ./scripts/

# Run the application as a non-root user
USER app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]