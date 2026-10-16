
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Check } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const colors = Array.isArray(product.colors) ? product.colors : [];

  const image = product.image_url ?? "";
  const stock = Number(product.stock);
  const hasStock = Number.isFinite(stock) && stock > 0;

  const productPath = `/shop/${product.slug || product.id}`;

  const category =
    typeof product.category === "object" && product.category !== null
      ? product.category.name ?? ""
      : product.category_name ??
        (typeof product.category === "string" ? product.category : "");

  const previousPrice =
    product.previous_price ?? product.previousPrice ?? null;

  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");
  const [showQuickSelect, setShowQuickSelect] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const discountPercent =
    previousPrice != null &&
    Number(previousPrice) > Number(product.price) &&
    Number(previousPrice) > 0
      ? Math.round(
          ((Number(previousPrice) - Number(product.price)) /
            Number(previousPrice)) *
            100
        )
      : 0;

  const canAddToCart = hasStock && sizes.length > 0;

  function handleQuickAdd(event, size) {
    event.preventDefault();
    event.stopPropagation();

    if (!canAddToCart || !size) return;

    addToCart(product, size, colors[0] ?? null, 1);

    setSelectedSize(size);
    setIsAdded(true);
    setShowQuickSelect(false);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-neutral-200/80 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      <Link
        to={productPath}
        className="relative block aspect-3/4 overflow-hidden bg-[#F5F4F0]"
        aria-label={`View ${product.name}`}
      >
        {image && !imageFailed ? (
          <img
            src={image}
            alt={product.name ?? "Product"}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#EFECE6] p-4 text-center">
            <span className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-400">
              {category}
            </span>

            <p className="text-sm font-medium text-neutral-700">
              {product.name}
            </p>

            <span className="mt-2 text-xs text-neutral-400">
              Image unavailable
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1">
          {(product.is_new ?? product.isNew) && (
            <span className="rounded bg-neutral-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              New
            </span>
          )}

          {discountPercent > 0 && (
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {canAddToCart && (
          <div className="absolute inset-x-2.5 bottom-2.5 z-20 hidden translate-y-2 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 sm:block sm:opacity-0">
            {!showQuickSelect ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setShowQuickSelect(true);
                }}
                className="flex w-full items-center justify-center gap-1.5 rounded border border-neutral-200 bg-white/95 px-3 py-2.5 text-xs font-semibold text-neutral-900 shadow-md transition-colors hover:bg-neutral-900 hover:text-white"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Quick Add</span>
              </button>
            ) : (
              <div
                className="rounded border border-neutral-300 bg-white p-2 shadow-xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] text-neutral-500">
                  <span>Select Size</span>

                  <button
                    type="button"
                    onClick={() => setShowQuickSelect(false)}
                    className="text-neutral-400 hover:text-neutral-900"
                    aria-label="Close size selection"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={(event) => handleQuickAdd(event, size)}
                      className={`h-7 min-w-7 flex-1 rounded border px-2 text-[11px] font-medium transition-colors ${
                        selectedSize === size
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-200 hover:bg-neutral-900 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="mb-1 flex items-center justify-between gap-2 text-xs text-neutral-500">
          <span className="truncate text-[11px] font-medium uppercase tracking-wider">
            {category}
          </span>

          <span
            className={`shrink-0 text-[11px] ${
              hasStock ? "text-emerald-700" : "text-red-600"
            }`}
          >
            {hasStock ? `${stock} Available` : "Out of Stock"}
          </span>
        </div>

        <Link
          to={productPath}
          className="mb-2 line-clamp-1 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 sm:text-base"
          title={product.name}
        >
          {product.name}
        </Link>

        {sizes.length > 0 && (
          <div className="mb-3 flex items-center gap-1 text-[11px] text-neutral-400">
            <span>Sizes:</span>
            <span className="font-medium text-neutral-600">
              {sizes.join(" · ")}
            </span>
          </div>
        )}

        {colors.length > 0 && (
          <div className="mb-3 flex items-center gap-1 text-[11px] text-neutral-400">
            <span>Colors:</span>
            <span className="font-medium text-neutral-600">
              {colors.join(" · ")}
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-bold tabular-nums text-neutral-900 sm:text-lg">
              {formatPrice(product.price)}
            </span>

            {previousPrice != null &&
              Number(previousPrice) > Number(product.price) && (
                <span className="text-xs tabular-nums text-neutral-400 line-through">
                  {formatPrice(previousPrice)}
                </span>
              )}
          </div>

          <button
            type="button"
            onClick={(event) => handleQuickAdd(event, selectedSize)}
            disabled={!canAddToCart}
            aria-label={`Add ${product.name ?? "product"} to cart`}
            title={
              !hasStock
                ? "Out of stock"
                : sizes.length === 0
                  ? "Size options unavailable"
                  : "Add to cart"
            }
            className={`rounded p-2 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-neutral-900 text-white active:scale-95"
            } sm:hidden`}
          >
            {isAdded ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        </div>

        {!hasStock && (
          <p className="mt-2 text-xs text-red-600">
            This product is currently unavailable.
          </p>
        )}

        {hasStock && sizes.length === 0 && (
          <p className="mt-2 text-xs text-neutral-500">
            Size options unavailable.
          </p>
        )}
      </div>
    </div>
  );
}
