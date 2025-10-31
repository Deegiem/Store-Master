import { create } from "zustand";
import { purchaseService } from "@/services/purchaseService";
import { Purchase } from "@/types/purchase";

interface PurchaseStore {
  purchases: Purchase[];
  loading: boolean;
  error: string | null;

  fetchAllPurchases: () => Promise<void>;
  fetchPendingPurchases: () => Promise<void>;
  fetchRejectedPurchases: () => Promise<void>;
  fetchApprovedPurchases: () => Promise<void>;
  createPurchase: (data: Omit<Purchase, "purchase_id" | "status" | "created_at">) => Promise<void>;
  approvePurchase: (purchase_id: string) => Promise<void>;
  rejectPurchase: (purchase_id: string, reason: string) => Promise<void>;
}

export const usePurchaseStore = create<PurchaseStore>((set, get) => ({
  purchases: [],
  loading: false,
  error: null,

  fetchAllPurchases: async () => {
    set({ loading: true, error: null });
    try {
      const data = await purchaseService.getAll();
      set({ purchases: data });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to fetch all purchases." });
    } finally {
      set({ loading: false });
    }
  },

  fetchPendingPurchases: async () => {
    set({ loading: true, error: null });
    try {
      const data = await purchaseService.getPending();
      set({ purchases: data });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to fetch pending purchases." });
    } finally {
      set({ loading: false });
    }
  },

  fetchRejectedPurchases: async () => {
    set({ loading: true, error: null });
    try {
      const data = await purchaseService.getRejected();
      set({ purchases: data });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to fetch rejected purchases." });
    } finally {
      set({ loading: false });
    }
  },

  fetchApprovedPurchases: async () => {
    set({ loading: true, error: null });
    try {
      const data = await purchaseService.getApproved();
      set({ purchases: data });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to fetch approved purchases." });
    } finally {
      set({ loading: false });
    }
  },

  createPurchase: async (data) => {
    set({ loading: true, error: null });
    try {
      await purchaseService.create(data);
      await get().fetchAllPurchases();
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to create purchase." });
    } finally {
      set({ loading: false });
    }
  },

  approvePurchase: async (purchase_id) => {
    set({ loading: true, error: null });
    try {
      await purchaseService.approve(purchase_id);
      // remove approved purchase from current list
      set({ purchases: get().purchases.filter((p) => p.purchase_id !== purchase_id) });
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to approve purchase." });
    } finally {
      set({ loading: false });
    }
  },

  rejectPurchase: async (purchase_id, reason = "No reason provided") => {
    set({ loading: true, error: null });
    try {
      await purchaseService.reject(purchase_id, reason);
      await get().fetchAllPurchases();
    } catch (err: unknown) {
      set({ error: err instanceof Error ? err.message : "Failed to reject purchase." });
    } finally {
      set({ loading: false });
    }
  },
}));
