// src/components/branches/ConfirmStatusModal.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Power, X } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import type { Branch } from "@/types/branch"

interface ConfirmStatusModalProps {
  open: boolean
  onClose: () => void
  branch: Branch | null
}

export function ConfirmStatusModal({ open, onClose, branch }: ConfirmStatusModalProps) {
  const { toggleBranchStatus, branchloading } = useBranchStore()

  const toggle = async () => {
    if (!branch) return
    await toggleBranchStatus(branch.id, { is_active: !branch.is_active })
    onClose()
  }

  if (!open || !branch) return null

  const isActive = branch.is_active
  const title = isActive ? "Deactivate Branch?" : "Activate Branch?"
  const description = isActive
    ? "This branch will become inaccessible to non-admin staff. Historical data and operational records will remain preserved."
    : "This branch will become active again and accessible to authorized staff members."
  const buttonText = isActive ? "Deactivate" : "Activate"
  const buttonColor = isActive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
  const iconBg = isActive ? "bg-red-50" : "bg-green-50"
  const iconColor = isActive ? "text-red-600" : "text-green-600"
  const topBarColor = isActive ? "bg-red-500" : "bg-green-500"

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md overflow-hidden rounded-sm bg-white shadow-xl"
          >
            {/* Top Bar */}
            <div className={`h-1 w-full ${topBarColor}`} />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${iconBg}`}>
                  {isActive ? (
                    <AlertTriangle className={`h-5 w-5 ${iconColor}`} />
                  ) : (
                    <Power className={`h-5 w-5 ${iconColor}`} />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                  <p className="text-sm text-slate-500">Confirm branch status change</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white">
                    <Power className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{branch.name}</p>
                    <p className="text-xs text-slate-500">{branch.code}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">{description}</p>

              {/* Warning for deactivation */}
              {isActive && (
                <div className="mt-4 rounded-sm border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs text-amber-700">
                    ⚠️ Deactivating a branch will restrict access for all non-admin staff.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={onClose}
                className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={toggle}
                disabled={branchloading.toggleStatus}
                className={`rounded-sm px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50 ${buttonColor}`}
              >
                {branchloading.toggleStatus ? "Processing..." : buttonText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}