import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import useProducts from '../hooks/useProducts';

export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { products = [] } = useProducts();

  // Handle body scroll and input focus only
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Derived State: Calculate matched results directly without useEffect
  const results = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return [];

    return products.filter(p => {
      const name = p.name || '';
      const category = typeof p.category === 'object' ? p.category?.name : (p.category_name ?? p.category ?? '');
      const description = p.description || '';
      const fabric = p.fabric || '';

      return (
        name.toLowerCase().includes(cleanQuery) ||
        String(category).toLowerCase().includes(cleanQuery) ||
        description.toLowerCase().includes(cleanQuery) ||
        fabric.toLowerCase().includes(cleanQuery)
      );
    }).slice(0, 6);
  }, [query, products]);

  // Safely handle closing modal & resetting state
  const handleClose = () => {
    setQuery('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (productId) => {
    handleClose();
    navigate(`/shop/${productId}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full bg-white shadow-xl border-b border-neutral-200 max-h-[85vh] flex flex-col">
        {/* Search Input Bar */}
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Panjabi, T-Shirts, Oxford Shirts, Chinos..."
              className="flex-1 text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-neutral-400 hover:text-neutral-700 p-1"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!query.trim()}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 rounded hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors ml-1"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Live Suggestions & Results */}
        <div className="overflow-y-auto border-t border-neutral-100 max-w-4xl mx-auto w-full px-4 sm:px-6 py-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Silk Panjabi', 'Heavyweight Tee', 'Linen Shirt', 'Chino', 'Oxford White', 'Casual Daily'].map(term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-medium">
                  Showing top {results.length} results
                </span>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
                >
                  View all results <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {results.map(product => {
                  const img = product.image_url ?? product.image ?? (Array.isArray(product.images) ? product.images[0] : '');
                  const cat = typeof product.category === 'object' ? product.category?.name : (product.category_name ?? product.category ?? '');
                  const priceVal = Number(product.price) || 0;

                  return (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center gap-3 p-2 rounded-lg border border-neutral-100 hover:border-neutral-300 hover:bg-neutral-50 cursor-pointer transition-colors"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-16 object-cover rounded bg-neutral-100 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-16 bg-neutral-100 rounded flex items-center justify-center text-[10px] text-neutral-400">No Img</div>
                      )}
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 tracking-wider">
                          {cat}
                        </span>
                        <h4 className="text-xs font-medium text-neutral-900 truncate">
                          {product.name}
                        </h4>
                        <span className="text-xs font-bold text-neutral-900 tabular-nums">
                          ৳{priceVal.toLocaleString('en-BD')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm font-medium text-neutral-800">
                No products found for "{query}"
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching for "Panjabi", "Shirt", "Tee", or "Pants"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop click area */}
      <div className="flex-1" onClick={handleClose} />
    </div>
  );
}