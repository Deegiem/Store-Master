import { useEffect, useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useBranchStore } from "@/store/useBranchStore"

export const useDashboardData = () => {
  const dashboard = useAdminStore((s) => s.dashboard)
  const auditLogs = useAdminStore((s) => s.auditLogs)
  const loading = useAdminStore((s) => s.adminloading.dashboard || s.adminloading.auditLogs)
  const { fetchBranchStaff, branchStaff, branchloading } = useBranchStore()
  
  const [branchesWithStaff, setBranchesWithStaff] = useState<any[]>([])
  const [isLoadingStaff, setIsLoadingStaff] = useState(false)

  useEffect(() => {
    const store = useAdminStore.getState()
    store.fetchDashboard()
    store.fetchAuditLogs({ limit: 5 })
  }, [])

  // Fetch staff for all branches when dashboard loads
  useEffect(() => {
    const fetchStaffForAllBranches = async () => {
      const branchesData = dashboard?.branch_performance.all_branches ?? []
      if (branchesData.length === 0) return
      
      setIsLoadingStaff(true)
      
      // Create a copy of branches with staff data
      const updatedBranches = await Promise.all(
        branchesData.map(async (branch) => {
          try {
            // Fetch staff for this branch
            await fetchBranchStaff(branch.branch_id)
            const staffData = useBranchStore.getState().branchStaff
            
            return {
              ...branch,
              staff: staffData?.staff || []
            }
          } catch (err) {
            console.error(`Failed to fetch staff for branch ${branch.branch_name}:`, err)
            return {
              ...branch,
              staff: []
            }
          }
        })
      )
      
      setBranchesWithStaff(updatedBranches)
      setIsLoadingStaff(false)
    }
    
    fetchStaffForAllBranches()
  }, [dashboard, fetchBranchStaff])

  // 🔥 Derived values
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

  const branches = branchesWithStaff.length > 0 ? branchesWithStaff : (dashboard?.branch_performance.all_branches ?? [])

  return {
    dashboard,
    auditLogs,
    loading: loading || isLoadingStaff,
    outOfStock,
    lowStock,
    branches,
  }
}