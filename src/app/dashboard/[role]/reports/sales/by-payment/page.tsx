"use client"

import { use, useState, useEffect, useCallback } from "react"
import { RoleGuard } from "@/components/RoleGuard"
import { reportService } from "@/services/reportService"
import { ReportTable } from "@/components/reports/ReportTable"
import { ReportDateFilterButton } from "@/components/reports/ReportDateFilterButton"
import { PieChart, Wallet, TrendingUp } from "lucide-react"

interface Props {
  params: { role: string }
  searchParams: Promise<{ start_date?: string; end_date?: string }> | { start_date?: string; end_date?: string }
}

export default function SalesByPaymentReportPage({ searchParams }: Props) {
  // Unwrap the searchParams Promise
  const unwrappedSearchParams = searchParams instanceof Promise ? use(searchParams) : searchParams
  const from = unwrappedSearchParams?.start_date ?? ""
  const to = unwrappedSearchParams?.end_date ?? ""
  
  const [salesByPayment, setSalesByPayment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: any = {}
      if (from) params.start_date = from
      if (to) params.end_date = to
      
      const data = await reportService.getSalesByPayment(params)
      setSalesByPayment(data)
    } catch (e: any) {
      console.error('Failed to fetch sales by payment:', e)
      setError(e.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const columns = [
    { key: "method", label: "Method" },
    { key: "revenue", label: "Revenue" },
    { key: "transactions", label: "Transactions" },
    { key: "share", label: "Share" },
  ]

  const paymentBreakdown = salesByPayment?.payment_breakdown ?? []

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header */}
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Sales by Payment
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Payment Method Insights</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Understand how payments are distributed across methods.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <Wallet className="h-4 w-4" />
                  {paymentBreakdown.length} methods
                </div>
                <ReportDateFilterButton currentStartDate={from} currentEndDate={to} />
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent" />
              <span className="ml-3 text-sm text-slate-600">Loading payment data...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={fetchData}
                className="mt-3 rounded-sm bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Stats Grid */}
          {!loading && !error && (
            <>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-sm border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Total Revenue</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    ₦{(salesByPayment?.total_revenue ?? 0).toLocaleString()}
                  </p>
                </div>
                <div className="rounded-sm border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Payment Types</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {paymentBreakdown.length}
                  </p>
                </div>
                <div className="rounded-sm border border-slate-200 bg-white p-5">
                  <p className="text-sm text-slate-500">Top Method</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {paymentBreakdown[0]?.payment_method ?? "-"}
                  </p>
                </div>
                <div className="rounded-sm border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <PieChart className="h-5 w-5 text-emerald-600" />
                    <p className="text-sm">Revenue share</p>
                  </div>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {(paymentBreakdown[0]?.percentage ?? 0).toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Payment Breakdown Table */}
              <div>
                <div className="flex items-center gap-3 text-slate-700">
                  <TrendingUp className="h-5 w-5 text-[#003e9d]" />
                  <h2 className="text-lg font-semibold text-slate-900">Payment breakdown</h2>
                </div>
                <div className="mt-6">
                  <ReportTable
                    columns={columns}
                    rows={paymentBreakdown}
                    renderCell={(row: any, key: string) => {
                      if (key === "method") return row.payment_method
                      if (key === "revenue") return `₦${(row.revenue ?? 0).toLocaleString()}`
                      if (key === "transactions") return row.transaction_count
                      if (key === "share") return `${(row.percentage ?? 0).toFixed(1)}%`
                      return null
                    }}
                    emptyMessage="No payment data available for the selected period"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </RoleGuard>
  )
}