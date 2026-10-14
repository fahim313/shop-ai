import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ShoppingBag,
  MessageCircle,
  Bot,
} from "lucide-react";

const shopLinks = [
  { label: "All Products", to: "/shop" },
  { label: "Panjabi", to: "/shop?category=panjabi" },
  { label: "Shirts", to: "/shop?category=shirts" },
  { label: "T-Shirts", to: "/shop?category=t-shirts" },
  { label: "Pants", to: "/shop?category=pants" },
];

const supportLinks = [
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Shopping Cart", to: "/cart" },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="inline-block text-xl font-bold uppercase tracking-[0.2em] text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              NOIR MEN
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-400">
              Discover your style with NOIR MEN. Explore our collections
              and find products that fit your everyday wardrobe.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:text-neutral-400"
            >
              Explore Collection
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white">
              Shop
            </h3>

            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white">
              Customer Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-neutral-800 pt-5">
              <p className="mb-3 text-xs text-neutral-500">
                Need help finding a product?
              </p>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("shop-ai:open-chat")
                  )
                }
                className="inline-flex items-center gap-2 rounded border border-neutral-700 px-3 py-2 text-xs font-medium text-white transition-colors hover:border-neutral-500 hover:bg-neutral-900"
              >
                <Bot className="h-4 w-4" />
                Ask AI Assistant
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-neutral-800 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} NOIR MEN. All rights reserved.
          </p>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Your Shopping Cart
          </Link>
        </div>
      </div>
    </footer>
  );
}