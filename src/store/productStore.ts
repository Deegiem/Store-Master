// /store/productStore.ts
import { create } from "zustand";
import { Product, CreateProductPayload, UpdateProductPayload } from "@/types/products";
import { productService } from "@/services/productService";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: () => Promise<void>;
  addProducts: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (id: string, payload: UpdateProductPayload) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getAll();
      set({ products: data });
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
}finally {
      set({ loading: false });
    }
  },

  addProducts: async (payload) => {
    set({ loading: true, error: null });
    try {
      await productService.createBulk(payload);
      await get().fetchProducts();
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await productService.update(id, payload);
      await get().fetchProducts();
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productService.delete(id);
      set({ products: get().products.filter((p) => p.product_id !== id) });
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
