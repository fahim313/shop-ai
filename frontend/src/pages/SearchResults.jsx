import { useSearchParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { Search, ArrowRight } from 'lucide-react';

export default function SearchResults() {
  const { products = [], loading } = useProducts();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const cleanQuery = query.toLowerCase().trim();

  const results = cleanQuery
    ? products.filter(p => {
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
      })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-screen">
      {/* Header */}
      <div className="pb-6 border-b border-neutral-200 mb-8">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1 block">
          Search Results
        </span>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {query ? `Search results for "${query}"` : 'All Products'}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Found <strong className="text-neutral-900 font-semibold">{results.length}</strong> matching products
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-neutral-500">Searching products...</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 xl:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-500">
            <Search size={22} />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-1">No products found</h3>
          <p className="text-xs text-neutral-500 mb-6">
            We couldn't find any products matching "{query}". Try searching with another keyword such as Panjabi, T-Shirts, Oxford Shirt, or Pants.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 rounded bg-neutral-900 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-neutral-800 transition-colors"
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}