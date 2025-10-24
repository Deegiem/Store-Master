// /store/categoryStore.ts
import { create } from "zustand";
import { categoryService } from "@/services/categoryService";
import { Category, CreateCategoryPayload } from "@/types/category";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  createCategories: (payload: CreateCategoryPayload) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getAll();
      set({ categories: data, loading: false });
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
}
  },

  createCategories: async (payload) => {
    set({ loading: true });
    try {
      await categoryService.createBulk(payload);
      await get().fetchCategories(); // refresh
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id) => {
    set({ loading: true });
    try {
      await categoryService.delete(id);
      set({
        categories: get().categories.filter((cat) => cat.category_id !== id),
      });
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false });
    }
  },
}));
