// src/components/products/DeleteProductModal.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useProductStore } from "@/store/productStore"

interface Props {
  open: boolean
  onClose: () => void
  productId: string
}

export default function DeleteProductModal({ open, onClose, productId }: Props) {
  const router = useRouter()
  const { deleteProduct } = useProductStore()

  if (!open) return null

  const handleDelete = async () => {
    const success = await deleteProduct(productId)
    if (success) {
      router.push("/dashboard/admin/products")
    }
  }

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
                  <h2 className="text-xl font-bold text-slate-900">Delete Product</h2>
                  <p className="text-sm text-slate-500">This action cannot be undone</p>
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
              <div className="rounded-sm border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">Warning: Permanent Deletion</p>
                <p className="mt-2 text-sm text-red-700">
                  This action permanently deletes the product and all associated inventory records.
                  This cannot be reversed.
                </p>
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
                onClick={handleDelete}
                className="rounded-sm bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}