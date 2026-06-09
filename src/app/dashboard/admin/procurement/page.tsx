"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Plus, Sparkles, Clock3 } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { usePermissions } from "@/hooks/usePermissions"
import { filterProcurements } from "@/selectors/procurementSelectors"
import { ProcurementStats } from "@/components/procurement/ProcurementStats"
import { ProcurementFilters } from "@/components/procurement/ProcurementFilters"
import { ProcurementGrid } from "@/components/procurement/ProcurementGrid"
import { ProcurementSkeleton } from "@/components/procurement/ProcurementSkeleton"
import { EmptyProcurementState } from "@/components/procurement/EmptyProcurementState"
import { CreatePOModal } from "@/components/procurement/CreatePOModal"
import type { POStatus } from "@/types/procurement"

type ProcurementStatusFilter = POStatus | "all"

interface ProcurementPageProps {
  externalList?: any[]
  externalLoading?: boolean
}

export default function ProcurementPage({ externalList, externalLoading }: ProcurementPageProps = {}) {
  const router = useRouter()
  const {
    canViewPendingApprovals,
    canCreateProcurement,
    canViewAllProcurement,
    canViewOwnProcurement,
    canViewBranchProcurement,
    isPurchase,
    isAdmin,
    isFinance,
    isManager,
    role,
    userBranchId
  } = usePermissions()

  const storeList = useProcurementStore((state) => state.list)
  const storeFetchAll = useProcurementStore((state) => state.fetchAll)
  const storeLoading = useProcurementStore((state) => state.loading.list)

  // Use external data if provided, otherwise use store data
  const list = externalList !== undefined ? externalList : storeList
  const loading = externalLoading !== undefined ? externalLoading : storeLoading

  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<ProcurementStatusFilter>("all")
  const [createOpen, setCreateOpen] = useState(false)

  useEffect(() => {
    // Only fetch if not using external data
    if (externalList === undefined) {
      // Fetch based on user role
      if (isAdmin || isFinance) {
        // Admin/Finance: view all procurement
        storeFetchAll()
      } else if (isPurchase) {
        // Purchase Manager: view only their own POs
        storeFetchAll({ created_by: useProcurementStore.getState().filters?.created_by })
      } else if (isManager) {
        // Store Manager: view branch procurement
        storeFetchAll({ branch_id: userBranchId })
      } else {
        storeFetchAll()
      }
    }
  }, [externalList, storeFetchAll, isAdmin, isFinance, isPurchase, isManager, userBranchId])

  // Check if user can view the procurement list
  const canViewProcurement = canViewAllProcurement || canViewOwnProcurement || canViewBranchProcurement || isAdmin || isFinance || isPurchase || isManager

  if (!canViewProcurement) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <Sparkles className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Access Denied</p>
            <p className="mt-1 text-sm text-red-500">
              You don't have permission to view procurement orders.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const filtered = filterProcurements(list, search, status)

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
              Enterprise Procurement Suite
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Procurement
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage procurement workflows, purchase orders, approvals, and inventory receiving
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {/* Only Admin and Finance see Pending Approvals button */}
            {(canViewPendingApprovals || isAdmin || isFinance) && (
              <button
                onClick={() => router.push("/dashboard/finance/procurement/pending-approval")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-amber-200 bg-amber-50 px-5 text-sm font-semibold text-amber-700 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Clock3 className="h-4 w-4" />
                Pending Approvals
              </button>
            )}

            {/* Only Admin and Purchase Manager see Create PO button */}
            {(canCreateProcurement && (isAdmin || isPurchase)) && (
              <button
                onClick={() => setCreateOpen(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Create Purchase Order
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats - Only show if user has appropriate permission */}
        {(isAdmin || isFinance || isPurchase || isManager) && (
          <ProcurementStats
            total={list.length}
            pending={list.filter(x => x.status === "Pending Approval").length}
            approved={list.filter(x => x.status === "Approved").length}
            totalValue={list.reduce((acc, item) => acc + (item.total_amount || 0), 0)}
          />
        )}

        {/* Filters */}
        <ProcurementFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />

        {/* Results Count */}
        {!loading && list.length > 0 && (
          <p className="text-sm text-slate-500">
            Showing {filtered.length} of {list.length} purchase orders
          </p>
        )}

        {/* Content */}
        {loading ? (
          <ProcurementSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyProcurementState />
        ) : (
          <ProcurementGrid orders={filtered} />
        )}
      </div>

      {/* Only render Create PO Modal if user has permission */}
      {(canCreateProcurement && (isAdmin || isPurchase)) && (
        <CreatePOModal open={createOpen} onClose={() => setCreateOpen(false)} />
      )}
    </div>
  )
}