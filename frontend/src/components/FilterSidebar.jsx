import { X, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { SIZES_LIST } from '../data/products';

export const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under-1000', label: 'Under ৳1,000', min: 0, max: 1000 },
  { id: '1000-2000', label: '৳1,000 – ৳2,000', min: 1000, max: 2000 },
  { id: '2000-3000', label: '৳2,000 – ৳3,000', min: 2000, max: 3000 },
  { id: 'over-3000', label: 'Over ৳3,000', min: 3000, max: Infinity },
];

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  selectedPriceRange,
  onSelectPriceRange,
  selectedSizes = [],
  onToggleSize,
  onResetFilters,
  isMobile = false,
  onCloseMobile
}) {
  const hasActiveFilters = selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedSizes.length > 0;

  return (
    <div className={`space-y-6 ${isMobile ? 'p-5' : ''}`}>
      {/* Header if mobile or active filters */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
        <h3 className="font-semibold text-sm text-neutral-900 tracking-wide uppercase">
          Filters
        </h3>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-neutral-600 hover:text-neutral-900 flex items-center gap-1 underline"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 text-neutral-500 hover:text-neutral-900"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="text-xs uppercase font-bold text-neutral-900 tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-neutral-900 text-white font-semibold'
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <span>All Products</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => onSelectCategory(cat.slug)}
              className={`w-full text-left px-2.5 py-1.5 text-xs font-medium rounded transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-neutral-900 text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] ${selectedCategory === cat.slug ? 'text-neutral-300' : 'text-neutral-400'}`}>
                {cat.itemCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs uppercase font-bold text-neutral-900 tracking-wider mb-3">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {PRICE_RANGES.map(range => (
            <label
              key={range.id}
              className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-neutral-950 cursor-pointer py-0.5"
            >
              <input
                type="radio"
                name="price_range"
                checked={selectedPriceRange === range.id}
                onChange={() => onSelectPriceRange(range.id)}
                className="w-3.5 h-3.5 accent-neutral-900 text-neutral-900 focus:ring-neutral-900"
              />
              <span className={selectedPriceRange === range.id ? 'font-semibold text-neutral-900' : ''}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="pt-4 border-t border-neutral-200">
        <h4 className="text-xs uppercase font-bold text-neutral-900 tracking-wider mb-3">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZES_LIST.map(size => {
            const isChecked = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onToggleSize(size)}
                className={`min-w-9 h-8 px-2.5 text-xs font-medium rounded border transition-colors ${
                  isChecked
                    ? 'border-neutral-900 bg-neutral-900 text-white'
                    : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
