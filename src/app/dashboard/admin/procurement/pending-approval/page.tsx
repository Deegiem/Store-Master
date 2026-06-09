"use client"

import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, Eye } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { PendingApprovalCard } from "@/components/procurement/PendingApprovalCard"
import { PendingApprovalSkeleton } from "@/components/procurement/PendingApprovalSkeleton"

export default function PendingApprovalPage() {
  const { pendingApprovals, fetchPending, list, fetchAll, approvePO, rejectPO, loading } = useProcurementStore()
  const { profile } = useAuthStore()
  const {
    canViewPendingApprovals,
    canApproveProcurement,
    canRejectProcurement,
    isAdmin,
    isFinance,
    isPurchase,
  } = usePermissions()

  useEffect(() => {
    // Admin and Finance: fetch pending approvals from the approval endpoint
    if (isAdmin || isFinance) {
      fetchPending()
      fetchAll()
    }
    // Purchase Manager: fetch all POs to find their own pending ones
    else if (isPurchase) {
      fetchAll()
    }
  }, [fetchPending, fetchAll, isAdmin, isFinance, isPurchase])

  // Get the current user's ID
  const userId = profile?.id
  const userName = profile?.name

  // Determine which POs to display based on user role
  const displayPendingApprovals = useMemo(() => {
    if (isAdmin || isFinance) {
      // Admin and Finance: show all pending approvals from the approval endpoint
      // PendingApprovalItem already has items
      return pendingApprovals
    }

    if (isPurchase) {
      // Purchase Manager: show their own POs that are pending approval
      // ProcurementListItem doesn't have items, but we only need to display basic info
      const pendingPOs = list.filter(po =>
        po.status === "Pending Approval" && (
          po.created_by === userId ||
          po.created_by === userName
        )
      )

      // Convert ProcurementListItem to a format compatible with PendingApprovalCard
      return pendingPOs.map(po => ({
        po_id: po.po_id,
        supplier_name: po.supplier_name,
        supplier_id: po.supplier_id,
        target_branch: po.target_branch,
        branch_id: po.branch_id,
        total_amount: po.total_amount,
        status: po.status,
        items_count: po.items_count,
        created_by_name: po.created_by,
        created_at: po.created_at,
        items: [] // Empty array since we don't have items detail in list view
      }))
    }

    return []
  }, [isAdmin, isFinance, isPurchase, pendingApprovals, list, userId, userName])

  // Check if user can view this page
  const canViewPage = canViewPendingApprovals || isAdmin || isFinance || isPurchase

  if (!canViewPage) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <Eye className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Access Denied</p>
            <p className="mt-1 text-sm text-red-500">
              You don't have permission to view pending approvals.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user can take action (approve/reject)
  const canTakeAction = canApproveProcurement || canRejectProcurement || isAdmin || isFinance

  // Debug logging
  useEffect(() => {
    if (isPurchase) {
      console.log('🔍 Purchase Manager - User ID:', userId)
      console.log('🔍 Purchase Manager - User Name:', userName)
      console.log('🔍 All POs in list:', list.length)
      console.log('🔍 Pending POs:', list.filter(po => po.status === "Pending Approval").length)
      console.log('🔍 Display POs:', displayPendingApprovals.length)
    }
  }, [isPurchase, userId, userName, list, displayPendingApprovals])

  if (loading.approvals || (isPurchase && loading.list)) {
    return <PendingApprovalSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              <Clock className="h-3.5 w-3.5" />
              Awaiting Review
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Pending Approvals
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isPurchase
                ? "Track the status of your submitted purchase orders"
                : "Review and approve purchase orders requiring your authorization"}
            </p>
          </div>
          <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
            {displayPendingApprovals.length} order{displayPendingApprovals.length !== 1 ? "s" : ""} pending
          </div>
        </motion.div>

        {/* Content */}
        {displayPendingApprovals.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
            <CheckCircle className="h-12 w-12 text-green-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">All caught up!</p>
            <p className="mt-1 text-sm text-slate-500">
              {isPurchase
                ? "You have no pending purchase orders awaiting approval"
                : "No pending approvals at this time"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayPendingApprovals.map((po, index) => (
              <PendingApprovalCard
                key={po.po_id}
                order={po}
                onApprove={() => approvePO(po.po_id)}
                onReject={(reason) => rejectPO(po.po_id, reason)}
                delay={index * 0.05}
                isReadOnly={!canTakeAction}
                userRole={isPurchase ? "purchase" : isAdmin ? "admin" : "finance"}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}