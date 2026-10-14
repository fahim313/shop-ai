import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
} from "lucide-react";
import useProducts from "../hooks/useProducts";

import heroImg from "../assets/images/hero.jpg";
import panjabiImg from "../assets/images/category-panjabi.jpg";
import pantsImg from "../assets/images/category-pants.jpg";
import shirtsImg from "../assets/images/category-shirts.jpg";
import tshirtsImg from "../assets/images/category-tshirts.jpg";

const categories = [
  {
    name: "Shirts",
    description: "Everyday essentials",
    image: shirtsImg,
    search: "shirt",
  },
  {
    name: "Panjabi",
    description: "Traditional elegance",
    image: panjabiImg,
    search: "panjabi",
  },
  {
    name: "T-Shirts",
    description: "Casual, refined style",
    image: tshirtsImg,
    search: "t-shirt",
  },
  {
    name: "Pants",
    description: "Made for your day",
    image: pantsImg,
    search: "pant",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
            {description}
          </p>
        )}
      </div>

      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-neutral-500"
      >
        Explore all <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function CategoryCard({ category }) {
  return (
    <Link
      to={`/shop?search=${encodeURIComponent(category.search)}`}
      className="group relative block aspect[4/5] overflow-hidden bg-neutral-100"
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to- from-black/75 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
        <p className="text-xs text-white/75">{category.description}</p>

        <h3 className="mt-1 text-xl font-semibold">{category.name}</h3>

        <span className="mt-3 inline-flex items-center gap-2 text-sm">
          Shop now <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

function ProductCard({ product }) {
  const price = Number(product.price);

  return (
    <Link
      to={`/shop/${product.slug ?? product.id}`}
      className="group block"
    >
      <div className="relative aspect[3/4] overflow-hidden bg-neutral-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-400">
            No image available
          </div>
        )}

        {product.is_new && (
          <span className="absolute left-3 top-3 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
            New
          </span>
        )}
      </div>

      <div className="pt-4">
        <h3 className="font-medium transition group-hover:text-neutral-500">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
            {product.description}
          </p>
        )}

        <p className="mt-3 text-sm font-semibold">
          ৳
          {Number.isFinite(price)
            ? price.toLocaleString("en-BD")
            : product.price}
        </p>
      </div>
    </Link>
  );
}

function ProductSection({
  eyebrow,
  title,
  description,
  products,
  loading,
  error,
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        {loading ? (
          <p className="py-10 text-center text-sm text-neutral-500">
            Loading products...
          </p>
        ) : error ? (
          <p className="py-10 text-center text-sm text-red-600">
            Could not load products. Please try again later.
          </p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-neutral-500">
            No products available in this section yet.
          </p>
        )}
      </div>
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
    .filter((product) => product.is_featured)
    .slice(0, 4);

  const newProducts = products
    .filter((product) => product.is_new)
    .slice(0, 4);

  return (
    <div className="bg-white text-neutral-950">
      {/* Hero */}
      <section className="relative min-h[520px] overflow-hidden bg-neutral-950 sm:min-h[620px]">
        <img
          src={heroImg}
          alt="NOIR MEN fashion collection"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
        />

        <div className="absolute inset-0 bg-gradient-to from-black/80 via-black/45 to-black/10" />

        <div className="relative mx-auto flex min-h[520px] max-w-7xl items-center px-5 py-20 sm:min-h[620px] sm:px-8 lg:px-12">
          <div className="max-w-2xl text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
              NOIR MEN COLLECTION
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Style that
              <br />
              speaks for you.
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
              Discover modern menswear designed for your everyday style,
              from timeless essentials to statement pieces.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                Explore Collection <ArrowRight size={17} />
              </Link>

              <Link
                to="/shop?filter=new"
                className="border border-white/60 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-black"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <SectionHeading
          eyebrow="Find your style"
          title="Shop by Category"
          description="Explore the essentials for your wardrobe."
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <div className="bg-neutral-50">
        <ProductSection
          eyebrow="Handpicked for you"
          title="Featured Products"
          description="Discover selected pieces from our collection."
          products={featuredProducts}
          loading={loading}
          error={error}
        />
      </div>

      {/* Brand Story */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 md:items-center lg:px-12">
        <div className="relative min-h[320px] overflow-hidden bg-neutral-100 sm:min-h[440px]">
          <img
            src={heroImg}
            alt="NOIR MEN collection"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="max-w-xl md:pl-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
            The NOIR MEN Identity
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Confidence in every detail.
          </h2>

          <p className="mt-5 text-sm leading-7 text-neutral-600">
            Great style starts with the pieces you choose. Explore a
            considered collection of menswear for everyday wear and
            special occasions.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 border-b border-black pb-2 text-sm font-semibold"
          >
            Discover the collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <ProductSection
        eyebrow="Just added"
        title="New Arrivals"
        description="Take a look at the latest additions."
        products={newProducts}
        loading={loading}
        error={error}
      />

      {/* Store Information */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-12 sm:grid-cols-3 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <Truck size={25} strokeWidth={1.5} />
            <div>
              <h3 className="text-sm font-semibold">
                Delivery Information
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Check delivery details during checkout.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck size={25} strokeWidth={1.5} />
            <div>
              <h3 className="text-sm font-semibold">Secure Shopping</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Browse our collection with confidence.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Headphones size={25} strokeWidth={1.5} />
            <div>
              <h3 className="text-sm font-semibold">Need Assistance?</h3>
              <p className="mt-1 text-xs text-neutral-500">
                Contact us for help with your order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-neutral-950 px-5 py-16 text-center text-white sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">
          Find your next favorite
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Upgrade your everyday style.
        </h2>

        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-neutral-200"
        >
          Shop Now <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}