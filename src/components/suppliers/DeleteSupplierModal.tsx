// src/components/suppliers/DeleteSupplierModal.tsx
"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Truck } from "lucide-react"
import { useSupplierStore } from "@/store/supplierStore"
import type { Supplier } from "@/types/supplier"

interface DeleteSupplierModalProps {
  open: boolean
  onClose: () => void
  supplier: Supplier | null
}

export default function DeleteSupplierModal({ open, onClose, supplier }: DeleteSupplierModalProps) {
  const { deleteSupplier, loading, error } = useSupplierStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleDelete = async () => {
    if (!supplier) return
    const success = await deleteSupplier(supplier.id)
    if (success) onClose()
  }

  if (!open || !supplier) return null

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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-50">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Delete Supplier</h2>
                  <p className="text-sm text-slate-500">This action cannot be undone</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white">
                    <Truck className="h-5 w-5 text-[#003e9d]" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{supplier.name}</p>
                    <p className="text-xs text-slate-500">{supplier.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-sm border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">Warning: Permanent Deletion</p>
                <p className="mt-2 text-sm text-red-700">
                  This action will permanently delete this supplier and all associated procurement records.
                  This cannot be reversed.
                </p>
              </div>

              {error.deleteSupplier && (
                <div className="mt-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  {error.deleteSupplier}
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
                onClick={handleDelete}
                disabled={loading.deleteSupplier}
                className="rounded-sm bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {loading.deleteSupplier ? "Deleting..." : "Delete Supplier"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}