import { create } from "zustand"
import { Supplier } from "@/types/supplier"
import { supplierService } from "@/services/supplierService"

interface SupplierStore {
  suppliers: Supplier[]
  loading: boolean
  error: string | null

  fetchSuppliers: () => Promise<void>
  addSupplier: (data: Omit<Supplier, "supplier_id" | "created_at">) => Promise<void>
  deleteSupplier: (supplier_id: string) => Promise<void>
}

export const useSupplierStore = create<SupplierStore>((set, get) => ({
  suppliers: [],
  loading: false,
  error: null,

  fetchSuppliers: async () => {
    set({ loading: true, error: null })
    try {
      const data = await supplierService.getAll()
      set({ suppliers: data })
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },

  addSupplier: async (data) => {
    set({ loading: true, error: null })
    try {
      await supplierService.create(data)
      await get().fetchSuppliers()
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },

  deleteSupplier: async (supplier_id) => {
    set({ loading: true, error: null })
    try {
      await supplierService.delete(supplier_id)
      set({
        suppliers: get().suppliers.filter((s) => s.supplier_id !== supplier_id),
      })
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },
}))
