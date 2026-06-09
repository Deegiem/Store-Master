// src/app/dashboard/purchase/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShoppingCart, Package, Truck, Sparkles, Plus, Clock } from "lucide-react"
import { useDashboardStore } from "@/store/dashboardStore"
import { usePermissions } from "@/hooks/usePermissions"
import { StatCard } from "@/components/dashboard/StatCard"
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable"
import { StockAlertCard } from "@/components/dashboard/StockAlertCard"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { DashboardError } from "@/components/dashboard/DashboardError"
import { CreatePOModal } from "@/components/procurement/CreatePOModal"

export default function PurchaseDashboardPage() {
  const router = useRouter()
  const { canViewPurchaseDashboard } = usePermissions()
  const { purchaseData, purchaseLoading, purchaseError, fetchPurchaseDashboard } = useDashboardStore()
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    if (canViewPurchaseDashboard) {
      fetchPurchaseDashboard()
    }
  }, [canViewPurchaseDashboard, fetchPurchaseDashboard])

  if (purchaseLoading) return <DashboardSkeleton title="Purchase Dashboard" />
  if (purchaseError) return <DashboardError message={purchaseError} />
  if (!purchaseData) return null

  const stats = [
    {
      label: "Pending Approvals",
      value: purchaseData.pos_summary.pending_approval,
      icon: Clock,
      color: "amber" as const,
    },
    {
      label: "Active Suppliers",
      value: purchaseData.active_suppliers,
      icon: Truck,
      color: "purple" as const,
    },
    {
      label: "Total POs Created",
      value: purchaseData.pos_summary.my_recent_pos.length,
      icon: ShoppingCart,
      color: "blue" as const,
    },
    {
      label: "Out of Stock Items",
      value: purchaseData.stock_alerts.out_of_stock_count,
      icon: Package,
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
              Procurement Operations
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Purchase Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track purchase orders, supplier performance, and stock alerts
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/dashboard/purchase/procurement/pending-approval")}
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-amber-200 bg-amber-50 px-5 text-sm font-semibold text-amber-700 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Clock className="h-4 w-4" />
              Pending Approvals
            </button>
            <button
              onClick={() => setCreateOpen(true)}  // Changed: open modal instead of navigate
              className="inline-flex h-11 items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Plus className="h-4 w-4" />
              Create PO
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 0.05} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent POs */}
          <RecentOrdersTable orders={purchaseData.pos_summary.my_recent_pos} delay={0.1} />

          {/* Stock Alerts */}
          <StockAlertCard alerts={purchaseData.stock_alerts} delay={0.15} />
        </div>
      </div>

      {/* Create PO Modal */}
      <CreatePOModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}