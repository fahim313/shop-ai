
from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class ProductCreate(BaseModel):
    category_id: int = Field(gt=0)
    name: str = Field(min_length=2, max_length=200)
    slug: str = Field(min_length=2, max_length=220)
    description: str | None = None
    price: int = Field(ge=0)
    stock: int = Field(default=0, ge=0)
    image_url: HttpUrl | None = None
    is_active: bool = True
    is_featured: bool = False
    is_new: bool = False


class ProductUpdate(BaseModel):
    category_id: int | None = Field(default=None, gt=0)
    name: str | None = Field(default=None, min_length=2, max_length=200)
    slug: str | None = Field(default=None, min_length=2, max_length=220)
    description: str | None = None
    price: int | None = Field(default=None, ge=0)
    stock: int | None = Field(default=None, ge=0)
    image_url: HttpUrl | None = None
    is_active: bool | None = None
    is_featured: bool | None = None
    is_new: bool | None = None


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: int
    name: str
    slug: str
    description: str | None
    price: int
    stock: int
    image_url: str | None
    is_active: bool
    is_featured: bool
    is_new: bool
