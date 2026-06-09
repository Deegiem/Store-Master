"use client"

import { useEffect } from "react"
import { useReportStore } from "@/store/useReportStore"
import { RoleGuard } from "@/components/RoleGuard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"
import { ShoppingCart } from "lucide-react"

export default function ProcurementSpendReportPage() {
  const { procurementSpend, loading, error, fetchProcurementSpend } = useReportStore()

  useEffect(() => {
    fetchProcurementSpend()
  }, [fetchProcurementSpend])

  if (loading.procurementSpend) return <DashboardSkeleton title="Procurement Spend" />
  if (error.procurementSpend) return <DashboardError message={error.procurementSpend} onRetry={() => fetchProcurementSpend()} />

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Procurement Spend</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Purchasing Insights</h1>
            <p className="mt-2 text-sm text-slate-500">Review branch and supplier spending trends for the selected period.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Spend</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{procurementSpend?.total_procurement_spend.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total POs</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{procurementSpend?.total_pos ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Branch Count</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{procurementSpend?.by_branch.length ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Supplier Count</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{procurementSpend?.by_supplier.length ?? 0}</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-sm border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Spend by Branch</h2>
              <div className="mt-4 space-y-3">
                {procurementSpend?.by_branch.map((branch) => (
                  <div key={branch.branch} className="rounded-sm bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{branch.branch}</p>
                        <p className="text-sm text-slate-500">Branch spend</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">₦{branch.spend.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-slate-900">Spend by Supplier</h2>
              <div className="mt-4 space-y-3">
                {procurementSpend?.by_supplier.map((supplier) => (
                  <div key={supplier.supplier} className="rounded-sm bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{supplier.supplier}</p>
                        <p className="text-sm text-slate-500">Supplier total spend</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">₦{supplier.spend.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
