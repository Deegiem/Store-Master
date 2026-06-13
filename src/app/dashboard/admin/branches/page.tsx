// src/app/dashboard/admin/branches/page.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Building2, Search, Filter } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import { CreateBranchModal } from "@/components/branches/CreateBranchModal"
import { BranchCard } from "@/components/branches/BranchCard"
import { BranchSkeleton } from "@/components/branches/BranchSkeleton"
import { BranchFilters } from "@/components/branches/BranchFilters"
import { EmptyBranchState } from "@/components/branches/EmptyBranchState"
import { filterBranches } from "@/selectors/branchSelectors"

export default function BranchesPage() {
  const { branches, fetchBranches, branchloading } = useBranchStore()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all")

  useEffect(() => {
    fetchBranches()
  }, [fetchBranches])

  const filteredBranches = useMemo(() => {
    return filterBranches(branches, search, status)
  }, [branches, search, status])

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Building2 className="h-3.5 w-3.5" />
              Operations Management
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Branches
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage all operational branches and locations
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Create Branch
          </button>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, code, or address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
          <BranchFilters status={status} onStatusChange={setStatus} />
        </div>

        {/* Results Count */}
        {!branchloading.branches && branches.length > 0 && (
          <p className="text-sm text-slate-500">
            Showing {filteredBranches.length} of {branches.length} branches
          </p>
        )}

        {/* Content */}
        {branchloading.branches ? (
          <BranchSkeleton />
        ) : filteredBranches.length === 0 ? (
          <EmptyBranchState searchTerm={search} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBranches.map((branch, index) => (
              <BranchCard key={branch.id} branch={branch} delay={index * 0.05} />
            ))}
          </div>
        )}

        {/* Create Modal */}
        <CreateBranchModal open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  )
}