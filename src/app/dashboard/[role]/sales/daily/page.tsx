"use client"

import { useEffect, useState } from "react"
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
  const { userBranchId, canViewAllBranches, isSales, isManager } = usePermissions()
  const { branches, fetchBranches } = useBranchStore()
  const { sales, todaysSales, fetchSales, fetchTodaysSales, loading } = useSalesStore()
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedBranchId, setSelectedBranchId] = useState("")

  // Load branches for admin users only
  useEffect(() => {
    if (canViewAllBranches && branches.length === 0) {
      fetchBranches()
    }
  }, [canViewAllBranches, branches.length, fetchBranches])

  // Set initial branch for admin
  useEffect(() => {
    if (canViewAllBranches && branches.length > 0 && !selectedBranchId) {
      setSelectedBranchId(branches[0]?.id || "")
    }
  }, [canViewAllBranches, branches, selectedBranchId])

  useEffect(() => {
    let branchFilter: string | undefined
    
    if (canViewAllBranches) {
      // Admin: send branch_id if selected
      branchFilter = selectedBranchId || undefined
    } else {
      // Sales staff and manager: DON'T send branch_id - API uses their account's branch automatically
      branchFilter = undefined
    }
    
    // Fetch sales for selected date
    fetchSales({ 
      start_date: selectedDate, 
      end_date: selectedDate 
    }, branchFilter)
    
    // Fetch today's summary - for sales staff, don't send branch_id
    // For admin, only fetch if branch is selected
    if (canViewAllBranches) {
      if (selectedBranchId) {
        fetchTodaysSales(selectedBranchId)
      }
    } else {
      // Sales staff and manager - API uses their branch automatically
      fetchTodaysSales(undefined)
    }
  }, [selectedDate, selectedBranchId, canViewAllBranches, fetchSales, fetchTodaysSales])

  const allowedRoles: AppRole[] = ["admin", "manager", "sales"]

  // Format date for display
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

          {/* Daily Stats - Only show if we have data */}
          {todaysSales && !loading.todaysSales ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-sm border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Total Sales
                    </p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                      {selectedDate === new Date().toISOString().split('T')[0] 
                        ? todaysSales.total_sales 
                        : sales.length}
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
                      ₦{(selectedDate === new Date().toISOString().split('T')[0]
                        ? todaysSales.total_revenue
                        : sales.reduce((sum, sale) => sum + sale.total_amount, 0)
                      ).toLocaleString()}
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
                      {selectedDate === new Date().toISOString().split('T')[0]
                        ? todaysSales.total_items_sold
                        : sales.reduce((sum, sale) => sum + sale.items_count, 0)
                      }
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
                      ₦{(selectedDate === new Date().toISOString().split('T')[0]
                        ? todaysSales.average_transaction_value
                        : sales.length > 0
                          ? sales.reduce((sum, sale) => sum + sale.total_amount, 0) / sales.length
                          : 0
                      ).toLocaleString()}
                    </h2>
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          ) : loading.todaysSales ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-sm border border-slate-200 bg-white p-5 animate-pulse">
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                  <div className="mt-2 h-8 w-32 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : null}

          {/* Sales Table */}
          {loading.sales ? (
            <SalesTableSkeleton />
          ) : sales.length > 0 ? (
            <SalesListTable sales={sales} />
          ) : (
            <EmptySalesState message={`No sales found for ${formatDate(selectedDate)}`} />
          )}
        </div>
      </div>
    </RoleGuard>
  )
}