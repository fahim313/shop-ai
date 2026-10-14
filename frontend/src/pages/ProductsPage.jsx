import useProducts from "../hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <main>
      <h1>Shop AI</h1>

      <button onClick={refetch} disabled={loading}>
        {loading ? "Loading..." : "Refresh"}
      </button>

      {loading && <p>Loading products...</p>}
      {error && <p>API Error: {error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      <div>
        {products.map((product) => (
          <article key={product.id}>
            <h3>{product.name}</h3>
            <p>Price: ৳{product.price}</p>
            <p>Stock: {product.stock}</p>
          </article>
        ))}
      </div>
    </main>
  );
}