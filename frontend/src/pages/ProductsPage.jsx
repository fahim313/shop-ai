import useProducts from "../hooks/useProducts";
import Shop from "./Shop";

export default function ProductsPage() {
  const { products = [], loading, error, refetch } = useProducts();

  return (
    <Shop
      products={products}
      loading={loading}
      error={error}
      refetch={refetch}
    />
  );
}