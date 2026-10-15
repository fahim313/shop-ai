import { Link } from "react-router-dom";

function getOriginalPrice(product) {
  return Number(product.original_price ?? product.compare_at_price ?? 0);
}

function getImage(product) {
  return product.image_url ?? product.image ?? "";
}

function isNewProduct(product) {
  return Boolean(product.is_new ?? product.isNew);
}

export default function ProductGrid({ products = [], columns = 4 }) {
  if (products.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-neutral-300 px-5 py-16 text-center">
        <h3 className="text-sm font-semibold text-neutral-900">No products found</h3>
        <p className="mt-1 text-xs text-neutral-500">Try changing your search or filter criteria.</p>
      </div>
    );
  }

  const gridColsClass =
    columns === 3
      ? "grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8"
      : "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8";

  return (
    <div className={`grid ${gridColsClass}`}>
      {products.map((product) => {
        const originalPrice = getOriginalPrice(product);
        const price = Number(product.price) || 0;
        const image = getImage(product);
        const productUrl = `/shop/${product.slug ?? product.id}`;
        const inStock = Number(product.stock ?? 1) > 0;

        const discount =
          originalPrice > price && originalPrice > 0
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

        return (
          <article key={product.id} className="group min-w-0">
            <Link to={productUrl} className="relative block aspect-3/4 overflow-hidden rounded-lg bg-neutral-100">
              {image ? (
                <img
                  src={image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                  No image available
                </div>
              )}

              {isNewProduct(product) && (
                <span className="absolute left-2.5 top-2.5 rounded bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
                  New
                </span>
              )}

              {discount > 0 && (
                <span className="absolute right-2.5 top-2.5 rounded bg-red-700 px-2 py-0.5 text-[10px] font-semibold text-white">
                  -{discount}%
                </span>
              )}

              {!inStock && (
                <span className="absolute bottom-2.5 left-2.5 rounded bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase text-neutral-900">
                  Out of stock
                </span>
              )}
            </Link>

            <div className="pt-3">
              <p className="mb-1 text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                {product.category_name ?? (typeof product.category === "string" ? product.category : product.category?.name) ?? "NOIR MEN"}
              </p>

              <Link to={productUrl} className="line-clamp-1 text-xs sm:text-sm font-semibold transition hover:text-neutral-500 text-neutral-900">
                {product.name}
              </Link>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="font-bold text-neutral-900">
                  ৳{price.toLocaleString("en-BD")}
                </span>
                {originalPrice > price && (
                  <span className="text-xs text-neutral-400 line-through">
                    ৳{originalPrice.toLocaleString("en-BD")}
                  </span>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}