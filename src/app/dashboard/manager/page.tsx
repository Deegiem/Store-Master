// src/app/dashboard/manager/page.tsx
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Building2, TrendingUp, Package, AlertTriangle, Truck, Sparkles, Eye } from "lucide-react"
import { useDashboardStore } from "@/store/dashboardStore"
import { usePermissions } from "@/hooks/usePermissions"
import { StatCard } from "@/components/dashboard/StatCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"

export default function StoreManagerDashboardPage() {
  const router = useRouter()
  const { canViewStoreManagerDashboard } = usePermissions()
  const { storeManagerData, storeManagerLoading, storeManagerError, fetchStoreManagerDashboard } = useDashboardStore()

  useEffect(() => {
    if (canViewStoreManagerDashboard) {
      fetchStoreManagerDashboard()
    }
  }, [canViewStoreManagerDashboard, fetchStoreManagerDashboard])

  if (storeManagerLoading) return <DashboardSkeleton title="Store Manager Dashboard" />
  if (storeManagerError) return <DashboardError message={storeManagerError} onRetry={fetchStoreManagerDashboard} />
  if (!storeManagerData) return null

  const stats = [
    {
      label: "Total Sales Today",
      value: storeManagerData.today_summary.total_sales,
      icon: TrendingUp,
      color: "blue" as const,
    },
    {
      label: "Revenue",
      value: `₦${storeManagerData.today_summary.total_revenue.toLocaleString()}`,
      icon: Building2,
      color: "green" as const,
    },
    {
      label: "Low Stock Items",
      value: storeManagerData.inventory_status.low_stock_count,
      icon: AlertTriangle,
      color: "amber" as const,
    },
    {
      label: "Out of Stock",
      value: storeManagerData.inventory_status.out_of_stock_count,
      icon: Package,
      color: "red" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              Store Operations
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Store Manager Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage {storeManagerData.branch_name} branch operations
            </p>
          </div>
          <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
            Avg Transaction: ₦{storeManagerData.today_summary.avg_transaction.toLocaleString()}
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.05} />
          ))}
        </div>

        {/* Pending Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
              <Truck className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Pending Actions</h3>
              <p className="text-sm text-slate-500">
                {storeManagerData.pending_actions.transfers_to_approve} transfer{storeManagerData.pending_actions.transfers_to_approve !== 1 ? "s" : ""} to approve, 
                {storeManagerData.pending_actions.incoming_transfers} incoming transfer{storeManagerData.pending_actions.incoming_transfers !== 1 ? "s" : ""}, 
                {storeManagerData.pending_actions.incoming_purchase_orders} PO{storeManagerData.pending_actions.incoming_purchase_orders !== 1 ? "s" : ""} to receive
              </p>
            </div>
          </div>
        </motion.div>

        {/* Staff Performance */}
        {storeManagerData.staff_performance_today.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-sm border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="font-semibold text-slate-900">Today's Staff Performance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Staff</th>
                    <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Sales</th>
                    <th className="whitespace-nowrap px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {storeManagerData.staff_performance_today.map((staff, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">{staff.staff_name}</td>
                      <td className="whitespace-nowrap px-5 py-3 text-slate-600">{staff.sales_count} sales</td>
                      <td className="whitespace-nowrap px-5 py-3 font-semibold text-slate-900">₦{staff.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}