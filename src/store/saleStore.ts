import { create } from "zustand"
import { saleService } from "@/services/saleService"
import { Sale } from "@/types/sale"

interface SaleStore {
  sales: Sale[]
  loading: boolean
  error: string | null

  fetchSales: () => Promise<void>
  recordSale: (data: Omit<Sale, "sale_id" | "sold_at" | "remaining_quantity">) => Promise<void>
}

export const useSaleStore = create<SaleStore>((set, get) => ({
  sales: [],
  loading: false,
  error: null,

  fetchSales: async () => {
    set({ loading: true, error: null })
    try {
      const data = await saleService.getAll()
      set({ sales: data })
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },

  recordSale: async (data) => {
    set({ loading: true, error: null })
    try {
      await saleService.sell(data)
      await get().fetchSales()
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
