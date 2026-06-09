// src/components/procurement/ApprovalConfirmModal.tsx
"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Loader2, X, CheckCircle } from "lucide-react"

interface ApprovalConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText: string
  isLoading?: boolean
  type?: "approve" | "reject"
}

export function ApprovalConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  isLoading = false,
  type = "approve"
}: ApprovalConfirmModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!open) return null

  const isApprove = type === "approve"
  const buttonClass = isApprove
    ? "bg-green-600 hover:bg-green-700"
    : "bg-red-600 hover:bg-red-700"
  const icon = isApprove ? CheckCircle : AlertTriangle
  const iconBg = isApprove ? "bg-green-50" : "bg-red-50"
  const iconColor = isApprove ? "text-green-600" : "text-red-600"

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md rounded-sm bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${iconBg}`}>
                  {React.createElement(icon, { className: `h-5 w-5 ${iconColor}` })}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                  <p className="text-sm text-slate-500">Confirm your action</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
              <button
                onClick={onClose}
                className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50 ${buttonClass}`}
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}