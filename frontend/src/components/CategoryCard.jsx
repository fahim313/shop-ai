
import { Link } from "react-router-dom";

function getProductCategory(product) {
  const category = product.category_name ?? product.category;

  if (typeof category === "object" && category !== null) {
    return String(category.name ?? category.slug ?? "");
  }

  return String(category ?? "");
}

export default function CategoryCard({ category, products = [] }) {
  const categoryName = String(category.name ?? "");
  const categorySlug = String(category.slug ?? "");
  const categoryId = category.id;

  const count = products.filter((product) => {
    const productCategoryId =
      product.category_id ?? product.category?.id;

    if (
      categoryId != null &&
      productCategoryId != null
    ) {
      return String(productCategoryId) === String(categoryId);
    }

    const productCategory = getProductCategory(product).toLowerCase();

    return (
      productCategory === categoryName.toLowerCase() ||
      productCategory === categorySlug.toLowerCase()
    );
  }).length;

  const image = category.image_url ?? category.image ?? "";

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(categorySlug)}`}
      className="group block"
      aria-label={`Explore ${categoryName}`}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-neutral-100 transition-shadow group-hover:shadow-[0_0_0_1px_#171717]">
        {image ? (
          <img
            src={image}
            alt={categoryName}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image available
          </div>
        )}
      </div>

      <h3 className="mt-2.5 text-[13px] font-semibold">
        {categoryName}
      </h3>

      <p className="text-xs text-neutral-500">
        {count} {count === 1 ? "product" : "products"}
      </p>
    </Link>
  );
}
