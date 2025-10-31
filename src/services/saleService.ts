import { api } from "@/lib/api";
import { CreateSalePayload, SaleListResponse, SaleResponse } from "@/types/sale";

export const salesService = {
  createSale: async (payload: CreateSalePayload): Promise<SaleResponse> => {
    const res = await api.post("/products/sell", payload);
    return res.data;
  },

  getAllSales: async (): Promise<SaleListResponse> => {
    const res = await api.get("/sales");
    return res.data;
  },

  getSalesByProductId: async (product_id: string): Promise<SaleListResponse> => {
    const res = await api.get(`/sales/product/${product_id}`);
    return res.data;
  }
};
