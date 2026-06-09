// src/components/inventory/GlobalAdjustmentsView.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, Building2, RefreshCw, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useInventoryStore } from "@/store/useInventoryStore"
import { useBranchStore } from "@/store/useBranchStore"
import { GlobalAdjustmentsTable } from "@/components/inventory/GlobalAdjustmentsTable"
import { InventorySkeleton } from "@/components/inventory/InventorySkeleton"

export function GlobalAdjustmentsView() {
  const router = useRouter()
  const {
    allAdjustments,
    allAdjustmentsPagination,
    loading,
    fetchAllAdjustments,
    setAdjustmentFilters,
  } = useInventoryStore()
  const { branches, fetchBranches, branchloading } = useBranchStore()

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBranch, setSelectedBranch] = useState("")
  const [selectedReason, setSelectedReason] = useState("")

  const limit = 50

  useEffect(() => {
    fetchBranches()
  }, [fetchBranches])

  useEffect(() => {
    fetchAllAdjustments(currentPage, limit, selectedBranch || undefined, selectedReason || undefined)
  }, [currentPage, selectedBranch, selectedReason, fetchAllAdjustments])

  const handleFilter = () => {
    setCurrentPage(1)
    setAdjustmentFilters({ branch_id: selectedBranch || undefined, reason: selectedReason || undefined })
  }

  const handleReset = () => {
    setSelectedBranch("")
    setSelectedReason("")
    setCurrentPage(1)
    setAdjustmentFilters({ branch_id: undefined, reason: undefined })
  }

  const reasons = [
    { value: "", label: "All Reasons" },
    { value: "damaged", label: "Damaged" },
    { value: "expired", label: "Expired" },
    { value: "theft", label: "Theft" },
    { value: "internal_consumption", label: "Internal Consumption" },
  ]

  return (
    <div className="space-y-6">
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Stock Adjustments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View all stock adjustments across all branches
          </p>
        </div>
        <button
          onClick={() => fetchAllAdjustments(currentPage, limit, selectedBranch || undefined, selectedReason || undefined)}
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-sm border border-slate-200 bg-white p-4"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-700">Filters</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Branch
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                disabled={branchloading.branches}
              >
                <option value="">All Branches</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason
            </label>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Reset
          </button>
          <button
            onClick={handleFilter}
            className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>

      {/* Results Count */}
      {!loading.allAdjustments && allAdjustments.length > 0 && (
        <p className="text-sm text-slate-500">
          Showing {allAdjustments.length} of {allAdjustmentsPagination.total} adjustments
        </p>
      )}

      {/* Content */}
      {loading.allAdjustments ? (
        <InventorySkeleton />
      ) : allAdjustments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
          <AlertTriangle className="h-12 w-12 text-slate-300" />
          <p className="mt-4 text-sm text-slate-500">No adjustments found</p>
          <p className="text-xs text-slate-400">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <GlobalAdjustmentsTable adjustments={allAdjustments} />
          
          {/* Pagination */}
          {allAdjustmentsPagination.pages > 1 && (
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
                  onClick={() => setCurrentPage(Math.min(allAdjustmentsPagination.pages, currentPage + 1))}
                  disabled={currentPage === allAdjustmentsPagination.pages}
                  className="relative ml-3 inline-flex items-center rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-700">
                    Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{" "}
                    <span className="font-medium">{Math.min(currentPage * limit, allAdjustmentsPagination.total)}</span> of{" "}
                    <span className="font-medium">{allAdjustmentsPagination.total}</span> results
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
                    {[...Array(Math.min(5, allAdjustmentsPagination.pages))].map((_, i) => {
                      let pageNum = currentPage
                      if (allAdjustmentsPagination.pages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= allAdjustmentsPagination.pages - 2) {
                        pageNum = allAdjustmentsPagination.pages - 4 + i
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
                      onClick={() => setCurrentPage(Math.min(allAdjustmentsPagination.pages, currentPage + 1))}
                      disabled={currentPage === allAdjustmentsPagination.pages}
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
    </div>
  )
}