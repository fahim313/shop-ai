const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A to Z", value: "name" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="product-sort" className="whitespace-nowrap text-xs text-neutral-500">
        Sort by:
      </label>

      <select
        id="product-sort"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium outline-none focus:border-neutral-900"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}