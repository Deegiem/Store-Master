import { create } from "zustand";
import {
  DashboardStats,
  FinanceDashboardData,
  PurchaseDashboardData,
  StoreManagerDashboardData,
  StoreStaffDashboardData,
  SalesStaffDashboardData,
} from "@/types/dashboard";
import { dashboardService } from "@/services/dashboardService";

interface DashboardStore {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  // Finance
  financeData: FinanceDashboardData | null
  financeLoading: boolean
  financeError: string | null

  // Purchase
  purchaseData: PurchaseDashboardData | null
  purchaseLoading: boolean
  purchaseError: string | null

  // Store Manager
  storeManagerData: StoreManagerDashboardData | null
  storeManagerLoading: boolean
  storeManagerError: string | null

  // Store Staff
  storeStaffData: StoreStaffDashboardData | null
  storeStaffLoading: boolean
  storeStaffError: string | null

  // Sales Staff
  salesStaffData: SalesStaffDashboardData | null
  salesStaffLoading: boolean
  salesStaffError: string | null

  // Actions
  fetchStats: () => Promise<void>;
  fetchFinanceDashboard: () => Promise<void>
  fetchPurchaseDashboard: () => Promise<void>
  fetchStoreManagerDashboard: () => Promise<void>
  fetchStoreStaffDashboard: () => Promise<void>
  fetchSalesStaffDashboard: () => Promise<void>
  reset: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  loading: false,
  error: null,

    // Initial state
  financeData: null,
  financeLoading: false,
  financeError: null,

  purchaseData: null,
  purchaseLoading: false,
  purchaseError: null,

  storeManagerData: null,
  storeManagerLoading: false,
  storeManagerError: null,

  storeStaffData: null,
  storeStaffLoading: false,
  storeStaffError: null,

  salesStaffData: null,
  salesStaffLoading: false,
  salesStaffError: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardService.getStats();
      set({ stats: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch dashboard stats", loading: false });
    }
  },

    // Finance Dashboard
  fetchFinanceDashboard: async () => {
    set({ financeLoading: true, financeError: null })
    try {
      const data = await dashboardService.getFinanceDashboard()
      console.log("✅ Finance dashboard fetched:", data)
      set({ financeData: data, financeLoading: false })
    } catch (error: any) {
      console.error("❌ Finance dashboard error:", error)
      set({
        financeError: error.response?.data?.detail || error.message || "Failed to fetch finance dashboard",
        financeLoading: false,
      })
    }
  },

  // Purchase Dashboard
  fetchPurchaseDashboard: async () => {
    set({ purchaseLoading: true, purchaseError: null })
    try {
      const data = await dashboardService.getPurchaseDashboard()
      console.log("✅ Purchase dashboard fetched:", data)
      set({ purchaseData: data, purchaseLoading: false })
    } catch (error: any) {
      console.error("❌ Purchase dashboard error:", error)
      set({
        purchaseError: error.response?.data?.detail || error.message || "Failed to fetch purchase dashboard",
        purchaseLoading: false,
      })
    }
  },

  // Store Manager Dashboard
  fetchStoreManagerDashboard: async () => {
    set({ storeManagerLoading: true, storeManagerError: null })
    try {
      const data = await dashboardService.getStoreManagerDashboard()
      console.log("✅ Store manager dashboard fetched:", data)
      set({ storeManagerData: data, storeManagerLoading: false })
    } catch (error: any) {
      console.error("❌ Store manager dashboard error:", error)
      set({
        storeManagerError: error.response?.data?.detail || error.message || "Failed to fetch store manager dashboard",
        storeManagerLoading: false,
      })
    }
  },

  // Store Staff Dashboard
  fetchStoreStaffDashboard: async () => {
    set({ storeStaffLoading: true, storeStaffError: null })
    try {
      const data = await dashboardService.getStoreStaffDashboard()
      console.log("✅ Store staff dashboard fetched:", data)
      set({ storeStaffData: data, storeStaffLoading: false })
    } catch (error: any) {
      console.error("❌ Store staff dashboard error:", error)
      set({
        storeStaffError: error.response?.data?.detail || error.message || "Failed to fetch store staff dashboard",
        storeStaffLoading: false,
      })
    }
  },

  // Sales Staff Dashboard
  fetchSalesStaffDashboard: async () => {
    set({ salesStaffLoading: true, salesStaffError: null })
    try {
      const data = await dashboardService.getSalesStaffDashboard()
      console.log("✅ Sales staff dashboard fetched:", data)
      set({ salesStaffData: data, salesStaffLoading: false })
    } catch (error: any) {
      console.error("❌ Sales staff dashboard error:", error)
      set({
        salesStaffError: error.response?.data?.detail || error.message || "Failed to fetch sales staff dashboard",
        salesStaffLoading: false,
      })
    }
  },

  reset: () => {
    set({
      financeData: null,
      financeLoading: false,
      financeError: null,
      purchaseData: null,
      purchaseLoading: false,
      purchaseError: null,
      storeManagerData: null,
      storeManagerLoading: false,
      storeManagerError: null,
      storeStaffData: null,
      storeStaffLoading: false,
      storeStaffError: null,
      salesStaffData: null,
      salesStaffLoading: false,
      salesStaffError: null,
    })
  },
}));
