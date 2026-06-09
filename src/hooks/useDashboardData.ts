import { useEffect } from "react"
import { useAdminStore } from "@/store/adminStore"

export const useDashboardData = () => {
  const dashboard = useAdminStore((s) => s.dashboard)
  const auditLogs = useAdminStore((s) => s.auditLogs)
  const loading = useAdminStore((s) => s.adminloading.dashboard || s.adminloading.auditLogs)

  useEffect(() => {
    const store = useAdminStore.getState()
    store.fetchDashboard()
    store.fetchAuditLogs({ limit: 5 })
  }, [])

  // 🔥 Derived values (THIS is key)
  const outOfStock =
    dashboard?.stock_alerts.details.reduce(
      (acc, item) => acc + item.out_of_stock_count,
      0
    ) ?? 0

  const lowStock =
    dashboard?.stock_alerts.details.reduce(
      (acc, item) => acc + item.critical_stock_count,
      0
    ) ?? 0

  const branches = dashboard?.branch_performance.all_branches ?? []

  return {
    dashboard,
    auditLogs,
    loading,
    outOfStock,
    lowStock,
    branches,
  }
}
