"use client"

import { useEffect } from "react"
import { useReportStore } from "@/store/useReportStore"
import { RoleGuard } from "@/components/RoleGuard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"
import { TrendingUp } from "lucide-react"

export default function ProfitReportPage() {
  const { profitReport, loading, error, fetchProfitReport } = useReportStore()

  useEffect(() => {
    fetchProfitReport()
  }, [fetchProfitReport])

  if (loading.profitReport) return <DashboardSkeleton title="Profit Report" />
  if (error.profitReport) return <DashboardError message={error.profitReport} onRetry={() => fetchProfitReport()} />

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Profit Report</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Gross Profit Insights</h1>
            <p className="mt-2 text-sm text-slate-500">View revenue, cost, and gross margin performance.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Revenue</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{profitReport?.overall.total_revenue.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total COGS</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{profitReport?.overall.total_cogs.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Gross Profit</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{profitReport?.overall.gross_profit.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Margin</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{profitReport?.overall.margin_percentage.toFixed(2) ?? 0}%</p>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Profit by Branch</h2>
            <div className="mt-4 grid gap-4">
              {profitReport?.by_branch.map((branch) => (
                <div key={branch.branch_id} className="rounded-sm border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{branch.branch_name}</p>
                      <p className="text-sm text-slate-500">Revenue: ₦{branch.revenue.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Margin</p>
                      <p className="font-semibold text-slate-900">{branch.margin_percentage.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
