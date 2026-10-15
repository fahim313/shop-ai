import { Link } from "react-router-dom";

function getCategoryName(product) {
  const category = product.category_name ?? product.category;

  if (typeof category === "object" && category !== null) {
    return category.name ?? "";
  }

  return String(category ?? "");
}

export default function CategoryCard({ category, products = [] }) {
  const categorySearch = category.search.toLowerCase();

  const count = products.filter((product) =>
    getCategoryName(product).toLowerCase().includes(categorySearch),
  ).length;

  return (
    <Link
      to={`/shop?category=${encodeURIComponent(category.slug)}`}
      className="group block"
      aria-label={`Explore ${category.name}`}
    >
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-neutral-100 transition-shadow group-hover:shadow-[0_0_0_1px_#171717]">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>

      <h3 className="mt-2.5 text-[13px] font-semibold tracking-normal">
        {category.name}
      </h3>

      <p className="text-xs text-neutral-500">
        {count} products
      </p>
    </Link>
  );
}