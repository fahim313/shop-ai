
import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await apiClient.get("/products");
      setProducts(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const data = await apiClient.get("/products");

        if (!cancelled) {
          setProducts(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load products"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
