import { api } from "@/lib/api";
import { DashboardStats } from "@/types/dashboard";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const res = await api.get("/dashboard/stats");
    return res.data;
  },
};
