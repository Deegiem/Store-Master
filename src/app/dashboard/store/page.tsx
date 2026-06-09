// src/app/dashboard/store/page.tsx
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Package, Truck, ClipboardList, CheckCircle, Sparkles, Eye, ArrowRight, TrendingUp } from "lucide-react"
import { useDashboardStore } from "@/store/dashboardStore"
import { usePermissions } from "@/hooks/usePermissions"
import { StatCard } from "@/components/dashboard/StatCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"

export default function StoreStaffDashboardPage() {
  const router = useRouter()
  const { canViewStoreStaffDashboard } = usePermissions()
  const { storeStaffData, storeStaffLoading, storeStaffError, fetchStoreStaffDashboard } = useDashboardStore()

  useEffect(() => {
    if (canViewStoreStaffDashboard) {
      fetchStoreStaffDashboard()
    }
  }, [canViewStoreStaffDashboard, fetchStoreStaffDashboard])

  if (storeStaffLoading) return <DashboardSkeleton title="Store Staff Dashboard" />
  if (storeStaffError) return <DashboardError message={storeStaffError} onRetry={fetchStoreStaffDashboard} />
  if (!storeStaffData) return null

  const stats = [
    {
      label: "POs to Receive",
      value: storeStaffData.tasks.pos_to_receive,
      icon: Package,
      color: "blue" as const,
    },
    {
      label: "Transfers to Ship",
      value: storeStaffData.tasks.transfers_to_ship,
      icon: Truck,
      color: "amber" as const,
    },
    {
      label: "Transfers to Receive",
      value: storeStaffData.tasks.transfers_to_receive,
      icon: CheckCircle,
      color: "green" as const,
    },
    {
      label: "Total Pending",
      value: storeStaffData.tasks.total_pending_tasks,
      icon: ClipboardList,
      color: "purple" as const,
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
              Store Operations
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Store Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage inventory receiving, stock transfers, and daily operations
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/dashboard/store/inventory")}
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Package className="h-4 w-4" />
              View Inventory
            </button>
            <button
              onClick={() => router.push("/dashboard/store/transfers/create")}
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Truck className="h-4 w-4" />
              Create Transfer
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.05} />
          ))}
        </div>

        {/* Purchase Orders Ready to Receive */}
        {storeStaffData.purchase_orders_ready.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-sm border border-slate-200 bg-white"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h3 className="font-semibold text-slate-900">Purchase Orders Ready to Receive</h3>
                <p className="text-sm text-slate-500">Goods awaiting receipt into inventory</p>
              </div>
              <button
                onClick={() => router.push("/dashboard/store/procurement/approved")}
                className="text-sm text-[#003e9d] hover:underline flex items-center gap-1"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {storeStaffData.purchase_orders_ready.map((po) => (
                <div key={po.po_id} className="flex items-center justify-between p-5 hover:bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">PO #{po.po_id.slice(0, 8)}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {po.items_count} item{po.items_count !== 1 ? "s" : ""} • ₦{po.total_amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">
                      {new Date(po.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => router.push(`/dashboard/store/procurement/${po.po_id}`)}
                      className="rounded-sm bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                    >
                      Receive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Transfers to Ship */}
        {storeStaffData.transfers_to_ship.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-sm border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="font-semibold text-slate-900">Transfers to Ship</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {storeStaffData.transfers_to_ship.map((transfer) => (
                <div key={transfer.transfer_id} className="flex items-center justify-between p-5 hover:bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Transfer #{transfer.transfer_id.slice(0, 8)}</p>
                    <p className="mt-1 text-sm text-slate-500">{transfer.total_items} items to ship</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">
                      {new Date(transfer.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => router.push(`/dashboard/store/transfers/${transfer.transfer_id}`)}
                      className="rounded-sm bg-amber-50 px-4 py-2 text-sm font-medium text-amber-600 transition hover:bg-amber-100"
                    >
                      Ship Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Transfers to Receive */}
        {storeStaffData.transfers_to_receive.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-sm border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-200 px-5 py-4">
              <h3 className="font-semibold text-slate-900">Transfers to Receive</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {storeStaffData.transfers_to_receive.map((transfer) => (
                <div key={transfer.transfer_id} className="flex items-center justify-between p-5 hover:bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Transfer #{transfer.transfer_id.slice(0, 8)}</p>
                    <p className="mt-1 text-sm text-slate-500">{transfer.total_items} items incoming</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">
                      {new Date(transfer.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => router.push(`/dashboard/store/transfers/${transfer.transfer_id}`)}
                      className="rounded-sm bg-green-50 px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-100"
                    >
                      Receive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State - No Tasks */}
        {storeStaffData.purchase_orders_ready.length === 0 && 
         storeStaffData.transfers_to_ship.length === 0 && 
         storeStaffData.transfers_to_receive.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white py-16 text-center"
          >
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">All caught up!</h3>
            <p className="mt-1 text-sm text-slate-500">No pending tasks at this time</p>
            <button
              onClick={() => router.push("/dashboard/store/inventory")}
              className="mt-4 inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
            >
              <TrendingUp className="h-4 w-4" />
              View Inventory
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}