import { create } from "zustand";
import { SaleRecord, CreateSalePayload } from "@/types/sale";
import { salesService } from "@/services/saleService";

interface SalesStore {
  sales: SaleRecord[];
  loading: boolean;
  error: string | null;

  fetchSales: () => Promise<void>;
  createSale: (payload: CreateSalePayload) => Promise<void>;
  fetchSalesByProductId: (product_id: string) => Promise<void>;
}

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  loading: false,
  error: null,

  fetchSales: async () => {
    set({ loading: true, error: null });
    try {
      const res = await salesService.getAllSales();
      set({ sales: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch sales", loading: false });
    }
  },

  createSale: async (payload) => {
    set({ loading: true, error: null });
    try {
      await salesService.createSale(payload);
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to create sale", loading: false });
    }
  },

  fetchSalesByProductId: async (product_id) => {
    set({ loading: true, error: null });
    try {
      const res = await salesService.getSalesByProductId(product_id);
      set({ sales: res.data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch sales", loading: false });
    }
  },
}));
