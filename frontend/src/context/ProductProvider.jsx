
import { useState, useEffect, useCallback } from "react";
import { ProductContext } from "./ProductContext";
import { api } from "../services/api";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async ({ silent = false } = {}) => {
    if (!silent) {
      setLoading(true);
    }
  
    setError(null);
  
    try {
      const res = await api.getProducts();
  
      if (!res.success || !Array.isArray(res.data)) {
        throw new Error("Invalid products API response");
      }
  
      setProducts(res.data);
    } catch (err) {
      console.warn("Failed to fetch products:", err.message);
      setProducts([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    let cancelled = false;
  
    async function loadProducts() {
      try {
        const res = await api.getProducts();
  
        if (!res.success || !Array.isArray(res.data)) {
          throw new Error("Invalid products API response");
        }
  
        if (!cancelled) {
          setProducts(res.data);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("Failed to fetch products:", err.message);
          setProducts([]);
          setError(err.message);
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

  const getProductById = useCallback(
    (id) =>
      id == null
        ? null
        : products.find(
            (product) => String(product.id) === String(id)
          ) ?? null,
    [products]
  );

  const createProduct = async (productData) => {
    const res = await api.createProduct(productData);

    if (res.success && res.data) {
      setProducts((prev) => [...prev, res.data]);
    }

    return res;
  };

  const updateProduct = async (id, productData) => {
    const res = await api.updateProduct(id, productData);

    if (res.success && res.data) {
      setProducts((prev) =>
        prev.map((product) =>
          String(product.id) === String(id) ? res.data : product
        )
      );
    }

    return res;
  };

  const deleteProduct = async (id) => {
    const res = await api.deleteProduct(id);

    if (res.success) {
      setProducts((prev) =>
        prev.filter(
          (product) => String(product.id) !== String(id)
        )
      );
    }

    return res;
  };

  const value = {
    products,
    loading,
    error,
    refreshProducts: fetchProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
