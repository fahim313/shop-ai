import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    getProducts()
      .then((result) => {
        if (ignore) return;
        setProducts(result.products ?? []);
        setError(null);
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const refetch = () => {
    setLoading(true);
    setReloadKey((key) => key + 1);
  };

  return { products, loading, error, refetch };
}