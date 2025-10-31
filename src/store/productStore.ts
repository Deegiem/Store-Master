



import { create } from "zustand";
import { Product, CreateProductPayload, UpdateProductPayload } from "@/types/products";
import { productService } from "@/services/productService";

interface ProductStore {
  products: Product[]; // Renamed for clarity
  productsByCategory: Record<string, Product[]>;
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  fetchProductsByCategory: (category_id: string, force?: boolean) => Promise<void>;
  addProducts: (payload: CreateProductPayload) => Promise<void>;
  updateProduct: (id: string, payload: UpdateProductPayload) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  productsByCategory: {},
  loading: false,
  error: null,

  // 🔹 Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await productService.getAll();

      set({ products:  Array.isArray(data) ? data : [],
 });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Fetch products by category (with caching)
    fetchProductsByCategory: async (category_id, force = false) => {
  const cached = get().productsByCategory[category_id];
  if (cached && !force) return;

  set({ loading: true, error: null });

  try {
    const res: unknown = await productService.getByCategory(category_id);

    // Safely extract data
    const data =
      Array.isArray(res)
        ? res
        : typeof res === "object" &&
          res !== null &&
          Array.isArray((res as any).data)
        ? (res as any).data
        : [];

    set((state) => ({
      productsByCategory: {
        ...state.productsByCategory,
        [category_id]: data,
      },
    }));
  } catch (error: unknown) {
    set({
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
    });
  } finally {
    set({ loading: false });
  }
},



  // 🔹 Add new products
  addProducts: async (payload) => {
    set({ loading: true, error: null });
    try {
      await productService.createBulk(payload);
      await get().fetchProducts();
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Update product
  updateProduct: async (id, payload) => {
    set({ loading: true, error: null });
    try {
      await productService.update(id, payload);
      await get().fetchProducts();
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },

  // 🔹 Delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await productService.delete(id);
      set({
        products: get().products.filter((p) => p.product_id !== id),
      });
    } catch (error: unknown) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
