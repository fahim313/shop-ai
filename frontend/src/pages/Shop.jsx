import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RotateCcw, X } from 'lucide-react';
import { SIZES_LIST } from '../data/products';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar, { PRICE_RANGES } from '../components/FilterSidebar';
import SortDropdown from '../components/SortDropdown';

export default function Shop() {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state synchronization
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchKeyword, setSearchKeyword] = useState(initialSearch);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category from URL param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const s = searchParams.get('sort');
    if (s) setSortBy(s);
    const q = searchParams.get('search');
    if (q) setSearchKeyword(q);
  }, [searchParams]);

  // Update URL on category change
  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug);
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categorySlug);
    }
    setSearchParams(newParams);
    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const handleToggleSize = (size) => {
    setSelectedSizes(current =>
      current.includes(size) ? current.filter(s => s !== size) : [...current, size]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedSizes([]);
    setSearchKeyword('');
    setSortBy('featured');
    setSearchParams({});
    setIsMobileFilterOpen(false);
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // 1. Search keyword
      if (searchKeyword.trim()) {
        const query = searchKeyword.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesFabric && !matchesDesc) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }

      // 3. Price range
      if (selectedPriceRange !== 'all') {
        const range = PRICE_RANGES.find(r => r.id === selectedPriceRange);
        if (range) {
          if (product.price < range.min || product.price > range.max) {
            return false;
          }
        }
      }

      // 4. Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some(size => product.sizes.includes(size));
        if (!hasMatchingSize) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, selectedCategory, selectedPriceRange, selectedSizes, sortBy, searchKeyword]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedPriceRange !== 'all' ? 1 : 0) +
    selectedSizes.length +
    (searchKeyword.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header & Breadcrumb */}
      <div className="pb-6 border-b border-neutral-200 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1 block">
              NOIR MEN Catalog
            </span>
            <h1
              className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {selectedCategory === 'all'
                ? 'All Products'
                : PRODUCTS.find(p => p.categorySlug === selectedCategory)?.category || 'Collection'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Showing <strong className="text-neutral-900 font-semibold">{filteredProducts.length}</strong> styles tailored for everyday luxury
            </p>
          </div>

          {/* Search bar inside shop */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by name, fabric..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900 transition-colors"
            />
            {searchKeyword && (
              <button
                type="button"
                onClick={() => setSearchKeyword('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Pill Bar (Zero-pill text tags with dismiss) */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[11px]">
                Category: {selectedCategory}
                <button onClick={() => handleCategorySelect('all')} className="hover:text-black">✕</button>
              </span>
            )}
            {selectedPriceRange !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[11px]">
                {PRICE_RANGES.find(r => r.id === selectedPriceRange)?.label}
                <button onClick={() => setSelectedPriceRange('all')} className="hover:text-black">✕</button>
              </span>
            )}
            {selectedSizes.map(size => (
              <span key={size} className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[11px]">
                Size: {size}
                <button onClick={() => handleToggleSize(size)} className="hover:text-black">✕</button>
              </span>
            ))}
            {searchKeyword && (
              <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[11px]">
                "{searchKeyword}"
                <button onClick={() => setSearchKeyword('')} className="hover:text-black">✕</button>
              </span>
            )}
            <button
              onClick={handleResetFilters}
              className="text-neutral-500 hover:text-neutral-900 underline text-[11px] ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="flex gap-8 items-start">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 bg-white p-5 rounded-lg border border-neutral-200/80 sticky top-24">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            selectedPriceRange={selectedPriceRange}
            onSelectPriceRange={setSelectedPriceRange}
            selectedSizes={selectedSizes}
            onToggleSize={handleToggleSize}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Products Content Area */}
        <div className="flex-1 min-w-0">
          {/* Controls Bar: Mobile filter button + Sort dropdown */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-100">
            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-neutral-900 bg-white border border-neutral-300 rounded hover:bg-neutral-50 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Desktop Count & Sorting */}
            <div className="hidden lg:block text-xs text-neutral-500">
              Showing <span className="font-semibold text-neutral-900">{filteredProducts.length}</span> results
            </div>

            <div className="ml-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid
            products={filteredProducts}
            columns={selectedCategory === 'all' ? 4 : 3}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl z-10 overflow-y-auto animate-in slide-in-from-right duration-200">
            <FilterSidebar
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={setSelectedPriceRange}
              selectedSizes={selectedSizes}
              onToggleSize={handleToggleSize}
              onResetFilters={handleResetFilters}
              isMobile={true}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 sticky bottom-0">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
