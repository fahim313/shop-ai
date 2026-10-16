export default function SizeSelector({
  sizes = [],
  selectedSize = "",
  onSelectSize,
  disabled = false,
}) {
  const normalizedSizes = sizes
    .map((item) => {
      if (typeof item === "string") {
        return { size: item, stock: null };
      }

      return {
        size: item?.size ?? "",
        stock: item?.stock == null ? null : Number(item.stock),
      };
    })
    .filter((item) => item.size);

  if (normalizedSizes.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        Size options are currently unavailable.
      </p>
    );
  }

  const allOutOfStock = normalizedSizes.every(
    ({ stock }) => stock !== null && stock <= 0
  );

  return (
    <fieldset disabled={disabled} className="space-y-3">
      <div className="flex items-center justify-between">
        <legend className="text-sm font-medium text-neutral-900">
          Select Size
        </legend>

        <span className="text-xs text-neutral-500">
          Selected:{" "}
          <span className="font-semibold text-neutral-900">
            {selectedSize || "None"}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {normalizedSizes.map(({ size, stock }) => {
          const isSelected = selectedSize === size;
          const outOfStock = stock !== null && stock <= 0;

          return (
            <button
              key={size}
              type="button"
              disabled={disabled || outOfStock}
              onClick={() => onSelectSize?.(size)}
              aria-pressed={isSelected}
              className={`min-w-12 rounded-md border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-black bg-black text-white"
                  : outOfStock
                    ? "cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 line-through"
                    : "border-neutral-300 bg-white text-neutral-800 hover:border-black"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {allOutOfStock && (
        <p className="text-sm text-red-600">
          All sizes are currently out of stock.
        </p>
      )}
    </fieldset>
  );
}