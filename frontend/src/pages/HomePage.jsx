import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import useProducts from "../hooks/useProducts";

import panjabiImg from "../assets/images/category-panjabi.jpg";
import pantsImg from "../assets/images/category-pants.jpg";
import shirtsImg from "../assets/images/category-shirts.jpg";
import tshirtsImg from "../assets/images/category-tshirts.jpg";

import CategoryCard from "../components/CategoryCard";

const categories = [
  {
    name: "Panjabi",
    image: panjabiImg,
    slug: "panjabi",
    search: "panjabi",
  },
  {
    name: "Shirts",
    image: shirtsImg,
    slug: "shirts",
    search: "shirt",
  },
  {
    name: "T-Shirts",
    image: tshirtsImg,
    slug: "t-shirts",
    search: "t-shirt",
  },
  {
    name: "Pants",
    image: pantsImg,
    slug: "pants",
    search: "pant",
  },
];

function SectionHeading({ title, description, link = "/shop" }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[22px] font-semibold leading-tight tracking-tight">
          {title}
        </h2>

        <p className="mt-1 text-[13px] text-neutral-500">
          {description}
        </p>
      </div>

      <Link
        to={link}
        className="shrink-0 text-xs underline underline-offset-4 hover:text-neutral-500"
      >
        Explore all
      </Link>
    </div>
  );
}

function ProductCard({ product }) {
  const price = Number(product.price);

  const originalPrice = Number(
    product.original_price ?? product.compare_at_price,
  );

  const hasDiscount =
    Number.isFinite(price) &&
    Number.isFinite(originalPrice) &&
    price >= 0 &&
    originalPrice > price &&
    originalPrice > 0;

  const discount = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const isNew = Boolean(product.is_new ?? product.isNew);
  const image = product.image_url ?? product.image;

  return (
    <Link
      to={`/shop/${product.slug ?? product.id}`}
      className="group block"
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-neutral-100">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-500">
            No image available
          </div>
        )}

        {isNew && (
          <span className="absolute left-2.5 top-2.5 rounded bg-neutral-900 px-2 py-0.5 text-[10px] text-white">
            New
          </span>
        )}

        {hasDiscount && (
          <span
            className={`absolute left-2.5 rounded bg-red-700 px-2 py-0.5 text-[10px] text-white ${
              isNew ? "top-9" : "top-2.5"
            }`}
          >
            -{discount}%
          </span>
        )}
      </div>

      <h3 className="mt-2.5 text-[13px] font-semibold leading-tight">
        {product.name}
      </h3>

      <p className="mt-1 text-[13px] font-bold">
        ৳
        {Number.isFinite(price)
          ? price.toLocaleString("en-BD")
          : product.price}

        {hasDiscount && (
          <span className="ml-1.5 text-xs font-normal text-neutral-500 line-through">
            ৳{originalPrice.toLocaleString("en-BD")}
          </span>
        )}
      </p>

      {product.description && (
        <p className="mt-1 line-clamp-2 text-xs text-neutral-500">
          {product.description}
        </p>
      )}
    </Link>
  );
}

function ProductSection({
  title,
  description,
  products,
  loading,
  error,
  link = "/shop",
  emptyMessage,
  gridCols = "grid-cols-2 md:grid-cols-4",
}) {
  return (
    <section className="pb-2 pt-11">
      <SectionHeading
        title={title}
        description={description}
        link={link}
      />

      {loading ? (
        <p className="py-8 text-center text-sm text-neutral-500">
          Loading products...
        </p>
      ) : error ? (
        <p className="py-8 text-center text-sm text-red-600">
          Could not load products. Please try again later.
        </p>
      ) : products.length > 0 ? (
        <div className={`grid gap-x-5 gap-y-6 ${gridCols}`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-neutral-500">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

export default function HomePage() {
  const {
    products = [],
    loading,
    error,
  } = useProducts();

  const featuredProducts = products
    .filter((product) =>
      Boolean(product.is_featured ?? product.isFeatured),
    )
    .slice(0, 4);

  const newProducts = products
    .filter((product) =>
      Boolean(product.is_new ?? product.isNew),
    )
    .slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-255 px-6 sm:px-10">
      <section className="pb-2 pt-11">
        <SectionHeading
          title="Shop by Category"
          description="Explore the essentials for your wardrobe."
          link="/shop"
        />

        {loading ? (
          <p className="py-8 text-center text-sm text-neutral-500">
            Loading categories...
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:gap-5">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                products={products}
              />
            ))}
          </div>
        )}
      </section>

      <ProductSection
        title="Featured Products"
        description="Top rated pieces from our collection."
        products={featuredProducts}
        loading={loading}
        error={error}
        link="/shop"
        emptyMessage="No featured products available yet."
        gridCols="grid-cols-2 md:grid-cols-4"
      />

      <section className="py-8">
        <div className="flex flex-wrap items-center justify-between gap-5 rounded-[10px] bg-neutral-900 p-7 text-white sm:p-11">
          <div>
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight">
              Confidence in every detail.
            </h2>

            <p className="mt-2 max-w-105 text-sm leading-relaxed text-neutral-400">
              Use code{" "}
              <strong className="text-white">NOIR10</strong>{" "}
              at checkout for 10% off your order.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded-md border border-white bg-white px-5 py-3 text-[13px] font-semibold text-neutral-900 transition hover:bg-neutral-200"
          >
            Shop now <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <ProductSection
        title="New Arrivals"
        description="Take a look at the latest additions."
        products={newProducts}
        loading={loading}
        error={error}
        link="/shop?filter=new"
        emptyMessage="No new arrivals available yet."
        gridCols="grid-cols-1 sm:grid-cols-3"
      />

      <section className="mb-12 mt-8 grid grid-cols-1 gap-5 border-y border-neutral-200 py-6 sm:grid-cols-3 sm:gap-5">
        <div className="flex items-center gap-3">
          <Truck size={23} strokeWidth={1.5} />

          <div>
            <h3 className="text-sm font-semibold">
              Fast &amp; Reliable Delivery
            </h3>
            <p className="text-xs text-neutral-500">
              Across Bangladesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={23} strokeWidth={1.5} />

          <div>
            <h3 className="text-sm font-semibold">
              Secure Shopping
            </h3>
            <p className="text-xs text-neutral-500">
              Your data is safe with us
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[26px] leading-none">↺</span>

          <div>
            <h3 className="text-sm font-semibold">
              Easy Returns
            </h3>
            <p className="text-xs text-neutral-500">
              7 days return policy
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}