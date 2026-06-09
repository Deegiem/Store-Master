import { api } from "@/lib/api"
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

export const reportService = {
  getSalesSummary: async (params: ReportQueryParams = {}): Promise<SalesSummaryReport> => {
    const res = await api.get("/reports/sales/summary", {
      params,
    })
    return res.data
  },

  getSalesByBranch: async (params: ReportQueryParams = {}): Promise<SalesByBranchReport> => {
    const res = await api.get("/reports/sales/by-branch", {
      params,
    })
    return res.data
  },

  getSalesByPayment: async (params: ReportQueryParams = {}): Promise<SalesByPaymentReport> => {
    const res = await api.get("/reports/sales/by-payment", {
      params,
    })
    return res.data
  },

  getProfitReport: async (params: ProfitReportQueryParams = {}): Promise<ProfitReport> => {
    const res = await api.get("/reports/profit", {
      params,
    })
    return res.data
  },

  getTaxReport: async (params: ReportQueryParams = {}): Promise<TaxReport> => {
    const res = await api.get("/reports/tax", {
      params,
    })
    return res.data
  },

  getProcurementSpend: async (params: ReportQueryParams = {}): Promise<ProcurementSpendReport> => {
    const res = await api.get("/reports/procurement/spend", {
      params,
    })
    return res.data
  },

  getSlowMovingInventory: async (params: { days_threshold?: number } = {}): Promise<SlowMovingInventoryReport> => {
    const res = await api.get("/reports/inventory/slow-moving", {
      params,
    })
    return res.data
  },
}
