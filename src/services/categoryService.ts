// /services/categoryService.ts
import { api } from "@/lib/api";
import { Category, CreateCategoryPayload } from "@/types/category";

export const categoryService = {
  async getAll(): Promise<Category[]> {
    const response = await api.get("/categories");
    return response.data.data;
  },

  async createBulk(payload: CreateCategoryPayload): Promise<string> {
    const response = await api.post("/categories/bulk", payload);
    return response.data;
  },

  async delete(categoryId: string): Promise<string> {
    const response = await api.delete(`/categories/${categoryId}`);
    return response.data;
  },
};
