import { request } from "./apiClient";

export const getProducts = () => request("/api/products");