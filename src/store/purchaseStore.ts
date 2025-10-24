import { create } from "zustand"
import { purchaseService } from "@/services/purchaseService"
import { Purchase } from "@/types/purchase"

interface PurchaseStore {
  purchases: Purchase[]
  loading: boolean
  error: string | null

  fetchPendingPurchases: () => Promise<void>
  createPurchase: (data: Omit<Purchase, "purchase_id" | "status" | "created_at">) => Promise<void>
  approvePurchase: (purchase_id: string) => Promise<void>
  rejectPurchase: (purchase_id: string, reason: string) => Promise<void>
}

export const usePurchaseStore = create<PurchaseStore>((set, get) => ({
  purchases: [],
  loading: false,
  error: null,

  fetchPendingPurchases: async () => {
    set({ loading: true, error: null })
    try {
      const data = await purchaseService.getPending()
      set({ purchases: data })
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },

  createPurchase: async (data) => {
    set({ loading: true, error: null })
    try {
      await purchaseService.create(data)
      await get().fetchPendingPurchases()
    } catch (error: unknown) {
  set({
    loading: false,
    error: error instanceof Error ? error.message : "An unexpected error occurred.",
  });
} finally {
      set({ loading: false })
    }
  },

  approvePurchase: async (purchase_id) => {
    set({ loading: true, error: null })
    try {
      await purchaseService.approve(purchase_id)
      set({
        purchases: get().purchases.filter((p) => p.purchase_id !== purchase_id),
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

  rejectPurchase: async (purchase_id, reason) => {
    set({ loading: true, error: null })
    try {
      await purchaseService.reject(purchase_id, reason)
      set({
        purchases: get().purchases.filter((p) => p.purchase_id !== purchase_id),
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
