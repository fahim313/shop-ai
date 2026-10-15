import { RotateCcw } from "lucide-react";

export const CATEGORIES = [
  { name: "Panjabi", slug: "panjabi" },
  { name: "T-Shirts", slug: "t-shirts" },
  { name: "Shirts", slug: "shirts" },
  { name: "Pants", slug: "pants" },
];

export const PRICE_RANGES = [
  { label: "All Prices", id: "all", min: 0, max: Infinity },
  { label: "Under ৳1,000", id: "under-1000", min: 0, max: 999 },
  { label: "৳1,000 – ৳2,000", id: "1000-2000", min: 1000, max: 2000 },
  { label: "৳2,000 – ৳3,000", id: "2000-3000", min: 2000, max: 3000 },
  { label: "Over ৳3,000", id: "over-3000", min: 3001, max: Infinity },
];

export const SIZES = ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"];

export default function FilterSidebar({
  products = [],
  category = "all",
  setCategory,
  priceRange = "all",
  setPriceRange,
  sizes = [],
  toggleSize,
  resetFilters,
  closeMobile,
}) {
  const categoryCounts = CATEGORIES.map((item) => ({
    ...item,
    count: products.filter((product) => {
      const cat =
        typeof product.category === "object"
          ? product.category?.slug ?? product.category?.name
          : product.category_name ?? product.category;
      const slug = String(cat ?? "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return slug === item.slug;
    }).length,
  }));

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
        <h2 className="text-sm font-bold uppercase tracking-wider">Filters</h2>
        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-neutral-500 hover:text-black"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </div>

      {/* Category */}
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider">
          Category
        </h3>
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              closeMobile?.();
            }}
            className={`flex w-full items-center justify-between text-left text-sm ${
              category === "all"
                ? "font-semibold text-black"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            All Products
            <span className="text-xs text-neutral-400">
              {products.length}
            </span>
          </button>

          {categoryCounts.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setCategory(item.slug);
                closeMobile?.();
              }}
              className={`flex w-full items-center justify-between gap-2 text-left text-sm ${
                category === item.slug
                  ? "font-semibold text-black"
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              <span>{item.name}</span>
              <span className="text-xs text-neutral-400">
                {item.count} Designs
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Price */}
      <section className="border-t border-neutral-200 pt-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider">
          Price Range
        </h3>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.id}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-neutral-600"
            >
              <input
                type="radio"
                name="price-range"
                checked={priceRange === range.id}
                onChange={() => setPriceRange(range.id)}
                className="accent-black"
              />
              {range.label}
            </label>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="border-t border-neutral-200 pt-6">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider">
          Size
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`rounded border px-2 py-2 text-xs transition-colors ${
                  active
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 text-neutral-600 hover:border-black"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={() => closeMobile?.()}
        className="w-full rounded bg-neutral-900 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 lg:hidden"
      >
        Show Products
      </button>
    </div>
  );
}