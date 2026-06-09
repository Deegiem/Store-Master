// src/components/procurement/ReceiveGoodsModal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PackageCheck, Loader2, X, AlertCircle } from "lucide-react"

interface Props {
    open: boolean
    onClose: () => void
    onSubmit: (notes: string) => Promise<void>
}

export function ReceiveGoodsModal({ open, onClose, onSubmit }: Props) {
    const [notes, setNotes] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleEscape)
        return () => window.removeEventListener("keydown", handleEscape)
    }, [onClose])

    useEffect(() => {
        if (!open) {
            setNotes("")
            setError("")
        }
    }, [open])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setError("")
            await onSubmit(notes)
            onClose()
        } catch (err: any) {
            setError(err.message || "Failed to receive goods")
        } finally {
            setLoading(false)
        }
    }

    if (!open) return null

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
                                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-50">
                                    <PackageCheck className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Receive Goods</h2>
                                    <p className="text-sm text-slate-500">Confirm inventory reception</p>
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
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                        Receiving Notes
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add any notes about delivery condition, discrepancies, etc..."
                                        rows={4}
                                        className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </div>
                                )}

                                {/* Info Box */}
                                <div className="rounded-sm bg-amber-50 p-3">
                                    <p className="text-xs text-amber-800">
                                        ⚠️ Confirm that all items have been received in good condition.
                                        This action will update inventory levels.
                                    </p>
                                </div>
                            </div>
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
                                onClick={handleSubmit}
                                disabled={loading}
                                className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                            >
                                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                                Confirm Receipt
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}