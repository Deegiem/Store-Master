import { create } from "zustand";
import { DashboardStats } from "@/types/dashboard";
import { dashboardService } from "@/services/dashboardService";

interface DashboardStore {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const data = await dashboardService.getStats();
      set({ stats: data, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch dashboard stats", loading: false });
    }
  },
}));
