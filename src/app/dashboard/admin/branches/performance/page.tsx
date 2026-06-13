"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Calendar } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useBranchStore } from "@/store/useBranchStore"
import { useSalesStore } from "@/store/saleStore"
import { useAdminStore } from "@/store/adminStore"
import { BranchPerformanceStats } from "@/components/branches/BranchPerformanceStats"
import { TopPerformerCard } from "@/components/branches/TopPerformerCard"
import { BranchPerformanceTable } from "@/components/branches/BranchPerformanceTable"
import { RevenueDistributionChart } from "@/components/branches/RevenueDistributionChart"
import { BranchPerformanceSkeleton } from "@/components/branches/BranchPerformanceSkeleton"
import type { AppRole } from "@/lib/roleMapper"

export default function BranchPerformancePage() {
  const { canViewReports, isAdmin, isFinance } = usePermissions()
  const { branches, fetchBranches, branchloading } = useBranchStore()
  const { sales, fetchSales, loading } = useSalesStore()
  const { systemSettings, fetchSystemSettings } = useAdminStore()
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "quarter" | "year">("month")
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (branches.length === 0) {
      fetchBranches()
    }
    if (!systemSettings) {
      fetchSystemSettings()
    }
  }, [fetchBranches, branches.length, systemSettings, fetchSystemSettings])

  // Fetch all sales data for branch revenue calculation
  useEffect(() => {
    const loadSales = async () => {
      // Fetch sales for the selected period
      const now = new Date()
      let startDate = ""
      
      if (selectedPeriod === "month") {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
      } else if (selectedPeriod === "quarter") {
        const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3
        startDate = new Date(now.getFullYear(), quarterStartMonth, 1).toISOString().split('T')[0]
      } else {
        startDate = new Date(now.getFullYear(), 0, 1).toISOString().split('T')[0]
      }
      
      const endDate = now.toISOString().split('T')[0]
      
      await fetchSales({ start_date: startDate, end_date: endDate }, undefined)
      setIsDataLoaded(true)
    }
    
    loadSales()
  }, [selectedPeriod, fetchSales])

  const currencySymbol = systemSettings?.currency_symbol || "₦"

  // Calculate branch performance from actual sales data
  const branchMetrics = useMemo(() => {
    if (!isDataLoaded || sales.length === 0) {
      return []
    }
    
    return branches.map(branch => {
      // Filter sales for this branch
      const branchSales = sales.filter(sale => sale.branch_name === branch.name)
      
      const revenue = branchSales.reduce((sum, sale) => sum + sale.total_amount, 0)
      const salesCount = branchSales.length
      const itemsSold = branchSales.reduce((sum, sale) => sum + sale.items_count, 0)
      const avgTransaction = salesCount > 0 ? revenue / salesCount : 0
      
      // Calculate growth compared to previous period
      // This would require historical data - for now, we'll use a placeholder
      const growth = 0 // You can calculate this from previous period sales
      
      return {
        id: branch.id,
        name: branch.name,
        code: branch.code,
        revenue,
        salesCount,
        itemsSold,
        staffCount: 0, // This would come from branch staff API
        avgTransaction,
        growth,
        isActive: branch.is_active,
        currencySymbol
      }
    })
  }, [branches, sales, isDataLoaded, currencySymbol])

  // Calculate totals
  const totals = useMemo(() => {
    if (branchMetrics.length === 0) {
      return { totalRevenue: 0, totalSales: 0, totalItems: 0, activeBranches: 0, maxRevenue: 0 }
    }
    
    const totalRevenue = branchMetrics.reduce((sum, b) => sum + b.revenue, 0)
    const totalSales = branchMetrics.reduce((sum, b) => sum + b.salesCount, 0)
    const totalItems = branchMetrics.reduce((sum, b) => sum + b.itemsSold, 0)
    const activeBranches = branchMetrics.filter(b => b.isActive).length
    const maxRevenue = Math.max(...branchMetrics.map(b => b.revenue), 0)
    
    return { totalRevenue, totalSales, totalItems, activeBranches, maxRevenue }
  }, [branchMetrics])

  // Find top performer
  const topPerformer = useMemo(() => {
    if (branchMetrics.length === 0) return null
    return [...branchMetrics].sort((a, b) => b.revenue - a.revenue)[0]
  }, [branchMetrics])

  const allowedRoles: AppRole[] = ["admin", "finance"]

  // Loading states
  if (branchloading.branches || loading.sales || !isDataLoaded) {
    return <BranchPerformanceSkeleton />
  }

  if (branchMetrics.length === 0) {
    return (
      <RoleGuard allowedRoles={allowedRoles}>
        <div className="min-h-screen bg-[#F9FAFB] p-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-sm border border-amber-200 bg-amber-50 p-12 text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-amber-400" />
              <h3 className="mt-4 text-lg font-semibold text-amber-800">No Sales Data</h3>
              <p className="mt-2 text-sm text-amber-700">
                No sales data available for the selected period. Try a different date range or check back later.
              </p>
            </div>
          </div>
        </div>
      </RoleGuard>
    )
  }

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <TrendingUp className="h-3.5 w-3.5" />
                Branch Analytics
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Branch Performance
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Track and compare performance metrics across all branches based on actual sales data
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value as any)}
                  className="text-sm text-slate-900 focus:outline-none"
                >
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <BranchPerformanceStats
            totalRevenue={totals.totalRevenue}
            totalSales={totals.totalSales}
            totalItems={totals.totalItems}
            activeBranches={totals.activeBranches}
            totalBranches={branchMetrics.length}
            currencySymbol={currencySymbol}
          />

          {/* Top Performer Highlight */}
          {topPerformer && topPerformer.revenue > 0 && (
            <TopPerformerCard
              branchName={topPerformer.name}
              branchCode={topPerformer.code}
              revenue={topPerformer.revenue}
              salesCount={topPerformer.salesCount}
              growth={topPerformer.growth}
              currencySymbol={currencySymbol}
            />
          )}

          {/* Performance Table */}
          <BranchPerformanceTable
            branches={branchMetrics}
            maxRevenue={totals.maxRevenue}
            currencySymbol={currencySymbol}
          />

          {/* Revenue Distribution Chart */}
          {totals.totalRevenue > 0 && (
            <RevenueDistributionChart
              branches={branchMetrics}
              totalRevenue={totals.totalRevenue}
              currencySymbol={currencySymbol}
            />
          )}
        </div>
      </div>
    </RoleGuard>
  )
}