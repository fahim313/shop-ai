import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useCart } from "../hooks/useCart";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setMenuOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `whitespace-nowrap border-b-2 text-xs uppercase tracking-wider transition-colors ${
      isActive
        ? "border-black pb-0.5 font-bold text-black"
        : "border-transparent font-semibold text-neutral-600 hover:text-black"
    }`;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 w-full border-b border-neutral-200 bg-white/95 text-black shadow-sm backdrop-blur-md">
      {/* Offer Bar */}
      <div className="hidden bg-neutral-900 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-neutral-300 lg:block">
        Nationwide Cash on Delivery across Bangladesh · Free Delivery on
        orders over ৳3,000
      </div>

      {/* Main Navbar */}
      <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Mobile Menu & Brand */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="-ml-2 p-2 text-black focus:outline-none lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            to="/"
            className="shrink-0 text-lg font-bold uppercase tracking-widest text-black sm:text-xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
            onClick={() => setMenuOpen(false)}
          >
            NOIR MEN
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-6">
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

        {/* Search & Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            className="hidden w-48 items-center rounded-lg border border-neutral-200 bg-neutral-100 md:flex lg:w-52 xl:w-60"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-xs text-black outline-none placeholder:text-neutral-500"
            />

            <button
              type="submit"
              className="px-2.5 text-neutral-500 transition-colors hover:text-black"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Account */}
          <button
            type="button"
            onClick={() => navigate("/account")}
            className="rounded-full p-2 text-neutral-700 transition-colors hover:text-black"
            aria-label="Account"
          >
            <UserRound size={20} />
          </button>

          {/* Shopping Cart */}
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-neutral-800 transition-colors hover:text-black"
            aria-label={`Shopping cart, ${itemCount} items`}
          >
            <ShoppingBag size={20} />

            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold tabular-nums text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="max-h-[calc(100vh-64px)] overflow-y-auto border-t border-neutral-200 bg-white px-5 py-4 shadow-xl lg:hidden">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 rounded-md border border-neutral-200 bg-neutral-100 px-3 py-2.5 text-xs text-black outline-none placeholder:text-neutral-500"
            />

            <button
              type="submit"
              className="rounded-md bg-black px-3.5 text-white transition-colors hover:bg-neutral-800"
              aria-label="Search products"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `border-b border-neutral-100 py-3 text-xs uppercase tracking-wider transition-colors ${
                    isActive
                      ? "font-bold text-black"
                      : "font-semibold text-neutral-600 hover:text-black"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-xs font-semibold uppercase tracking-wider text-neutral-700"
            >
              Shopping Bag ({itemCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}