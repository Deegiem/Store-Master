// src/components/procurement/PendingApprovalCard.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building2, Package, Calendar, User, DollarSign, CheckCircle, XCircle, Loader2, Eye } from "lucide-react"
import type { PendingApprovalItem } from "@/types/procurement"

interface PendingApprovalCardProps {
  order: PendingApprovalItem
  onApprove: () => Promise<unknown>
  onReject: (reason: string) => Promise<unknown>  // ← Change to accept reason
  delay: number
  isReadOnly?: boolean
  userRole?: string
}

export function PendingApprovalCard({ 
  order, 
  onApprove, 
  onReject, 
  delay, 
  isReadOnly = false,
  userRole 
}: PendingApprovalCardProps) {
  const [approving, setApproving] = useState(false)
  const [rejecting, setRejecting] = useState(false)

  const handleApprove = async () => {
    setApproving(true)
    await onApprove()
    setApproving(false)
  }

  const handleReject = async (reason: string) => {
    setRejecting(true)
    await onReject(reason)  // Pass the reason to the onReject function
    setRejecting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-amber-50">
              <Building2 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{order.supplier_name}</h3>
              <p className="text-sm text-slate-500">{order.target_branch}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Package className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-sm text-slate-600">{order.items.length} items</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-sm font-medium text-slate-900">₦{order.total_amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-sm text-slate-600">{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-sm text-slate-600">{order.created_by_name}</span>
            </div>
          </div>

          {/* Show read-only badge for purchase manager */}
          {isReadOnly && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs text-blue-700">
              <Eye className="h-3 w-3" />
              View Only - Awaiting Finance Approval
            </div>
          )}
        </div>

        {/* Action Buttons - Only show if not read-only */}
        {!isReadOnly && (
          <div className="flex gap-3">
            <button
              onClick={() => handleReject("No reason provided")}
              disabled={approving || rejecting}
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
            >
              {rejecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
              Reject
            </button>
            <button
              onClick={handleApprove}
              disabled={approving || rejecting}
              className="inline-flex h-10 items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {approving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
              Approve
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}