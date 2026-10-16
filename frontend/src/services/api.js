
import apiClient from "./apiClient";

export const api = {
  // Products
  async getProducts() {
    const data = await apiClient.get("/products");

    return {
      success: true,
      data,
    };
  },

  async getProduct(id) {
    const data = await apiClient.get(`/products/${id}`);

    return {
      success: true,
      data,
    };
  },

  async createProduct(productData) {
    const data = await apiClient.post("/products", productData);

    return {
      success: true,
      data,
    };
  },

  async updateProduct(id, productData) {
    const data = await apiClient.patch(`/products/${id}`, productData);

    return {
      success: true,
      data,
    };
  },

  async deleteProduct(id) {
    await apiClient.delete(`/products/${id}`);

    return {
      success: true,
    };
  },

  // Categories
  async getCategories() {
    const data = await apiClient.get("/categories");

    return {
      success: true,
      data,
    };
  },

  async getCategory(id) {
    const data = await apiClient.get(`/categories/${id}`);

    return {
      success: true,
      data,
    };
  },

  async createCategory(categoryData) {
    const data = await apiClient.post("/categories", categoryData);

    return {
      success: true,
      data,
    };
  },

  async updateCategory(id, categoryData) {
    const data = await apiClient.patch(
      `/categories/${id}`,
      categoryData
    );

    return {
      success: true,
      data,
    };
  },

  async deleteCategory(id) {
    await apiClient.delete(`/categories/${id}`);

    return {
      success: true,
    };
  },
};
