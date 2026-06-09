// src/app/dashboard/finance/page.tsx
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { DollarSign, FileText, TrendingUp, Clock, Sparkles, Wallet, Percent, Ban } from "lucide-react"
import { useDashboardStore } from "@/store/dashboardStore"
import { usePermissions } from "@/hooks/usePermissions"
import { StatCard } from "@/components/dashboard/StatCard"
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"

export default function FinanceDashboardPage() {
  const router = useRouter()
  const { canViewFinanceDashboard, role, isFinance } = usePermissions()
  const { financeData, financeLoading, financeError, fetchFinanceDashboard } = useDashboardStore()
  console.log('Finance Dashboard - Role:', role, 'isFinance:', isFinance)

  useEffect(() => {
    if (canViewFinanceDashboard) {
      fetchFinanceDashboard()
    }
  }, [canViewFinanceDashboard, fetchFinanceDashboard])

  if (financeLoading) return <DashboardSkeleton title="Finance Dashboard" />
  if (financeError) return <DashboardError message={financeError} />
  if (!financeData) return null

  const stats = [
    {
      label: "Revenue (This Month)",
      value: `₦${financeData.revenue.this_month.toLocaleString()}`,
      icon: DollarSign,
      trend: {
        value: Math.abs(financeData.revenue.change_percentage),
        isPositive: financeData.revenue.trend === "up",
      },
      color: "green" as const,
    },
    {
      label: "Tax Collected",
      value: `₦${financeData.tax_collected.toLocaleString()}`,
      icon: FileText,
      color: "blue" as const,
    },
    {
      label: "Discounts Given",
      value: `₦${financeData.discounts_given.toLocaleString()}`,
      icon: Percent,
      color: "purple" as const,
    },
    {
      label: "Cancelled Revenue Lost",
      value: `₦${financeData.cancelled_revenue_lost.toLocaleString()}`,
      icon: Ban,
      color: "red" as const,
    },
  ]

  return (
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
              <Sparkles className="h-3.5 w-3.5" />
              Financial Overview
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Finance Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Monitor financial metrics and procurement approvals
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
              {new Date().toLocaleDateString(undefined, { month: "long", year: "numeric" })}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.05} />
          ))}
        </div>

        {/* Payment Breakdown */}
        {Object.keys(financeData.payment_breakdown).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-sm border border-slate-200 bg-white p-5"
          >
            <h3 className="font-semibold text-slate-900">Payment Breakdown</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(financeData.payment_breakdown).map(([method, amount]) => (
                <div key={method} className="flex items-center justify-between rounded-sm bg-slate-50 p-3">
                  <span className="text-sm text-slate-600 capitalize">{method}</span>
                  <span className="font-semibold text-slate-900">₦{amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pending PO Approvals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-sm border border-amber-200 bg-amber-50 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Pending Approvals</h3>
              </div>
              <p className="mt-1 text-sm text-amber-700">
                {financeData.pending_po_approvals.count} orders worth ₦{financeData.pending_po_approvals.total_value.toLocaleString()} awaiting your review
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/finance/procurement/pending-approval")}
              className="rounded-sm bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              Review Now
            </button>
          </div>
        </motion.div>

        {/* Recent Orders Table */}
        {financeData.pending_po_approvals.orders.length > 0 && (
          <RecentOrdersTable
            orders={financeData.pending_po_approvals.orders.map(order => ({
              ...order,
              status: "Pending Approval"
            }))}
            title="Pending Approvals"
            delay={0.3}
          />
        )}
      </div>
    </div>
  )
}