// src/app/dashboard/admin/branches/[branchId]/inventory/page.tsx
"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Package, Box, AlertTriangle, CheckCircle } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import { InventoryKPICard } from "@/components/branches/InventoryKPICard"
import { InventorySkeleton } from "@/components/branches/InventorySkeleton"

export default function BranchInventoryPage() {
  const { branchId } = useParams()
  const router = useRouter()
  const { inventorySummary, fetchBranchInventorySummary, branchloading } = useBranchStore()

  useEffect(() => {
    if (branchId) fetchBranchInventorySummary(branchId as string)
  }, [branchId, fetchBranchInventorySummary])

  const inventory = inventorySummary

  type InventoryKPI = {
    label: string
    value: number
    icon: typeof Package
    color: "blue" | "green" | "orange" | "red"
  }

  const kpis: InventoryKPI[] = [
    {
      label: "Total Products",
      value: inventory?.total_products || 0,
      icon: Package,
      color: "blue",
    },
    {
      label: "Total Units",
      value: inventory?.total_units_in_stock || 0,
      icon: Box,
      color: "green",
    },
    {
      label: "Low Stock",
      value: inventory?.low_stock_count || 0,
      icon: AlertTriangle,
      color: "orange",
    },
    {
      label: "Out of Stock",
      value: inventory?.out_of_stock_count || 0,
      icon: CheckCircle,
      color: "red",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => router.back()}
            className="rounded-sm p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <Package className="h-3.5 w-3.5" />
              Stock Overview
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Inventory Summary
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Real-time stock levels and metrics
            </p>
          </div>
        </motion.div>

        {/* Content */}
        {branchloading.inventorySummary ? (
          <InventorySkeleton />
        ) : !inventory ? (
          <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
            <Package className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">No inventory data</p>
            <p className="mt-1 text-sm text-slate-500">Inventory data will appear here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* KPI Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((kpi, index) => (
                <InventoryKPICard key={kpi.label} {...kpi} delay={index * 0.1} />
              ))}
            </div>

            {/* Additional Info */}
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">Stock Health</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Stock Level</span>
                    <span className="text-slate-900 font-medium">
                      {Math.round((inventory.total_units_in_stock / (inventory.total_products * 100)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#003e9d] to-[#0050c9]"
                      style={{ width: `${Math.min((inventory.total_units_in_stock / (inventory.total_products * 100)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="rounded-sm bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Inventory Turnover</p>
                    <p className="text-lg font-semibold text-slate-900">—</p>
                  </div>
                  <div className="rounded-sm bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">Stock Value</p>
                    <p className="text-lg font-semibold text-slate-900">—</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}