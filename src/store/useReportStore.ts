import { create } from "zustand"
import { reportService } from "@/services/reportService"
import type {
  ProcurementSpendReport,
  ProfitReport,
  ReportQueryParams,
  SalesByBranchReport,
  SalesByPaymentReport,
  SalesSummaryReport,
  SlowMovingInventoryReport,
  TaxReport,
} from "@/types/report"

interface ReportStore {
  salesSummary: SalesSummaryReport | null
  salesByBranch: SalesByBranchReport | null
  salesByPayment: SalesByPaymentReport | null
  profitReport: ProfitReport | null
  taxReport: TaxReport | null
  procurementSpend: ProcurementSpendReport | null
  slowMovingInventory: SlowMovingInventoryReport | null
  loading: {
    salesSummary: boolean
    salesByBranch: boolean
    salesByPayment: boolean
    profitReport: boolean
    taxReport: boolean
    procurementSpend: boolean
    slowMovingInventory: boolean
  }
  error: {
    salesSummary: string | null
    salesByBranch: string | null
    salesByPayment: string | null
    profitReport: string | null
    taxReport: string | null
    procurementSpend: string | null
    slowMovingInventory: string | null
  }
  fetchSalesSummary: (params?: ReportQueryParams) => Promise<void>
  fetchSalesByBranch: (params?: ReportQueryParams) => Promise<void>
  fetchSalesByPayment: (params?: ReportQueryParams) => Promise<void>
  fetchProfitReport: (params?: ReportQueryParams) => Promise<void>
  fetchTaxReport: (params?: ReportQueryParams) => Promise<void>
  fetchProcurementSpend: (params?: ReportQueryParams) => Promise<void>
  fetchSlowMovingInventory: (params?: { days_threshold?: number }) => Promise<void>
}

export const useReportStore = create<ReportStore>((set) => ({
  salesSummary: null,
  salesByBranch: null,
  salesByPayment: null,
  profitReport: null,
  taxReport: null,
  procurementSpend: null,
  slowMovingInventory: null,
  loading: {
    salesSummary: false,
    salesByBranch: false,
    salesByPayment: false,
    profitReport: false,
    taxReport: false,
    procurementSpend: false,
    slowMovingInventory: false,
  },
  error: {
    salesSummary: null,
    salesByBranch: null,
    salesByPayment: null,
    profitReport: null,
    taxReport: null,
    procurementSpend: null,
    slowMovingInventory: null,
  },

  fetchSalesSummary: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, salesSummary: true },
      error: { ...state.error, salesSummary: null },
    }))

    try {
      const report = await reportService.getSalesSummary(params)
      set({ salesSummary: report, loading: { ...get().loading, salesSummary: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, salesSummary: err.message || "Failed to load sales summary" },
        loading: { ...get().loading, salesSummary: false },
      })
    }
  },

  fetchSalesByBranch: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, salesByBranch: true },
      error: { ...state.error, salesByBranch: null },
    }))

    try {
      const report = await reportService.getSalesByBranch(params)
      set({ salesByBranch: report, loading: { ...get().loading, salesByBranch: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, salesByBranch: err.message || "Failed to load sales by branch report" },
        loading: { ...get().loading, salesByBranch: false },
      })
    }
  },

  fetchSalesByPayment: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, salesByPayment: true },
      error: { ...state.error, salesByPayment: null },
    }))

    try {
      const report = await reportService.getSalesByPayment(params)
      set({ salesByPayment: report, loading: { ...get().loading, salesByPayment: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, salesByPayment: err.message || "Failed to load sales by payment report" },
        loading: { ...get().loading, salesByPayment: false },
      })
    }
  },

  fetchProfitReport: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, profitReport: true },
      error: { ...state.error, profitReport: null },
    }))

    try {
      const report = await reportService.getProfitReport(params)
      set({ profitReport: report, loading: { ...get().loading, profitReport: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, profitReport: err.message || "Failed to load profit report" },
        loading: { ...get().loading, profitReport: false },
      })
    }
  },

  fetchTaxReport: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, taxReport: true },
      error: { ...state.error, taxReport: null },
    }))

    try {
      const report = await reportService.getTaxReport(params)
      set({ taxReport: report, loading: { ...get().loading, taxReport: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, taxReport: err.message || "Failed to load tax report" },
        loading: { ...get().loading, taxReport: false },
      })
    }
  },

  fetchProcurementSpend: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, procurementSpend: true },
      error: { ...state.error, procurementSpend: null },
    }))

    try {
      const report = await reportService.getProcurementSpend(params)
      set({ procurementSpend: report, loading: { ...get().loading, procurementSpend: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, procurementSpend: err.message || "Failed to load procurement spend report" },
        loading: { ...get().loading, procurementSpend: false },
      })
    }
  },

  fetchSlowMovingInventory: async (params = {}) => {
    set((state) => ({
      loading: { ...state.loading, slowMovingInventory: true },
      error: { ...state.error, slowMovingInventory: null },
    }))

    try {
      const report = await reportService.getSlowMovingInventory(params)
      set({ slowMovingInventory: report, loading: { ...get().loading, slowMovingInventory: false } })
    } catch (err: any) {
      set({
        error: { ...get().error, slowMovingInventory: err.message || "Failed to load slow moving inventory report" },
        loading: { ...get().loading, slowMovingInventory: false },
      })
    }
  },
}))

function get() {
  return useReportStore.getState()
}
