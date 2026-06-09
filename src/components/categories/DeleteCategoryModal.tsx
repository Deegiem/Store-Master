// src/components/categories/DeleteCategoryModal.tsx
"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertTriangle, Package } from "lucide-react"
import { useCategoryStore } from "@/store/useCategoryStore"
import type { Category } from "@/types/category"

interface DeleteCategoryModalProps {
  open: boolean
  onClose: () => void
  category: Category | null
}

export function DeleteCategoryModal({ open, onClose, category }: DeleteCategoryModalProps) {
  const { deleteCategory, categoryloading } = useCategoryStore()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleDelete = async () => {
    if (category) {
      const res = await deleteCategory(category.id)
      if (res) {
        onClose()
      }
    }
  }

  if (!open || !category) return null

  const hasProducts = (category.product_count || 0) > 0

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
                  <h2 className="text-xl font-bold text-slate-900">Delete Category</h2>
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
            <div className="p-5 space-y-5">
              {/* Category Info */}
              <div className="rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-white text-2xl">
                    {category.icon || "📦"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{category.name}</p>
                    <p className="text-xs text-slate-500">{category.slug}</p>
                  </div>
                </div>
                {category.description && (
                  <p className="mt-3 text-sm text-slate-600">{category.description}</p>
                )}
              </div>

              {/* Warning Messages */}
              {hasProducts ? (
                <div className="rounded-sm border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Category has products</p>
                      <p className="mt-1 text-sm text-red-700">
                        This category contains {category.product_count} product(s). 
                        Deleting it will require reassigning these products to another category.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-sm border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm text-amber-800">
                    This category has no products and can be safely deleted.
                  </p>
                </div>
              )}

              <p className="text-sm text-slate-600">
                Are you sure you want to delete this category? This action is permanent and cannot be reversed.
              </p>
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
                disabled={categoryloading.deleteCategory}
                className="rounded-sm bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categoryloading.deleteCategory ? "Deleting..." : "Delete Category"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}