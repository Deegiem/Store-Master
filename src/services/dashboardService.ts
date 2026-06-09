import { api } from "@/lib/api";
import {
  DashboardStats,
  FinanceDashboardData,
  PurchaseDashboardData,
  StoreManagerDashboardData,
  StoreStaffDashboardData,
  SalesStaffDashboardData,
} from "@/types/dashboard";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await api.get("/dashboard/stats");
    return res.data;
  },

  // Finance Dashboard
  getFinanceDashboard: async (): Promise<FinanceDashboardData> => {
    const res = await api.get<FinanceDashboardData>("/dashboard/finance")
    return res.data
  },

  // Purchase Manager Dashboard
  getPurchaseDashboard: async (): Promise<PurchaseDashboardData> => {
    const res = await api.get<PurchaseDashboardData>("/dashboard/purchase-manager")
    return res.data
  },

  // Store Manager Dashboard
  getStoreManagerDashboard: async (): Promise<StoreManagerDashboardData> => {
    const res = await api.get<StoreManagerDashboardData>("/dashboard/store-manager")
    return res.data
  },

  // Store Staff Dashboard
  getStoreStaffDashboard: async (): Promise<StoreStaffDashboardData> => {
    const res = await api.get<StoreStaffDashboardData>("/dashboard/store-staff")
    return res.data
  },

  // Sales Staff Dashboard
  getSalesStaffDashboard: async (): Promise<SalesStaffDashboardData> => {
    const res = await api.get<SalesStaffDashboardData>("/dashboard/sales-staff")
    return res.data
  },
};
