
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";
import ProductGallery from "../components/ProductGallery";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function ProductDetails() {
  const { slug } = useParams();
  const { products = [], loading, error } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  const product = products.find(
    (item) =>
      String(item.slug) === slug || String(item.id) === slug
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        Loading product...
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/shop" className="mt-4 inline-block underline">
          Back to shop
        </Link>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block underline">
          Back to shop
        </Link>
      </main>
    );
  }

  const stock = Math.max(0, Number(product.stock) || 0);
  const inStock = product.is_active !== false && stock > 0;

  const productImages = Array.isArray(product.images)
    ? product.images
    : [];

  const galleryKey = `${product.id}-${product.image_url ?? ""}-${JSON.stringify(
    productImages
  )}`;

  function handleAddToCart() {
    if (!inStock || quantity > stock) return;

    try {
      addToCart(product, quantity);
      setCartMessage("Product added to cart.");
    } catch {
      setCartMessage("Could not add the product to your cart.");
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-neutral-500">
        <Link to="/" className="hover:text-black">
          Home
        </Link>
        {" / "}
        <Link to="/shop" className="hover:text-black">
          Shop
        </Link>
        {" / "}
        <span className="text-neutral-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
        <ProductGallery
          key={galleryKey}
          images={productImages}
          imageUrl={product.image_url}
          name={product.name}
        />

        <section className="py-2">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            NOIR MEN
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-2xl font-bold">
            {formatPrice(product.price)}
          </p>

          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-2 text-sm font-medium ${
                inStock ? "text-emerald-700" : "text-red-600"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  inStock ? "bg-emerald-500" : "bg-red-500"
                }`}
              />
              {inStock ? `${stock} available` : "Out of stock"}
            </span>
          </div>

          <div className="my-6 border-t border-neutral-200" />

          <h2 className="mb-2 text-sm font-semibold">
            Product Description
          </h2>

          <p className="leading-7 text-neutral-600">
            {product.description ||
              "No description available for this product."}
          </p>

          <div className="my-6 border-t border-neutral-200" />

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">
              Quantity
            </label>

            <div className="flex items-center border border-neutral-300">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((value) => Math.max(1, value - 1))
                }
                className="px-4 py-2 disabled:opacity-30"
              >
                −
              </button>

              <span
                className="min-w-10 text-center"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!inStock || quantity >= stock}
                onClick={() =>
                  setQuantity((value) => Math.min(value + 1, stock))
                }
                className="px-4 py-2 disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            disabled={!inStock || quantity > stock}
            onClick={handleAddToCart}
            className="mt-6 w-full bg-neutral-900 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          {cartMessage && (
            <p
              role="status"
              className="mt-3 text-sm text-neutral-700"
            >
              {cartMessage}
            </p>
          )}

          <div className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
            <p>✓ Cash on Delivery</p>
            <p>✓ Delivery available across Bangladesh</p>
            <p>✓ Contact us for exchange information</p>
          </div>
        </section>
      </div>
    </main>
  );
}
