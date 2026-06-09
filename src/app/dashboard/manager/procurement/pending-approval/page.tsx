// src/app/dashboard/admin/procurement/pending-approval/page.tsx
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle, XCircle, Building2, Truck, Calendar } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { PendingApprovalCard } from "@/components/procurement/PendingApprovalCard"
import { PendingApprovalSkeleton } from "@/components/procurement/PendingApprovalSkeleton"

export default function PendingApprovalPage() {
  const { pendingApprovals, fetchPending, approvePO, rejectPO, loading } = useProcurementStore()

  useEffect(() => {
    fetchPending()
  }, [fetchPending])

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
              Review and approve purchase orders requiring your authorization
            </p>
          </div>
          <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
            {pendingApprovals.length} order{pendingApprovals.length !== 1 ? "s" : ""} pending
          </div>
        </motion.div>

        {/* Content */}
        {loading.approvals ? (
          <PendingApprovalSkeleton />
        ) : pendingApprovals.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
            <CheckCircle className="h-12 w-12 text-green-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">All caught up!</p>
            <p className="mt-1 text-sm text-slate-500">No pending approvals at this time</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingApprovals.map((po, index) => (
              <PendingApprovalCard
                key={po.po_id}
                order={po}
                onApprove={() => approvePO(po.po_id)}
                onReject={() => rejectPO(po.po_id)}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}