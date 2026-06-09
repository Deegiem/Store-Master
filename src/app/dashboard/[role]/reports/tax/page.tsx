"use client"

import { useEffect } from "react"
import { useReportStore } from "@/store/useReportStore"
import { RoleGuard } from "@/components/RoleGuard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"
import { FileText } from "lucide-react"

export default function TaxReportPage() {
  const { taxReport, loading, error, fetchTaxReport } = useReportStore()

  useEffect(() => {
    fetchTaxReport()
  }, [fetchTaxReport])

  if (loading.taxReport) return <DashboardSkeleton title="Tax Report" />
  if (error.taxReport) return <DashboardError message={error.taxReport} onRetry={() => fetchTaxReport()} />

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Tax Reports</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Tax Summary</h1>
            <p className="mt-2 text-sm text-slate-500">Monitor VAT collection and tax efficiency across your business.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">VAT Collected</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{taxReport?.total_vat_collected.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Revenue</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{taxReport?.total_revenue.toLocaleString() ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Effective Tax Rate</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{taxReport?.effective_tax_rate.toFixed(2) ?? 0}%</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Branch Tax Lines</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{taxReport?.by_branch.length ?? 0}</p>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-900">Branch Tax Breakdown</h2>
            </div>
            <div className="mt-4 grid gap-4">
              {taxReport?.by_branch.map((branch) => (
                <div key={branch.branch_name} className="rounded-sm border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">{branch.branch_name}</p>
                      <p className="text-sm text-slate-500">Branch tax collected</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">₦{branch.tax_collected.toLocaleString()}</p>
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
