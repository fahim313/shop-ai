import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const price = Number(product.price) || 0;
  const originalPrice = Number(product.original_price ?? product.compare_at_price ?? product.old_price);
  const hasDiscount = Number.isFinite(originalPrice) && originalPrice > price && originalPrice > 0;
  const discount = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const image = product.image_url ?? product.image ?? product.thumbnail ?? "";
  const sizes = Array.isArray(product.sizes) ? product.sizes.map(String) : Array.isArray(product.available_sizes) ? product.available_sizes.map(String) : [];
  const category = typeof product.category === "object" ? product.category?.name : product.category_name ?? product.category;
  const inStock = Number(product.stock) > 0;

  const isNew = Boolean(product.is_new ?? product.isNew);

  return (
    <article className="group min-w-0">
      <Link to={`/shop/${product.slug ?? product.id}`} className="relative block aspect-3/4 overflow-hidden bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            No image available
          </div>
        )}

        {isNew && (
          <span className="absolute left-2 top-2 bg-neutral-900 px-2 py-1 text-[10px] font-semibold uppercase text-white">
            New
          </span>
        )}

        {hasDiscount && (
          <span className={`absolute ${isNew ? "top-9" : "top-2"} left-2 bg-red-700 px-2 py-1 text-[10px] font-semibold text-white`}>
            -{discount}%
          </span>
        )}

        {!inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-white/90 py-2 text-center text-[10px] font-bold uppercase tracking-wider">
            Out of Stock
          </span>
        )}

        <span className="absolute inset-x-0 bottom-0 translate-y-full bg-neutral-900 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white transition-transform group-hover:translate-y-0">
          View Product
        </span>
      </Link>

      <div className="pt-3">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            {category || "NOIR MEN"}
          </span>
          <span className={`text-[10px] ${inStock ? "text-green-700" : "text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <Link to={`/shop/${product.slug ?? product.id}`} className="line-clamp-2 text-[13px] font-semibold leading-snug hover:underline">
          {product.name}
        </Link>

        {sizes.length > 0 && (
          <p className="mt-2 text-[11px] text-neutral-500">Sizes: {sizes.join(" · ")}</p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-bold">৳{price.toLocaleString("en-BD")}</span>
          {hasDiscount && (
            <span className="text-xs text-neutral-400 line-through">৳{originalPrice.toLocaleString("en-BD")}</span>
          )}
        </div>
      </div>
    </article>
  );
}