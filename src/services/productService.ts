// /services/productService.ts
import { api } from "@/lib/api";
import { CreateProductPayload, Product, UpdateProductPayload } from "@/types/products";

export const productService = {
  // Add multiple products under one category
  createBulk: async (data: CreateProductPayload): Promise<string> => {
    const res = await api.post("/products/bulk", data);
    return res.data;
  },

  // Fetch all products
  getAll: async (): Promise<Product[]> => {
    const res = await api.get<Product[]>("/products");
    return res.data;
  },

  getByCategory: async (category_id: string): Promise<Product[]> => {
    const res = await api.get(`/products/category/${category_id}`);
    return res.data;
  },

  // Update a single product
  update: async (product_id: string, data: UpdateProductPayload): Promise<string> => {
    const res = await api.put(`/products/${product_id}`, data);
    return res.data;
  },

  // Delete a product
  delete: async (product_id: string): Promise<string> => {
    const res = await api.delete(`/products/${product_id}`);
    return res.data;
  },
};


