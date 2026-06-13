// src/app/dashboard/sales/page.tsx

"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { TrendingUp, ShoppingBag, Award, Sparkles, Package, Eye } from "lucide-react"
import { useDashboardStore } from "@/store/dashboardStore"
import { usePermissions } from "@/hooks/usePermissions"
import { StatCard } from "@/components/dashboard/StatCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"
import { RoleGuard } from "@/components/RoleGuard"
import type { AppRole } from "@/lib/roleMapper"

export default function SalesStaffDashboardPage() {
  const router = useRouter()
  const { canViewSalesDashboard } = usePermissions()
  const { salesStaffData, salesStaffLoading, salesStaffError, fetchSalesStaffDashboard } = useDashboardStore()

  useEffect(() => {
    if (canViewSalesDashboard) {
      fetchSalesStaffDashboard()
    }
  }, [canViewSalesDashboard, fetchSalesStaffDashboard])

  if (salesStaffLoading) return <DashboardSkeleton title="Sales Dashboard" />

  if (salesStaffError) return <DashboardError message={salesStaffError} onRetry={fetchSalesStaffDashboard} />

  if (!salesStaffData) return null

  const stats = [
    {
      label: "Today's Sales",
      value: salesStaffData.today.sales_count,
      icon: ShoppingBag,
      color: "blue" as const,
    },
    {
      label: "Revenue Generated",
      value: `₦${salesStaffData.today.revenue_generated.toLocaleString()}`,
      icon: TrendingUp,
      color: "green" as const,
    },
    {
      label: "Items Sold",
      value: salesStaffData.today.items_sold,
      icon: Package,
      color: "purple" as const,
    },
    {
      label: "Avg Transaction",
      value: `₦${salesStaffData.today.avg_transaction.toLocaleString()}`,
      icon: Award,
      color: "amber" as const,
    },
  ]

  const allowedRoles: AppRole[] = ["sales"]

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
                <Sparkles className="h-3.5 w-3.5" />
                Sales Performance
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Sales Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Welcome back, {salesStaffData.my_name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
                {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} {...stat} delay={index * 0.05} />
            ))}
          </div>

          {/* Branch Rank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-sm border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Branch Performance</h3>
                <p className="text-sm text-slate-500">
                  {salesStaffData.branch_rank.my_rank
                    ? `Ranked #${salesStaffData.branch_rank.my_rank} of ${salesStaffData.branch_rank.total_staff_selling} active sellers`
                    : `No rank yet - ${salesStaffData.branch_rank.total_staff_selling} active sellers in this branch`}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recent Sales Table */}
          {salesStaffData.recent_sales.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-sm border border-slate-200 bg-white"
            >
              <div className="border-b border-slate-200 px-5 py-4">
                <h3 className="font-semibold text-slate-900">Recent Sales</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Sale Number
                      </th>
                      <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Amount
                      </th>
                      <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Items
                      </th>
                      <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Payment Method
                      </th>
                      <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Date
                      </th>
                      <th className="whitespace-nowrap px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {salesStaffData.recent_sales.map((sale) => (
                      <tr key={sale.sale_number} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-5 py-3 font-mono text-xs font-medium text-slate-900">
                          {sale.sale_number}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-900">
                          ₦{sale.total_amount.toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-slate-600">{sale.items_count} items</td>
                        <td className="whitespace-nowrap px-5 py-3 text-slate-600">
                          {(sale as any).payment_method || '—'}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-slate-500">
                          {new Date(sale.created_at).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3 text-right">
                          <button
                            onClick={() => router.push(`/dashboard/sales/${sale.sale_number}`)}
                            className="inline-flex items-center gap-1 text-[#003e9d] hover:underline"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Empty State for Recent Sales */}
          {salesStaffData.recent_sales.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white py-12 text-center"
            >
              <ShoppingBag className="h-12 w-12 text-slate-300" />
              <p className="mt-3 text-slate-500">No recent sales yet</p>
              <button
                onClick={() => router.push("/dashboard/sales/pos")}
                className="mt-3 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
              >
                Start Selling
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </RoleGuard>
  )
}