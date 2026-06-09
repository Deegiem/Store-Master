// src/components/categories/EditCategoryModal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FolderTree, AlertCircle } from "lucide-react"
import { useCategoryStore } from "@/store/useCategoryStore"
import type { Category } from "@/types/category"

interface EditCategoryModalProps {
  open: boolean
  onClose: () => void
  category: Category | null
}

export function EditCategoryModal({ open, onClose, category }: EditCategoryModalProps) {
  const { updateCategory, categoryloading, error } = useCategoryStore()
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
  })
  const [localError, setLocalError] = useState("")

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        icon: category.icon || "",
      })
    }
  }, [category])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      setLocalError("Category name is required")
      return
    }

    if (category) {
      const res = await updateCategory(category.id, form)
      if (res) {
        onClose()
      }
    }
  }

  if (!open || !category) return null

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
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <FolderTree className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit Category</h2>
                  <p className="text-sm text-slate-500">Update category information</p>
                </div>
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
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Electronics, Clothing, Books"
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  placeholder="📦 🏷️ 💻 👕"
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  maxLength={2}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Brief description of the category..."
                  className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Preview Section */}
              <div className="rounded-sm bg-[#F3F4F6] p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Preview</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-white text-2xl">
                    {form.icon || "📦"}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{form.name || "Category Name"}</p>
                    <p className="text-xs text-slate-500">slug: {form.name?.toLowerCase().replace(/\s+/g, "-") || "category-slug"}</p>
                  </div>
                </div>
              </div>

              {/* Error Messages */}
              {(localError || error.updateCategory) && (
                <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {localError || error.updateCategory}
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
                disabled={categoryloading.updateCategory}
                className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {categoryloading.updateCategory ? "Updating..." : "Update Category"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}