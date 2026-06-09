// src/components/procurement/ApprovalActionModal.tsx
"use client"

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, CheckCircle, XCircle, Loader2, X } from "lucide-react"

interface ApprovalActionModalProps {
    open: boolean
    onClose: () => void
    title: string
    description: string
    actionText: string
    loading?: boolean
    danger?: boolean
    onConfirm: () => void
    children?: React.ReactNode  // Add this line

}

export function ApprovalActionModal({
    open,
    onClose,
    title,
    description,
    actionText,
    loading,
    danger = false,
    onConfirm,
}: ApprovalActionModalProps) {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [onClose])

    if (!open) return null

    const icon = danger ? AlertTriangle : CheckCircle
    const iconColor = danger ? "text-red-600" : "text-green-600"
    const iconBg = danger ? "bg-red-50" : "bg-green-50"
    const buttonColor = danger
        ? "bg-red-600 hover:bg-red-700"
        : "bg-gradient-to-r from-[#003e9d] to-[#0050c9]"

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
                        {/* Header */}
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

                        {/* Body */}
                        <div className="p-5">
                            <p className="text-sm leading-relaxed text-slate-600">{description}</p>

                            {danger && (
                                <div className="mt-4 rounded-sm border border-red-200 bg-red-50 p-3">
                                    <p className="text-xs text-red-700">
                                        ⚠️ This action cannot be undone. Please review carefully.
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
                                onClick={onConfirm}
                                disabled={loading}
                                className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-50 ${buttonColor}`}
                            >
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                {actionText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
