// src/app/dashboard/store/inventory/page.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { useInventoryStore } from "@/store/useInventoryStore"
import { StoreDashboardLayout } from "@/components/StoreDashboardLayout"
import { StockCard } from "@/components/inventory/StockCard"
import { InventoryTable } from "@/components/inventory/InventoryTable"
import { AdjustStockModal } from "@/components/inventory/AdjustStockModal"
import { RefreshCw, Package, AlertTriangle, History, LayoutGrid, Table, Sparkles } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"
import type { AdjustmentReason } from "@/types/inventory"

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

export default function StoreInventoryPage() {
  const { profile } = useAuthStore()
  const { canManageInventory, isAdmin, isManager } = usePermissions()
  const {
    inventory,
    lowStockItems,
    adjustmentHistory,
    loading,
    fetchBranchInventory,
    fetchLowStockItems,
    fetchAdjustmentHistory,
    adjustStock,
  } = useInventoryStore()

  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null)
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")
  const [activeTab, setActiveTab] = useState<"inventory" | "low-stock" | "history">("inventory")

  const branchId = profile?.branchId || ""
  const canAdjustStock = canManageInventory || isAdmin || isManager

  useEffect(() => {
    if (branchId) {
      fetchBranchInventory(branchId)
      fetchLowStockItems(branchId)
      fetchAdjustmentHistory(branchId)
    }
  }, [branchId])

  const handleRefresh = () => {
    fetchBranchInventory(branchId)
    fetchLowStockItems(branchId)
    fetchAdjustmentHistory(branchId)
  }

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
              Inventory Management Suite
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Inventory
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track and manage stock levels for your branch
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleRefresh}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Total Products
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{inventory.length}</p>
              </div>
              <div className="rounded-sm bg-blue-50 p-3">
                <Package className="h-6 w-6 text-[#003e9d]" />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Low Stock Items
                </p>
                <p className="mt-2 text-3xl font-bold text-yellow-600">{lowStockItems.length}</p>
              </div>
              <div className="rounded-sm bg-yellow-50 p-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Total Adjustments
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{adjustmentHistory.length}</p>
              </div>
              <div className="rounded-sm bg-purple-50 p-3">
                <History className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200">
          <nav className="flex gap-6">
            {[
              { id: "inventory", label: "All Inventory", icon: Package },
              { id: "low-stock", label: "Low Stock", icon: AlertTriangle },
              { id: "history", label: "Adjustment History", icon: History }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "relative pb-3 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "text-[#003e9d] border-b-2 border-[#003e9d]"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.id === "low-stock" && lowStockItems.length > 0 && (
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                      {lowStockItems.length}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* View Toggle (for inventory tab) */}
        {activeTab === "inventory" && !loading && inventory.length > 0 && (
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setViewMode("cards")}
              className={cn(
                "rounded-sm p-2 transition-all",
                viewMode === "cards"
                  ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "rounded-sm p-2 transition-all",
                viewMode === "table"
                  ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-md"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              <Table className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Content */}
        {activeTab === "inventory" && (
          <>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#003e9d] border-t-transparent"></div>
                  <p className="text-sm text-slate-500">Loading inventory...</p>
                </div>
              </div>
            ) : inventory.length === 0 ? (
              <div className="rounded-sm border border-slate-200 bg-white py-16 text-center">
                <Package className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">No products found</h3>
                <p className="mt-1 text-sm text-slate-500">Your branch inventory is empty</p>
              </div>
            ) : viewMode === "cards" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {inventory.map((item) => (
                  <StockCard
                    key={item._id}
                    productName={item.product_name}
                    quantity={item.quantity}
                    reorderPoint={item.reorder_point}
                    sellingPrice={item.selling_price}
                    onClick={() => canAdjustStock && setSelectedProduct(item)}
                  />
                ))}
              </div>
            ) : (
              <InventoryTable
                items={inventory}
                onAdjustStock={canAdjustStock ? (productId, productName, currentQuantity) => {
                  setSelectedProduct({
                    _id: productId,
                    product_id: productId,
                    product_name: productName,
                    quantity: currentQuantity,
                    branch_id: branchId,
                    reorder_point: 0,
                    bin_location: null,
                    selling_price: 0,
                    updated_at: new Date().toISOString()
                  } as InventoryItem)
                } : undefined}
              />
            )}
          </>
        )}

        {/* Low Stock Tab Content */}
        {activeTab === "low-stock" && (
          <div className="rounded-sm border border-slate-200 bg-white">
            {loading ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#003e9d] border-t-transparent"></div>
                <p className="text-sm text-slate-500">Loading low stock items...</p>
              </div>
            ) : lowStockItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <Package className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-slate-500">No low stock items found</p>
                <p className="mt-1 text-sm text-slate-400">All products are above reorder point</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {lowStockItems.map((item) => (
                  <div key={item._id} className="flex flex-col gap-3 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{item.product_name}</h3>
                      <div className="mt-1 flex flex-wrap gap-4 text-sm">
                        <span className="text-slate-500">
                          Current: <span className="font-semibold text-yellow-600">{item.quantity}</span>
                        </span>
                        <span className="text-slate-500">
                          Reorder Point: <span className="font-semibold">{item.reorder_point}</span>
                        </span>
                        <span className="text-slate-500">
                          Price: ₦{item.selling_price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    {canAdjustStock && (
                      <button
                        onClick={() => setSelectedProduct(item)}
                        className="inline-flex h-10 items-center gap-2 rounded-sm bg-gradient-to-r from-red-500 to-red-600 px-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
                      >
                        Adjust Stock
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab Content */}
        {/* History Tab Content */}
        {activeTab === "history" && (
          <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Date
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Product ID
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Quantity
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Reason
                    </th>
                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Note
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {adjustmentHistory.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                        No adjustment history found
                      </td>
                    </tr>
                  ) : (
                    adjustmentHistory.map((log) => (
                      <tr key={log._id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                          {new Date(log.date).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-slate-600">
                          {log.product_id.slice(0, 8)}...
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-red-600">
                          -{log.quantity_removed}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm capitalize">
                          <span className={cn(
                            "rounded-sm px-2 py-1 text-xs font-medium",
                            log.reason === "damaged" && "bg-red-100 text-red-800",
                            log.reason === "expired" && "bg-yellow-100 text-yellow-800",
                            log.reason === "theft" && "bg-red-100 text-red-800",
                            log.reason === "internal_consumption" && "bg-blue-100 text-blue-800"
                          )}>
                            {log.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                          {log.note || "-"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Adjust Stock Modal */}
        {selectedProduct && (
          <AdjustStockModal
            open={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            productId={selectedProduct.product_id}
            productName={selectedProduct.product_name}
            currentQuantity={selectedProduct.quantity}
            branchId={branchId}
            onSuccess={() => {
              fetchBranchInventory(branchId)
              fetchLowStockItems(branchId)
              fetchAdjustmentHistory(branchId)
              setSelectedProduct(null)
            }} />
        )}
      </div>
    </div>
  )
}