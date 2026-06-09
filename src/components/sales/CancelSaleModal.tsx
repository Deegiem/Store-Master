"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trash2 } from "lucide-react"
import { useSalesStore } from "@/store/saleStore"
import type { SaleListRecord } from "@/types/sale"

interface Props {
  open: boolean
  onClose: () => void
  onCancelled: () => void
  sale: SaleListRecord | null
}

export function CancelSaleModal({ open, onClose, onCancelled, sale }: Props) {
  const [reason, setReason] = useState("")
  const { cancelSale, loading, error } = useSalesStore()

  useEffect(() => {
    if (open) {
      setReason("")
    }
  }, [open])

  const handleSubmit = async () => {
    if (!sale) return
    await cancelSale(sale.sale_id, {
      cancellation_reason: reason.trim() || "Cancelled by user",
    })

    const currentError = useSalesStore.getState().error.cancelSale
    if (!currentError) {
      onCancelled()
    }
  }

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Cancel Sale</h2>
                  <p className="text-sm text-slate-500">Provide a reason to cancel this sale.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Sale</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{sale?.sale_number}</p>
                <p className="text-sm text-slate-500">Branch: {sale?.branch_name}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Cancellation Reason</label>
                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10"
                  placeholder="Optional reason for cancellation"
                />
              </div>

              {error.cancelSale && <p className="text-sm text-rose-600">{error.cancelSale}</p>}

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading.cancelSale}
                  className="rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading.cancelSale ? "Cancelling..." : "Confirm Cancel"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
