// src/components/inventory/AdminInventoryView.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Package, AlertTriangle, History, RefreshCw, Building2, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { useInventoryStore } from "@/store/useInventoryStore"
import { useBranchStore } from "@/store/useBranchStore"
import { InventoryTable } from "@/components/inventory/InventoryTable"
import { AdjustStockModal } from "@/components/inventory/AdjustStockModal"
import { AdjustmentHistory } from "@/components/inventory/AdjustmentHistory"
import { InventoryStats } from "@/components/inventory/InventoryStats"
import { InventorySkeleton } from "@/components/inventory/InventorySkeleton"

type TabType = "inventory" | "low-stock" | "history"

export function AdminInventoryView() {
  const router = useRouter()
  const {
    inventory,
    lowStockItems,
    adjustmentHistory,
    pagination,
    lowStockPagination,
    loading,
    fetchBranchInventory,
    fetchLowStockItems,
    fetchAdjustmentHistory,
    clearErrors,
    reset,
  } = useInventoryStore()
  const { branches, fetchBranches, branchloading } = useBranchStore()

  const [activeTab, setActiveTab] = useState<TabType>("inventory")
  const [currentPage, setCurrentPage] = useState(1)
  const [lowStockPage, setLowStockPage] = useState(1)
  const [adjustModalOpen, setAdjustModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string
    name: string
    quantity: number
  } | null>(null)
  const [selectedBranchId, setSelectedBranchId] = useState<string>("")

  const limit = 50

  // Fetch branches on mount
  useEffect(() => {
    fetchBranches()
  }, [fetchBranches])

  // Fetch inventory when branch or tab changes
  useEffect(() => {
    if (selectedBranchId && activeTab === "inventory") {
      fetchBranchInventory(selectedBranchId, currentPage, limit)
    }
  }, [selectedBranchId, activeTab, currentPage, fetchBranchInventory])

  useEffect(() => {
    if (selectedBranchId && activeTab === "low-stock") {
      fetchLowStockItems(selectedBranchId, lowStockPage, limit)
    }
  }, [selectedBranchId, activeTab, lowStockPage, fetchLowStockItems])

  useEffect(() => {
    if (selectedBranchId && activeTab === "history") {
      fetchAdjustmentHistory(selectedBranchId)
    }
  }, [selectedBranchId, activeTab, fetchAdjustmentHistory])

  const handleAdjustStock = useCallback((productId: string, productName: string, currentQuantity: number) => {
    setSelectedProduct({ id: productId, name: productName, quantity: currentQuantity })
    setAdjustModalOpen(true)
  }, [])

  const handleAdjustSuccess = useCallback(() => {
    if (selectedBranchId) {
      if (activeTab === "inventory") {
        fetchBranchInventory(selectedBranchId, currentPage, limit)
      }
      if (activeTab === "low-stock") {
        fetchLowStockItems(selectedBranchId, lowStockPage, limit)
      }
      fetchAdjustmentHistory(selectedBranchId)
      clearErrors()
    }
  }, [activeTab, selectedBranchId, currentPage, lowStockPage, fetchBranchInventory, fetchLowStockItems, fetchAdjustmentHistory, clearErrors])

  const tabs = [
    { id: "inventory" as TabType, label: "All Inventory", icon: Package, count: pagination.total },
    { id: "low-stock" as TabType, label: "Low Stock", icon: AlertTriangle, count: lowStockPagination.total },
    { id: "history" as TabType, label: "Adjustment History", icon: History, count: adjustmentHistory.length },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Package className="h-3.5 w-3.5" />
            Stock Management
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            Inventory Management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage stock levels across all branches
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(`/dashboard/admin/inventory/adjustments`)}
            className="flex h-10 items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
            View All Adjustments
          </button>
          <button
            onClick={() => {
              if (selectedBranchId) {
                if (activeTab === "inventory") {
                  fetchBranchInventory(selectedBranchId, currentPage, limit)
                } else if (activeTab === "low-stock") {
                  fetchLowStockItems(selectedBranchId, lowStockPage, limit)
                } else if (activeTab === "history") {
                  fetchAdjustmentHistory(selectedBranchId)
                }
              }
            }}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Branch Selection Card - Matching Branches page style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-sm border border-slate-200 bg-white p-5"
      >
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
            <Building2 className="h-5 w-5 text-[#003e9d]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Select Branch</h2>
            <p className="text-sm text-slate-500">Choose a branch to view its inventory</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="relative max-w-md">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select
              value={selectedBranchId}
              onChange={(e) => {
                setSelectedBranchId(e.target.value)
                reset()
                setCurrentPage(1)
                setLowStockPage(1)
              }}
              className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
              disabled={branchloading.branches}
            >
              <option value="">Select a branch to view inventory</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          {branchloading.branches && (
            <p className="mt-2 text-xs text-slate-400">Loading branches...</p>
          )}
          {!branchloading.branches && branches.length === 0 && (
            <p className="mt-2 text-xs text-amber-600">No branches found. Please create a branch first.</p>
          )}
        </div>
      </motion.div>

      {selectedBranchId && (
        <>
          {/* Stats */}
          {activeTab === "inventory" && inventory.length > 0 && (
            <InventoryStats items={inventory} />
          )}

          {/* Tabs */}
          <div className="flex gap-1 rounded-sm border border-slate-200 bg-white p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id === "inventory") setCurrentPage(1)
                  if (tab.id === "low-stock") setLowStockPage(1)
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-[0_2px_4px_rgba(0,71,195,0.2)]"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                    activeTab === tab.id
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading.inventory && activeTab === "inventory" && <InventorySkeleton />}
          {!loading.inventory && activeTab === "inventory" && (
            <>
              <InventoryTable
                items={inventory}
                onAdjustStock={handleAdjustStock}
              />
              
              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
                  <div className="flex flex-1 justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                      disabled={currentPage === pagination.pages}
                      className="relative ml-3 inline-flex items-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-700">
                        Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(currentPage * limit, pagination.total)}</span> of{" "}
                        <span className="font-medium">{pagination.total}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="isolate inline-flex -space-x-px rounded-sm shadow-sm" aria-label="Pagination">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center rounded-l-sm px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                        {[...Array(Math.min(5, pagination.pages))].map((_, i) => {
                          let pageNum = currentPage
                          if (pagination.pages <= 5) {
                            pageNum = i + 1
                          } else if (currentPage <= 3) {
                            pageNum = i + 1
                          } else if (currentPage >= pagination.pages - 2) {
                            pageNum = pagination.pages - 4 + i
                          } else {
                            pageNum = currentPage - 2 + i
                          }
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                currentPage === pageNum
                                  ? "bg-[#003e9d] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003e9d]"
                                  : "text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0"
                              }`}
                            >
                              {pageNum}
                            </button>
                          )
                        })}
                        <button
                          onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
                          disabled={currentPage === pagination.pages}
                          className="relative inline-flex items-center rounded-r-sm px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {loading.lowStock && activeTab === "low-stock" && <InventorySkeleton />}
          {!loading.lowStock && activeTab === "low-stock" && (
            <>
              {lowStockItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
                  <AlertTriangle className="h-12 w-12 text-green-300" />
                  <p className="mt-4 text-sm text-slate-500">No low stock items found</p>
                  <p className="text-xs text-slate-400">All items are above reorder point</p>
                </div>
              ) : (
                <>
                  <InventoryTable
                    items={lowStockItems}
                    onAdjustStock={handleAdjustStock}
                  />
                  
                  {lowStockPagination.pages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
                      <div className="flex flex-1 justify-between sm:hidden">
                        <button
                          onClick={() => setLowStockPage(Math.max(1, lowStockPage - 1))}
                          disabled={lowStockPage === 1}
                          className="relative inline-flex items-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setLowStockPage(Math.min(lowStockPagination.pages, lowStockPage + 1))}
                          disabled={lowStockPage === lowStockPagination.pages}
                          className="relative ml-3 inline-flex items-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {loading.adjustmentHistory && activeTab === "history" && <InventorySkeleton />}
          {!loading.adjustmentHistory && activeTab === "history" && (
            <AdjustmentHistory history={adjustmentHistory} showUserInfo />
          )}
        </>
      )}

      {!selectedBranchId && branches.length > 0 && (
        <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
          <Building2 className="h-12 w-12 text-slate-300" />
          <p className="mt-4 text-sm text-slate-500">Select a branch to view inventory</p>
        </div>
      )}

      {!selectedBranchId && branches.length === 0 && !branchloading.branches && (
        <div className="flex flex-col items-center justify-center rounded-sm border border-amber-200 bg-amber-50 p-12 text-center">
          <Building2 className="h-12 w-12 text-amber-400" />
          <p className="mt-4 text-sm font-medium text-amber-800">No Branches Found</p>
          <p className="mt-1 text-xs text-amber-600">Please create a branch before managing inventory.</p>
          <button
            onClick={() => router.push("/dashboard/admin/branches")}
            className="mt-4 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5"
          >
            Go to Branches
          </button>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {selectedProduct && selectedBranchId && (
        <AdjustStockModal
          open={adjustModalOpen}
          onClose={() => {
            setAdjustModalOpen(false)
            setSelectedProduct(null)
          }}
          productId={selectedProduct.id}
          productName={selectedProduct.name}
          currentQuantity={selectedProduct.quantity}
          branchId={selectedBranchId}
          onSuccess={handleAdjustSuccess}
        />
      )}
    </div>
  )
}