// src/components/inventory/AdjustStockModal.tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Loader2, X, Package, FileText, MinusCircle } from "lucide-react"
import { useInventoryStore } from "@/store/useInventoryStore"
import type { AdjustmentReason } from "@/types/inventory"

interface AdjustStockModalProps {
  open: boolean
  onClose: () => void
  productId: string
  productName: string
  currentQuantity: number
  branchId: string
  onSuccess?: () => void
}

const reasons: { value: AdjustmentReason; label: string; description: string }[] = [
  { value: "damaged", label: "Damaged", description: "Product is broken or unusable" },
  { value: "expired", label: "Expired", description: "Product has passed expiry date" },
  { value: "theft", label: "Theft", description: "Product lost due to theft" },
  { value: "internal_consumption", label: "Internal Consumption", description: "Used for internal purposes" },
]

export function AdjustStockModal({
  open,
  onClose,
  productId,
  productName,
  currentQuantity,
  branchId,
  onSuccess,
}: AdjustStockModalProps) {
  const { adjustStock, loading, error, lastAdjustment, clearErrors, clearLastAdjustment } = useInventoryStore()
  
  const [quantity, setQuantity] = useState(1)
  const [reason, setReason] = useState<AdjustmentReason>("damaged")
  const [note, setNote] = useState("")

  useEffect(() => {
    if (open) {
      setQuantity(1)
      setReason("damaged")
      setNote("")
      clearErrors()
      clearLastAdjustment()
    }
  }, [open, clearErrors, clearLastAdjustment])

  useEffect(() => {
    if (lastAdjustment && onSuccess) {
      onSuccess()
      onClose()
    }
  }, [lastAdjustment, onSuccess, onClose])

  const handleSubmit = async () => {
    if (quantity <= 0 || quantity > currentQuantity) return
    
    await adjustStock({
      product_id: productId,
      quantity,
      reason,
      note: note || undefined,
      branch_id: branchId,
    })
  }

  const maxQuantity = Math.min(currentQuantity, 999)

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg rounded-sm bg-white shadow-xl max-h-[90vh] flex flex-col"
          >
            {/* Header - Fixed */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-50">
                  <MinusCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Remove Stock</h2>
                  <p className="text-sm text-slate-500">Adjust inventory for non-sale reasons</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Product Info */}
              <div className="rounded-sm bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 break-words">{productName}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Current stock: <span className="font-semibold">{currentQuantity} units</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity to Remove <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    max={maxQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(maxQuantity, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-32 rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  />
                  <span className="text-sm text-slate-500">
                    of {currentQuantity} available
                  </span>
                </div>
                {quantity > currentQuantity && (
                  <p className="mt-1 text-xs text-red-500">Cannot remove more than current stock</p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Reason <span className="text-red-500">*</span>
                </label>
                <div className="grid gap-2">
                  {reasons.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setReason(r.value)}
                      className={`flex items-start gap-3 rounded-sm border p-3 text-left transition-all ${
                        reason === r.value
                          ? "border-[#003e9d] bg-[#003e9d]/5 shadow-[0_0_0_1px_#003e9d]"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 ${
                        reason === r.value
                          ? "border-[#003e9d] bg-[#003e9d]"
                          : "border-slate-300"
                      }`}>
                        {reason === r.value && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900">{r.label}</p>
                        <p className="text-xs text-slate-500">{r.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Note (Optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Add additional details about this adjustment..."
                  className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d] resize-none"
                />
              </div>

              {/* Warnings */}
              {currentQuantity - quantity <= 10 && currentQuantity - quantity > 0 && (
                <div className="flex items-start gap-2 rounded-sm bg-yellow-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-yellow-800">Low Stock Warning</p>
                    <p className="text-xs text-yellow-700">
                      After this adjustment, stock will be at {currentQuantity - quantity} units (reorder point: 10)
                    </p>
                  </div>
                </div>
              )}

              {currentQuantity - quantity === 0 && (
                <div className="flex items-start gap-2 rounded-sm bg-red-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-red-800">Critical Stock Alert</p>
                    <p className="text-xs text-red-700">
                      This will completely deplete the stock for this product
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error.adjustStock && (
                <div className="flex items-start gap-2 rounded-sm bg-red-50 p-3">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-700 flex-1">{error.adjustStock}</p>
                </div>
              )}
            </div>

            {/* Footer - Fixed */}
            <div className="flex justify-end gap-3 border-t border-slate-200 p-5 shrink-0">
              <button
                onClick={onClose}
                className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading.adjustStock || quantity <= 0 || quantity > currentQuantity}
                className="rounded-sm bg-gradient-to-r from-red-600 to-red-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading.adjustStock ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Removing...
                  </div>
                ) : (
                  "Remove Stock"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}