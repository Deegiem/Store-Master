"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, Eye } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { usePermissions } from "@/hooks/usePermissions"
import { PendingApprovalCard } from "@/components/procurement/PendingApprovalCard"
import { PendingApprovalSkeleton } from "@/components/procurement/PendingApprovalSkeleton"

export default function PendingApprovalPage() {
  const { pendingApprovals, fetchPending, approvePO, rejectPO, loading } = useProcurementStore()
  const {
    isAdmin,
    isFinance,
    isPurchase,  // For read-only view
  } = usePermissions()

  useEffect(() => {
    // API Access Control for Pending Approvals:
    // - Finance Manager: Can view all pending approvals
    // - Admin: Can view all pending approvals
    // Purchase Manager: Can view their own pending POs (read-only)
    if (isAdmin || isFinance) {
      fetchPending()
    }
  }, [fetchPending, isAdmin, isFinance])

  // Check if user can view this page
  // Admin and Finance can view pending approvals from the API
  // Purchase managers can view their own pending POs
  const canViewPage = isAdmin || isFinance || isPurchase

  if (!canViewPage) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <Eye className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Access Denied</p>
            <p className="mt-1 text-sm text-red-500">
              Only Finance Manager, Admin, and Purchase Manager can view pending approvals.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (loading.approvals) {
    return <PendingApprovalSkeleton />
  }

  // Determine if user can take action (approve/reject)
  // Only Admin and Finance can approve/reject
  const canTakeAction = isAdmin || isFinance
  
  // Determine user role for display
  const userRole = isAdmin ? "admin" : isFinance ? "finance" : "purchase"

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
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
            {pendingApprovals.length} order{pendingApprovals.length !== 1 ? "s" : ""} pending
          </div>
        </motion.div>

        {/* Content */}
        {pendingApprovals.length === 0 ? (
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
            {pendingApprovals.map((po, index) => (
              <PendingApprovalCard
                key={po.po_id}
                order={po}
                onApprove={() => approvePO(po.po_id)}
                onReject={(reason) => rejectPO(po.po_id, reason)}
                delay={index * 0.05}
                isReadOnly={!canTakeAction}  // Read-only for purchase managers
                userRole={userRole}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}