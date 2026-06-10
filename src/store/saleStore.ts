import { create } from "zustand"
import type {
  CancelSalePayload,
  CancelSaleResponse,
  CreateSalePayload,
  ProductForSale,
  SaleCreateResponse,
  SaleDetail,
  SaleListQueryParams,
  SaleListRecord,
  SaleProductQueryParams,
  SaleQuoteResponse,
  SaleListResponse,
  TodaysSalesSummary,
} from "@/types/sale"
import { salesService } from "@/services/saleService"

interface SalesStore {
  sales: SaleListRecord[]
  selectedSale: SaleDetail | null
  productsForSale: ProductForSale[]
  barcodeProduct: ProductForSale | null
  quote: SaleQuoteResponse | null
  todaysSales: TodaysSalesSummary | null
  saleCreationResponse: SaleCreateResponse | null
  loading: {
    sales: boolean
    products: boolean
    barcode: boolean
    quote: boolean
    saleDetail: boolean
    todaysSales: boolean
    createSale: boolean
    cancelSale: boolean
  }
  error: {
    sales: string | null
    products: string | null
    barcode: string | null
    quote: string | null
    saleDetail: string | null
    todaysSales: string | null
    createSale: string | null
    cancelSale: string | null
  }
  fetchProductsForSale: (params?: SaleProductQueryParams, branch_id?: string) => Promise<void>
  searchProductByBarcode: (barcode: string, branch_id?: string) => Promise<void>
  requestSaleQuote: (payload: { items: { product_id: string; quantity: number }[]; discount: number }, branch_id?: string) => Promise<void>
  createSale: (payload: CreateSalePayload, branch_id?: string) => Promise<void>
  fetchSales: (params?: SaleListQueryParams, branch_id?: string) => Promise<void>
  fetchSalesByProductId: (product_id: string) => Promise<void>
  fetchSaleDetail: (sale_id: string, branch_id?: string) => Promise<void>
  fetchTodaysSales: (branch_id?: string) => Promise<void>
  cancelSale: (sale_id: string, payload: CancelSalePayload, branch_id?: string) => Promise<void>
  clearQuote: () => void  // Add this
}

