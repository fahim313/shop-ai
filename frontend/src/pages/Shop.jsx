import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import FilterSidebar, {
  CATEGORIES,
  PRICE_RANGES,
} from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";

function getCategory(product) {
  const category =
    typeof product.category === "object"
      ? product.category?.name
      : product.category_name ?? product.category;

  return String(category ?? "");
}

function getCategorySlug(product) {
  const category =
    typeof product.category === "object"
      ? product.category?.slug ?? product.category?.name
      : product.category_slug ??
        product.categorySlug ??
        getCategory(product);

  return String(category ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getProductSizes(product) {
  if (Array.isArray(product.sizes)) {
    return product.sizes.map(String);
  }

  if (Array.isArray(product.available_sizes)) {
    return product.available_sizes.map(String);
  }

  return [];
}

function getPrice(product) {
  const price = Number(product.price);
  return Number.isFinite(price) ? price : 0;
}

function getIsNew(product) {
  return Boolean(product.is_new ?? product.isNew);
}

function getIsFeatured(product) {
  return Boolean(product.is_featured ?? product.isFeatured);
}

function getIsPopular(product) {
  return Boolean(product.is_popular ?? product.isPopular);
}

export default function Shop({
  products = [],
  loading = false,
  error = "",
  refetch,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive URL-based state directly to avoid duplicate state.
  const searchQuery =
    searchParams.get("search") || searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "featured";

  const [priceRange, setPriceRange] = useState("all");
  const [sizes, setSizes] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const updateCategory = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    setSearchParams(params);
  };

  const updateSort = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value === "featured") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    setSearchParams(params, { replace: true });
  };

  const toggleSize = (size) => {
    setSizes((current) =>
      current.includes(size)
        ? current.filter((item) => item !== size)
        : [...current, size],
    );
  };

  const resetFilters = () => {
    setPriceRange("all");
    setSizes([]);

    const params = new URLSearchParams();

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    setSearchParams(params);
    setMobileFilterOpen(false);
  };

  const filteredProducts = useMemo(() => {
    const range =
      PRICE_RANGES.find((item) => item.id === priceRange) ??
      PRICE_RANGES[0];

    const query = searchQuery.trim().toLowerCase();

    return products
      .filter((product) => {
        if (query) {
          const searchableText = [
            product.name,
            getCategory(product),
            product.fabric,
            product.description,
          ]
            .map((value) => String(value ?? "").toLowerCase())
            .join(" ");

          if (!searchableText.includes(query)) {
            return false;
          }
        }

        if (
          category !== "all" &&
          getCategorySlug(product) !== category
        ) {
          return false;
        }

        const price = getPrice(product);

        if (
          priceRange !== "all" &&
          (price < range.min || price > range.max)
        ) {
          return false;
        }

        if (sizes.length > 0) {
          const productSizes = getProductSizes(product);

          if (!sizes.some((size) => productSizes.includes(size))) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return getPrice(a) - getPrice(b);

          case "price-high":
            return getPrice(b) - getPrice(a);

          case "newest":
            return Number(getIsNew(b)) - Number(getIsNew(a));

          case "popular":
            return Number(getIsPopular(b)) - Number(getIsPopular(a));

          case "featured":
          default:
            return (
              Number(getIsFeatured(b)) -
              Number(getIsFeatured(a))
            );
        }
      });
  }, [products, category, priceRange, sizes, searchQuery, sortBy]);

  const activeFiltersCount =
    Number(category !== "all") +
    Number(priceRange !== "all") +
    sizes.length +
    Number(Boolean(searchQuery.trim()));

  const selectedCategoryName = CATEGORIES.find(
    (item) => item.slug === category,
  )?.name;

  return (
    <main className="mx-auto min-h-screen max-w-350 bg-white px-4 py-8 text-neutral-900 sm:px-6 sm:py-12 lg:px-8">
      {/* Catalog Header */}
      <section className="mb-8 border-b border-neutral-200 pb-6">
        <div>
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
            NOIR MEN CATALOG
          </span>

          <h1
            className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {searchQuery
              ? `Search: "${searchQuery}"`
              : selectedCategoryName || "All Products"}
          </h1>

          <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
            Showing{" "}
            <strong className="font-semibold text-neutral-900">
              {filteredProducts.length}
            </strong>{" "}
            styles tailored for everyday luxury
          </p>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-3 text-xs">
            <span className="text-[11px] text-neutral-500">
              Active filters:
            </span>

            {selectedCategoryName && (
              <button
                type="button"
                onClick={() => updateCategory("all")}
                className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-800"
              >
                {selectedCategoryName} ✕
              </button>
            )}

            {priceRange !== "all" && (
              <button
                type="button"
                onClick={() => setPriceRange("all")}
                className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-800"
              >
                {PRICE_RANGES.find((item) => item.id === priceRange)
                  ?.label ?? priceRange}{" "}
                ✕
              </button>
            )}

            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-800"
              >
                Size: {size} ✕
              </button>
            ))}

            <button
              type="button"
              onClick={resetFilters}
              className="ml-2 text-[11px] text-neutral-500 underline hover:text-neutral-900"
            >
              Clear all
            </button>
          </div>
        )}
      </section>

      {/* Catalog Layout */}
      <div className="flex items-start gap-8">
        <aside className="sticky top-24 hidden w-64 shrink-0 rounded-lg border border-neutral-200/80 bg-white p-5 lg:block">
          <FilterSidebar
            products={products}
            category={category}
            setCategory={updateCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            sizes={sizes}
            toggleSize={toggleSize}
            resetFilters={resetFilters}
          />
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-neutral-100 pb-4">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="inline-flex items-center gap-2 rounded border border-neutral-300 px-3.5 py-2 text-xs font-semibold lg:hidden"
            >
              <SlidersHorizontal size={14} />
              Filters

              {activeFiltersCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-900 px-1 text-[10px] font-bold text-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <p className="hidden text-xs text-neutral-500 lg:block">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {filteredProducts.length}
              </span>{" "}
              results
            </p>

            <label className="ml-auto flex items-center gap-2 text-xs text-neutral-500">
              <span className="hidden sm:inline">Sort by:</span>

              <span className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => updateSort(event.target.value)}
                  className="cursor-pointer appearance-none rounded border border-neutral-200 bg-white py-1.5 pl-3 pr-8 text-xs font-semibold text-neutral-900 outline-none focus:border-neutral-900"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500"
                />
              </span>
            </label>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-3/4 rounded-lg bg-neutral-100" />
                  <div className="mt-3 h-3.5 w-3/4 rounded bg-neutral-100" />
                  <div className="mt-2 h-3.5 w-1/3 rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-16 text-center">
              <p className="text-sm text-red-600">
                Could not load products:{" "}
                {typeof error === "string"
                  ? error
                  : error.message || "Unknown error"}
              </p>

              {refetch && (
                <button
                  type="button"
                  onClick={refetch}
                  className="mt-4 inline-flex items-center gap-2 rounded border border-neutral-300 px-4 py-2 text-xs font-semibold"
                >
                  Try again
                </button>
              )}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base font-semibold">
                No products found
              </p>

              <p className="mt-1 text-xs text-neutral-500">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-xs font-semibold underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-xs overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                Filter Products
              </h2>

              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
                className="p-1 text-neutral-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            <FilterSidebar
              products={products}
              category={category}
              setCategory={updateCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sizes={sizes}
              toggleSize={toggleSize}
              resetFilters={resetFilters}
              closeMobile={() => setMobileFilterOpen(false)}
            />
          </aside>
        </div>
      )}
    </main>
  );
}