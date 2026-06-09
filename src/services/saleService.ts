import { api } from "@/lib/api"
import type {
  CreateSalePayload,
  SaleCreateResponse,
  SaleDetail,
  SaleListQueryParams,
  SaleListResponse,
  SaleProductQueryParams,
  SaleQuoteResponse,
  TodaysSalesSummary,
  CancelSalePayload,
  CancelSaleResponse,
  ProductForSale,
} from "@/types/sale"

export const salesService = {
  getProductsForSale: async (
    params: SaleProductQueryParams = {},
    branch_id?: string
  ): Promise<{ page: number; limit: number; data: ProductForSale[] }> => {
    const res = await api.get("/sales/products", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 50,
        search: params.search,
        category_id: params.category_id,
        branch_id: branch_id,
      },
    })
    return res.data
  },

  getProductByBarcode: async (
    barcode: string,
    branch_id?: string
  ): Promise<ProductForSale> => {
    const res = await api.get(`/sales/products/barcode/${encodeURIComponent(barcode)}`, {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  getSaleQuote: async (
    payload: { items: { product_id: string; quantity: number }[]; discount: number },
    branch_id?: string
  ): Promise<SaleQuoteResponse> => {
    const res = await api.post("/sales/quote", payload, {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  createSale: async (
    payload: CreateSalePayload,
    branch_id?: string
  ): Promise<SaleCreateResponse> => {
    const res = await api.post("/sales/", payload, {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  getAllSales: async (
    params: SaleListQueryParams = {},
    branch_id?: string
  ): Promise<SaleListResponse> => {
    const res = await api.get("/sales", {
      params: {
        ...params,
        branch_id,
      },
    })
    return res.data
  },

  getSaleById: async (
    sale_id: string,
    branch_id?: string
  ): Promise<SaleDetail> => {
    const res = await api.get(`/sales/${sale_id}`, {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  getTodaysSales: async (branch_id?: string): Promise<TodaysSalesSummary> => {
    const res = await api.get("/sales/my-branch/today", {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  cancelSale: async (
    sale_id: string,
    payload: CancelSalePayload,
    branch_id?: string
  ): Promise<CancelSaleResponse> => {
    const res = await api.put(`/sales/${sale_id}/cancel`, payload, {
      params: {
        branch_id,
      },
    })
    return res.data
  },

  getSalesByProductId: async (product_id: string): Promise<SaleListResponse> => {
    const res = await api.get(`/sales/product/${product_id}`)
    return res.data
  },
}
