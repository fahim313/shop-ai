
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "../hooks/useCart";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
];

export default function Navbar() {
  const { itemCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-widest transition-colors ${
      isActive ? "text-black" : "text-neutral-500 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      {/* Announcement bar */}
      <div className="bg-neutral-950 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white">
        Premium Menswear · Nationwide Delivery
      </div>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="p-2 text-neutral-800 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-extrabold tracking-[0.2em] text-neutral-950"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          NOIR<span className="font-light"> MEN</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={linkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="p-2 text-neutral-800 transition hover:text-neutral-500"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* Shopping cart */}
          <Link
            to="/cart"
            className="relative p-2 text-neutral-800 transition hover:text-neutral-500"
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <ShoppingBag size={20} />

            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Search panel */}
      {searchOpen && (
        <form
          action="/shop"
          method="get"
          className="border-t border-neutral-100 px-4 py-4"
        >
          <div className="mx-auto flex max-w-2xl gap-2">
            <input
              type="search"
              name="search"
              placeholder="Search products..."
              autoFocus
              className="min-w-0 flex-1 border border-neutral-300 px-4 py-3 text-sm outline-none focus:border-neutral-900"
            />

            <button
              type="submit"
              className="bg-neutral-950 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-neutral-800"
            >
              Search
            </button>
          </div>
        </form>
      )}

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-neutral-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `border-b border-neutral-100 py-4 text-xs font-semibold uppercase tracking-widest ${
                    isActive ? "text-black" : "text-neutral-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-neutral-100 py-4 text-xs font-semibold uppercase tracking-widest text-neutral-600"
            >
              <span>Shopping Cart</span>

              {itemCount > 0 && (
                <span className="rounded-full bg-neutral-950 px-2 py-1 text-[10px] text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