export const useSalesStore = create<SalesStore>((set) => ({
  sales: [],
  selectedSale: null,
  productsForSale: [],
  barcodeProduct: null,
  quote: null,
  todaysSales: null,
  saleCreationResponse: null,
  loading: {
    sales: false,
    products: false,
    barcode: false,
    quote: false,
    saleDetail: false,
    todaysSales: false,
    createSale: false,
    cancelSale: false,
  },
  error: {
    sales: null,
    products: null,
    barcode: null,
    quote: null,
    saleDetail: null,
    todaysSales: null,
    createSale: null,
    cancelSale: null,
  },

  fetchProductsForSale: async (params: SaleProductQueryParams = {}, branch_id?: string) => {
    set((state) => ({
      loading: { ...state.loading, products: true },
      error: { ...state.error, products: null },
    }))

    try {
      const res = await salesService.getProductsForSale(params, branch_id)
      console.log('API Response for products:', res) // Add this
      console.log('Products data:', res.data) // Add this
      console.log('Products count:', res.data?.length) // Add this
      set({ productsForSale: res.data, loading: { ...get().loading, products: false } })
    } catch (err: any) {
      console.error('API Error:', err.response?.data || err.message) // Add this
      set({
        error: { ...get().error, products: err.message || "Failed to fetch sale products" },
        loading: { ...get().loading, products: false },
      })
    }
  },

  searchProductByBarcode: async (barcode, branch_id) => {
    set((state) => ({
      loading: { ...state.loading, barcode: true },
      error: { ...state.error, barcode: null },
      barcodeProduct: null,
    }))

    try {
      const product = await salesService.getProductByBarcode(barcode, branch_id)
      set({ barcodeProduct: product, loading: { ...get().loading, barcode: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, barcode: err.message || "Failed to fetch barcode product" },
        loading: { ...get().loading, barcode: false },
      })
    }
  },

  requestSaleQuote: async (payload, branch_id) => {
    set((state) => ({
      loading: { ...state.loading, quote: true },
      error: { ...state.error, quote: null },
      saleCreationResponse: null,
    }))

    try {
      const quote = await salesService.getSaleQuote(payload, branch_id)
      set({ quote, loading: { ...get().loading, quote: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, quote: err.message || "Failed to get sale quote" },
        loading: { ...get().loading, quote: false },
      })
    }
  },

  createSale: async (payload, branch_id) => {
    set((state) => ({
      loading: { ...state.loading, createSale: true },
      error: { ...state.error, createSale: null },
    }))

    try {
      const response = await salesService.createSale(payload, branch_id)
      set({
        saleCreationResponse: response,
        loading: { ...get().loading, createSale: false },
      })
    } catch (err: any) {
      set({
        error: { ...get().error, createSale: err.message || "Failed to create sale" },
        loading: { ...get().loading, createSale: false },
      })
    }
  },

  fetchSales: async (params = {}, branch_id) => {
    console.log('🏪 Store fetchSales called with:', { params, branch_id })

    set((state) => ({
      loading: { ...state.loading, sales: true },
      error: { ...state.error, sales: null },
    }))

    try {
      const res = await salesService.getAllSales(params, branch_id)
      console.log('📊 API returned sales:', res.length)
      set({ sales: res, loading: { ...get().loading, sales: false } })
    } catch (err: any) {
      console.error('❌ Error fetching sales:', err)
      set({
        error: { ...get().error, sales: err.message || "Failed to fetch sales" },
        loading: { ...get().loading, sales: false },
      })
    }
  },

  fetchSalesByProductId: async (product_id) => {
    set((state) => ({
      loading: { ...state.loading, sales: true },
      error: { ...state.error, sales: null },
    }))

    try {
      const res = await salesService.getSalesByProductId(product_id)
      set({ sales: res, loading: { ...get().loading, sales: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, sales: err.message || "Failed to fetch sales for product" },
        loading: { ...get().loading, sales: false },
      })
    }
  },

  fetchSaleDetail: async (sale_id, branch_id) => {
    set((state) => ({
      loading: { ...state.loading, saleDetail: true },
      error: { ...state.error, saleDetail: null },
      selectedSale: null,
    }))

    try {
      const res = await salesService.getSaleById(sale_id, branch_id)
      console.log('🔍 Sale detail response:', res) // Add this
      console.log('💰 Discount value:', res.discount) // Add this
      set({ selectedSale: res, loading: { ...get().loading, saleDetail: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, saleDetail: err.message || "Failed to load sale details" },
        loading: { ...get().loading, saleDetail: false },
      })
    }
  },

  fetchTodaysSales: async (branch_id) => {
    set((state) => ({
      loading: { ...state.loading, todaysSales: true },
      error: { ...state.error, todaysSales: null },
    }))

    try {
      const res = await salesService.getTodaysSales(branch_id)
      set({ todaysSales: res, loading: { ...get().loading, todaysSales: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, todaysSales: err.message || "Failed to fetch today\'s sales" },
        loading: { ...get().loading, todaysSales: false },
      })
    }
  },

  cancelSale: async (sale_id, payload, branch_id) => {
    set((state) => ({
      loading: { ...state.loading, cancelSale: true },
      error: { ...state.error, cancelSale: null },
    }))

    try {
      const result = await salesService.cancelSale(sale_id, payload, branch_id)
      set((state) => ({
        selectedSale: state.selectedSale
          ? { ...state.selectedSale, status: result.status }
          : null,
        loading: { ...state.loading, cancelSale: false },
      }))
    } catch (err: any) {
      set({
        error: { ...get().error, cancelSale: err.message || "Failed to cancel sale" },
        loading: { ...get().loading, cancelSale: false },
      })
    }
  },

  // Add the clearQuote function
  clearQuote: () => {
    set({ quote: null, saleCreationResponse: null })
  },
}))

function get() {
  return useSalesStore.getState()
}