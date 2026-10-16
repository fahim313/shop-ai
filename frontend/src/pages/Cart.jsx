import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);

export default function Cart() {
  const {
    cart,
    itemCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <ShoppingBag
          size={48}
          strokeWidth={1.3}
          className="mx-auto text-neutral-400"
        />

        <h1 className="mt-5 text-2xl font-bold text-neutral-900">
          Your Shopping Bag is Empty
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Discover something you love from our collection.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
        >
          Continue Shopping
          <ArrowLeft size={16} />
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            Shopping Bag
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-black"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-neutral-500 underline transition hover:text-red-600"
          >
            Clear Bag
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <section className="divide-y divide-neutral-200 lg:col-span-7">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 py-5 first:pt-0 sm:gap-6"
            >
              <Link
                to={`/shop/${item.slug ?? item.id}`}
                className="h-32 w-24 shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-40 sm:w-32"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-2 text-center text-xs text-neutral-400">
                    No image
                  </div>
                )}
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/shop/${item.slug ?? item.id}`}
                      className="line-clamp-2 text-sm font-semibold text-neutral-900 hover:underline sm:text-base"
                    >
                      {item.name}
                    </Link>

                    <p className="mt-2 text-sm text-neutral-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                    className="shrink-0 p-1 text-neutral-400 transition hover:text-red-600"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                  <div className="inline-flex items-center border border-neutral-300">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                      className="p-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-8 text-center text-sm">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      aria-label="Increase quantity"
                      className="p-2 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-neutral-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="lg:sticky lg:top-24 lg:col-span-5">
          <div className="rounded-lg border border-neutral-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-neutral-900">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 border-b border-neutral-200 pb-5 text-sm">
              <div className="flex justify-between gap-4 text-neutral-600">
                <span>Subtotal ({itemCount} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between gap-4 text-neutral-600">
                <span>Shipping</span>
                <span className="text-xs">Calculated at checkout</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 py-5">
              <span className="font-semibold text-neutral-900">
                Estimated Total
              </span>
              <span className="text-lg font-bold text-neutral-900">
                {formatPrice(subtotal)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="flex w-full items-center justify-center gap-2 bg-neutral-900 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-5 flex items-start gap-3 border-t border-neutral-200 pt-4 text-xs leading-5 text-neutral-500">
              <Truck size={18} className="shrink-0 text-neutral-700" />
              <p>
                Delivery available across Bangladesh. Cash on Delivery
                availability will be confirmed at checkout.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}