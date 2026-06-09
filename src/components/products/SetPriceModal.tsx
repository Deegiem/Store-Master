// src/components/products/SetPriceModal.tsx
"use client"

import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, AlertCircle } from "lucide-react"
import { useProductStore } from "@/store/productStore"
import { cn } from "@/lib/utils"

interface Props {
  open: boolean
  onClose: () => void
  productId: string
}

export default function SetPriceModal({ open, onClose, productId }: Props) {
  const { setProductPrice, error, productloading, selectedProduct } = useProductStore()
  const [price, setPrice] = useState<number>(0)
  const [referenceCost, setReferenceCost] = useState<number>(0)
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (!open) return

    if (selectedProduct?.is_priced) {
      setPrice(selectedProduct.price ?? 0)
      setReferenceCost(selectedProduct.cost_price ?? 0)
      setReason("")
    } else {
      setPrice(0)
      setReferenceCost(0)
      setReason("")
    }
  }, [open, productId, selectedProduct])

  const isInvalidPrice = price <= referenceCost
  const isFormInvalid = !price || !referenceCost || !reason.trim() || isInvalidPrice

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(value)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const margin = useMemo(() => {
    if (!referenceCost) return 0
    return (((price - referenceCost) / referenceCost) * 100).toFixed(2)
  }, [price, referenceCost])

  const handleSubmit = async () => {
    const response = await setProductPrice(productId, {
      price,
      reference_cost: referenceCost,
      reason,
    })
    if (response) {
      onClose()
      setPrice(0)
      setReferenceCost(0)
      setReason("")
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
            className="relative w-full max-w-md rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Set Product Price</h2>
                <p className="text-sm text-slate-500">Update pricing information</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Selling Price *
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  placeholder="0.00"
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={price || ""}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Reference Cost *
                </label>
                <input
                  type="number"
                  min={0}
                  step={100}
                  placeholder="0.00"
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={referenceCost || ""}
                  onChange={(e) => setReferenceCost(Number(e.target.value))}
                />
              </div>

              {/* Margin Display */}
              {referenceCost > 0 && (
                <div className="rounded-sm bg-[#F3F4F6] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Projected Margin</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-slate-400" />
                      <span
                        className={cn(
                          "text-xl font-bold",
                          Number(margin) >= 15
                            ? "text-green-600"
                            : Number(margin) > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        )}
                      >
                        {margin}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    Profit: {formatCurrency(price - referenceCost)}
                  </p>
                </div>
              )}

              {isInvalidPrice && referenceCost > 0 && (
                <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  Selling price must be higher than cost price
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Reason for Update *
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Market adjustment, supplier price change, etc."
                  className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              {error.setPrice && (
                <div className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error.setPrice}
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
                onClick={handleSubmit}
                disabled={productloading.setPrice || isFormInvalid}
                className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {productloading.setPrice ? "Saving..." : "Save Price"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}