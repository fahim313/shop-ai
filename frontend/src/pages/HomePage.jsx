import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { api } from "../services/api";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";

export default function Home() {
  const {
    products = [],
    loading,
    error,
    refreshProducts,
  } = useProducts();

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);

        const response = await api.getCategories();

        if (!response.success || !Array.isArray(response.data)) {
          throw new Error("Invalid categories API response");
        }

        if (!cancelled) {
          setCategories(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setCategories([]);
          setCategoriesError(err.message);
          console.error("Failed to load categories:", err);
        }
      } finally {
        if (!cancelled) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  const featuredProducts = products
    .filter((product) => product.is_featured ?? product.isFeatured)
    .slice(0, 8);

  const newArrivals = products
    .filter((product) => product.is_new ?? product.isNew)
    .slice(0, 4);

  const sectionClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

  if (loading) {
    return (
      <main className={`${sectionClass} py-20 text-center`}>
        <p className="text-gray-600">Loading products...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={`${sectionClass} py-20 text-center`}>
        <p className="mb-4 text-red-600">
          Failed to load products. Please try again.
        </p>

        <button
          type="button"
          onClick={() => refreshProducts()}
          className="rounded-md bg-black px-5 py-2 text-white transition hover:bg-gray-800"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main>
      {/* Shop by Category */}
      <section className={`${sectionClass} py-12`}>
        <SectionHeading
          title="Shop by Category"
          subtitle="Explore our collections"
        />

        {categoriesLoading ? (
          <p className="mt-8 text-center text-gray-500">
            Loading categories...
          </p>
        ) : categoriesError ? (
          <div className="mt-8 text-center">
            <p className="text-red-600">Failed to load categories.</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
            >
              Retry
            </button>
          </div>
        ) : categories.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                products={products}
              />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">
            No categories available.
          </p>
        )}
      </section>

      {/* Featured Products */}
      <section className={`${sectionClass} py-12`}>
        <SectionHeading
          title="Featured Products"
          subtitle="Discover our selected pieces"
        />

        {featuredProducts.length > 0 ? (
          <div className="mt-8">
            <ProductGrid products={featuredProducts} />
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">
            No featured products available.
          </p>
        )}
      </section>

      {/* Promotional Banner */}
      <section className={`${sectionClass} py-6`}>
        <div className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-black px-6 py-10 text-center text-white sm:px-10 md:flex-row md:text-left">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
              A little something for you
            </p>

            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Confidence in every detail.
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-300">
              Use code{" "}
              <span className="font-semibold text-white">NOIR10</span>{" "}
              at checkout for 10% off your order.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200"
          >
            Shop Now
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className={`${sectionClass} py-12`}>
        <SectionHeading
          title="New Arrivals"
          subtitle="Explore the latest additions"
        />

        {newArrivals.length > 0 ? (
          <div className="mt-8">
            <ProductGrid products={newArrivals} />
          </div>
        ) : (
          <p className="mt-8 text-center text-gray-500">
            No new arrivals available.
          </p>
        )}
      </section>

      {/* Shopping Benefits */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className={`${sectionClass} py-10`}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                <span role="img" aria-label="Delivery truck">
                  🚚
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Fast &amp; Reliable Delivery
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Across Bangladesh
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                <span role="img" aria-label="Security shield">
                  🛡️
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Secure Shopping
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your data is safe with us
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:justify-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                <span role="img" aria-label="Return">
                  ↺
                </span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Easy Returns
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  7 days return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}