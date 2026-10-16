import ProductCard from './ProductCard';
import EmptyState from './EmptyState';

export default function ProductGrid({
  products = [],
  columns = 4, // 3 or 4
  emptyTitle,
  emptyDescription,
  onResetFilters
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No products found'}
        description={emptyDescription || 'We could not find any products matching your criteria. Try resetting filters.'}
        actionText="Clear Filters"
        onActionClick={onResetFilters}
      />
    );
  }

  const gridColsClass = columns === 3
    ? 'grid-cols-2 md:grid-cols-3'
    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${gridColsClass} gap-3 sm:gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
