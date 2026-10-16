import { createContext, useContext } from "react";

export const ProductContext = createContext(null);

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
}