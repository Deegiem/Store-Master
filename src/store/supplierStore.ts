// src/store/supplierStore.ts
import { create } from "zustand";
import { supplierService } from "@/services/supplierService";
import type {
  Supplier,
  CreateSupplierPayload,
  UpdateSupplierPayload,
} from "@/types/supplier";

interface SupplierState {
  suppliers: Supplier[];
  selectedSupplier: Supplier | null;
  isLoading: boolean;
  error: string | null;
  fetchSuppliers: () => Promise<void>;
  addSupplier: (payload: CreateSupplierPayload) => Promise<void>;
  updateSupplier: (supplier_id: string, payload: UpdateSupplierPayload) => Promise<void>;
  deleteSupplier: (supplier_id: string) => Promise<void>;
  setSelectedSupplier: (supplier: Supplier | null) => void;
}

export const SupplierStore = create<SupplierState>((set, get) => ({
  suppliers: [],
  selectedSupplier: null,
  isLoading: false,
  error: null,

  fetchSuppliers: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await supplierService.getAll();
      set({ suppliers: data?.suppliers || [], isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error?.message || "Failed to fetch suppliers" });
    }
  },

  addSupplier: async (payload) => {
    try {
      set({ isLoading: true, error: null });
      const newSupplier = await supplierService.create(payload);
      console.log("Response:", newSupplier);

      await get().fetchSuppliers();
      set((state) => ({
        suppliers: [...state.suppliers, newSupplier],
      }));    } catch (error: any) {
      set({ isLoading: false, error: error?.message || "Failed to add supplier" });
      throw error;
    }
  },

  updateSupplier: async (id, payload) => {
    try {
      set({ isLoading: true, error: null });
      await supplierService.update(id, payload);
      await get().fetchSuppliers();
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error?.message || "Failed to update supplier" });
      throw error;
    }
  },

  deleteSupplier: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await supplierService.remove(id);
      await get().fetchSuppliers();
      set({ isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, error: error?.message || "Failed to delete supplier" });
      throw error;
    }
  },

  setSelectedSupplier: (supplier) => set({ selectedSupplier: supplier }),
}));
