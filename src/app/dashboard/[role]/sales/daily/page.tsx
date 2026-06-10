"use client"

import { useParams } from "next/navigation"
import { useEffect, useState, useMemo, useCallback } from "react"
import { Calendar, TrendingUp, Package, DollarSign, BarChart3, Building2 } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useSalesStore } from "@/store/saleStore"
import { useBranchStore } from "@/store/useBranchStore"
import { SalesListTable } from "@/components/sales/SalesListTable"
import { SalesTableSkeleton } from "@/components/sales/SalesTableSkeleton"
import { EmptySalesState } from "@/components/sales/EmptySalesState"
import type { AppRole } from "@/lib/roleMapper"

export default function DailySalesPage() {
  const params = useParams()
  const currentRole = params.role as string
  const { canViewAllBranches } = usePermissions()
  const { branches, fetchBranches } = useBranchStore()
  const { sales, fetchSales, loading } = useSalesStore()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedBranchId, setSelectedBranchId] = useState("")
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  // Load branches for admin users
  useEffect(() => {
    if (canViewAllBranches && branches.length === 0) {
      fetchBranches()
    }
  }, [canViewAllBranches, branches.length, fetchBranches])

  // Create a stable fetch function using useCallback
  const loadAllSales = useCallback(async () => {
    if (isDataLoaded) return
    try {
      await fetchSales({}, undefined)
      setIsDataLoaded(true)
    } catch (err) {
      console.error('Failed to load sales:', err)
    }
  }, [fetchSales, isDataLoaded])

  // Fetch ALL sales only once when component mounts
  useEffect(() => {
    loadAllSales()
  }, [loadAllSales])

  // Client-side filtering by date AND branch
  const filteredSales = useMemo(() => {
    let filtered = [...sales]
    
    // Filter by date
    filtered = filtered.filter(sale => {
      const saleDate = new Date(sale.created_at).toISOString().split('T')[0]
      return saleDate === selectedDate
    })
    
    // Filter by branch (client-side since API doesn't support it)
    if (selectedBranchId) {
      const selectedBranchName = branches.find(b => b.id === selectedBranchId)?.name
      if (selectedBranchName) {
        filtered = filtered.filter(sale => sale.branch_name === selectedBranchName)
      }
    }
    
    return filtered
  }, [sales, selectedDate, selectedBranchId, branches])

  // Calculate stats from filtered sales
  const dailyStats = useMemo(() => {
    const totalSales = filteredSales.length
    const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total_amount, 0)
    const totalItems = filteredSales.reduce((sum, sale) => sum + sale.items_count, 0)
    const avgTransaction = totalSales > 0 ? totalRevenue / totalSales : 0
    
    return { totalSales, totalRevenue, totalItems, avgTransaction }
  }, [filteredSales])

  const allowedRoles: AppRole[] = ["admin", "manager", "sales"]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Daily Sales Report</h1>
            <p className="mt-1 text-sm text-slate-500">
              View sales summary and transactions by date
            </p>
          </div>

          {/* Branch Selector for Admin Only */}
          {canViewAllBranches && branches.length > 0 && (
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-slate-400" />
                <label className="text-sm font-medium text-slate-700">Select Branch</label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="flex-1 max-w-xs rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Date Selector */}
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-slate-400" />
              <label className="text-sm font-medium text-slate-700">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
              />
            </div>
          </div>

          {/* Daily Stats */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Total Sales
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {dailyStats.totalSales}
                  </h2>
                  <p className="text-xs text-slate-400">{formatDate(selectedDate)}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Revenue
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    ₦{dailyStats.totalRevenue.toLocaleString()}
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-green-50">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Items Sold
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {dailyStats.totalItems}
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-purple-50">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Avg Transaction
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    ₦{dailyStats.avgTransaction.toLocaleString()}
                  </h2>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Sales Table */}
          {loading.sales ? (
            <SalesTableSkeleton />
          ) : filteredSales.length > 0 ? (
            <SalesListTable sales={filteredSales} currentRole={currentRole} />
          ) : (
            <EmptySalesState message={`No sales found for ${formatDate(selectedDate)}`} />
          )}
        </div>
      </div>
    </RoleGuard>
  )
}