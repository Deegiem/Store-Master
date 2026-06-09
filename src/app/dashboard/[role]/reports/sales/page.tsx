"use client"

import { useState, useEffect, useCallback, use } from "react"
import { BarChart3, ShoppingBag, CreditCard, TrendingUp, Calendar } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { reportService } from "@/services/reportService"
import { SalesStatCard } from "@/components/reports/SalesStatCard"
import { ReportDateFilterButton } from "@/components/reports/ReportDateFilterButton"

interface SalesSummaryReportPageProps {
  params: { role: string }
  searchParams: Promise<{ start_date?: string; end_date?: string }> | { start_date?: string; end_date?: string }
}

export default function SalesSummaryReportPage({ searchParams }: SalesSummaryReportPageProps) {
  // Unwrap the searchParams Promise using React.use()
  const unwrappedSearchParams = searchParams instanceof Promise ? use(searchParams) : searchParams
  const from = unwrappedSearchParams?.start_date ?? ""
  const to = unwrappedSearchParams?.end_date ?? ""
  
  const [salesSummary, setSalesSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: any = {}
      if (from) params.start_date = from
      if (to) params.end_date = to
      
      const data = await reportService.getSalesSummary(params)
      setSalesSummary(data)
    } catch (e: any) {
      console.error('Failed to fetch sales summary:', e)
      setError(e.message || 'Failed to load sales data')
    } finally {
      setLoading(false)
    }
  }, [from, to])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Safe access with fallbacks
  const grossRevenue = salesSummary?.revenue?.gross_revenue ?? 0
  const subtotal = salesSummary?.revenue?.subtotal ?? 0
  const totalTaxCollected = salesSummary?.revenue?.total_tax_collected ?? 0
  const cancelledRevenueLost = salesSummary?.revenue?.cancelled_revenue_lost ?? 0
  
  const completedSales = salesSummary?.transactions?.completed_sales ?? 0
  const cancelledSales = salesSummary?.transactions?.cancelled_sales ?? 0
  const averageTransaction = salesSummary?.transactions?.average_transaction ?? 0

  const periodStart = salesSummary?.period?.start
  const periodEnd = salesSummary?.period?.end

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Header with Date Filter */}
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Sales Summary
                </p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Revenue Snapshot</h1>
                <p className="mt-2 text-sm text-slate-500">
                  A top-level view of sales performance across your selected period.
                </p>
                {periodStart && periodEnd && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(periodStart).toLocaleDateString()} - {new Date(periodEnd).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              <ReportDateFilterButton currentStartDate={from} currentEndDate={to} />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent" />
              <span className="ml-3 text-sm text-slate-600">Loading sales data...</span>
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
                <SalesStatCard 
                  title="Gross Revenue" 
                  value={`₦${grossRevenue.toLocaleString()}`} 
                  icon={<ShoppingBag className="h-6 w-6 text-[#003e9d]" />}
                  delay={0}
                />
                <SalesStatCard 
                  title="Subtotal" 
                  value={`₦${subtotal.toLocaleString()}`} 
                  icon={<BarChart3 className="h-6 w-6 text-emerald-600" />}
                  delay={0.1}
                />
                <SalesStatCard 
                  title="Tax Collected" 
                  value={`₦${totalTaxCollected.toLocaleString()}`} 
                  icon={<CreditCard className="h-6 w-6 text-indigo-600" />}
                  delay={0.2}
                />
                <SalesStatCard 
                  title="Cancelled Revenue" 
                  value={`₦${cancelledRevenueLost.toLocaleString()}`} 
                  icon={<TrendingUp className="h-6 w-6 text-rose-600" />}
                  delay={0.3}
                />
              </div>

              {/* Transaction Metrics */}
              <div className="rounded-sm border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-6 w-6 text-slate-500" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Transaction Metrics</h2>
                    <p className="text-sm text-slate-500">
                      Completed sales, cancellations, and average transaction size.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-sm border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Completed</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {completedSales.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-sm border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Cancelled</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      {cancelledSales.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-sm border border-slate-100 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Average</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">
                      ₦{averageTransaction.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Empty State */}
          {!loading && !error && !salesSummary && (
            <div className="rounded-sm border border-amber-200 bg-amber-50 p-6 text-center">
              <p className="text-sm text-amber-800">
                No sales data available for the selected period.
              </p>
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  )
}