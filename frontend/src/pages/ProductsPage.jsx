import useProducts from "../hooks/useProducts";

export default function ProductsPage() {
  const { products, loading, error, refetch } = useProducts();

  return (
    <div>
      <h1>Shop AI</h1>
      <button onClick={refetch}>Refresh</button>

      {loading && <p>Loading...</p>}
      {error && <p>API Error: {error}</p>}
      {!loading && !error && products.length === 0 && <p>কোনো product নেই</p>}

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Price: ৳{product.price}</p>
        </div>
      ))}
    </div>
  );
}