// src/components/products/CreateProductModal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Package, Image as ImageIcon } from "lucide-react"
import { useProductStore } from "@/store/productStore"
import { useCategoryStore } from "@/store/useCategoryStore"

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateProductModal({ open, onClose }: Props) {
  const { createProduct, productloading } = useProductStore()
  const { categories, fetchCategories } = useCategoryStore()

  const [form, setForm] = useState({
    name: "",
    sku: "",
    barcode: "",
    description: "",
    low_stock_threshold: 10,
    category_id: "",
    image_url: "",
  })

  useEffect(() => {
    if (open) {
      fetchCategories()
    }
  }, [open, fetchCategories])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async () => {
    await createProduct(form)
    onClose()
    setForm({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      low_stock_threshold: 10,
      category_id: "",
      image_url: "",
    })
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
            className="relative w-full max-w-2xl rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <Package className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create Product</h2>
                  <p className="text-sm text-slate-500">Add a new product to catalog</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Product Name *
                  </label>
                  <input
                    placeholder="e.g., iPhone 15 Pro"
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    SKU *
                  </label>
                  <input
                    placeholder="e.g., IP15-PRO-001"
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Barcode
                  </label>
                  <input
                    placeholder="Scan or enter barcode"
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.barcode}
                    onChange={(e) => setForm({ ...form, barcode: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Category
                  </label>
                  <select
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Image URL
                  </label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      placeholder="https://example.com/product-image.jpg"
                      className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Product description..."
                    className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min={0}
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.low_stock_threshold}
                    onChange={(e) =>
                      setForm({ ...form, low_stock_threshold: Number(e.target.value) })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 p-6">
              <button
                onClick={onClose}
                className="rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!form.name || !form.sku || productloading.createProduct}
                className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {productloading.createProduct ? "Creating..." : "Create Product"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}