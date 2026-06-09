// src/components/suppliers/EditSupplierModal.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Truck, AlertCircle } from "lucide-react"
import { useSupplierStore } from "@/store/supplierStore"
import type { Supplier, UpdateSupplierPayload } from "@/types/supplier"

interface EditSupplierModalProps {
  open: boolean
  onClose: () => void
  supplier: Supplier | null
}

export default function EditSupplierModal({ open, onClose, supplier }: EditSupplierModalProps) {
  const { updateSupplier, loading, error } = useSupplierStore()
  const [form, setForm] = useState<UpdateSupplierPayload>({
    name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    is_active: true,
  })

  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name,
        contact_person: supplier.contact_person || "",
        email: supplier.email,
        phone: supplier.phone,
        address: supplier.address,
        is_active: supplier.is_active,
      })
    }
  }, [supplier])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async () => {
    if (!supplier) return
    const success = await updateSupplier(supplier.id, form)
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
            className="relative w-full max-w-2xl rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <Truck className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit Supplier</h2>
                  <p className="text-sm text-slate-500">Update supplier information</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Supplier Name *
                  </label>
                  <input
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Contact Person
                  </label>
                  <input
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.contact_person}
                    onChange={(e) => setForm({ ...form, contact_person: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Phone *
                  </label>
                  <input
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Address *
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                {/* Status Toggle */}
                <div className="sm:col-span-2">
                  <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">Supplier Status</p>
                      <p className="text-xs text-slate-500">Control supplier availability</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, is_active: !form.is_active })}
                      className={`relative h-6 w-11 rounded-full transition ${
                        form.is_active ? "bg-green-500" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                          form.is_active ? "right-0.5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {error.updateSupplier && (
                <div className="mt-4 flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {error.updateSupplier}
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
                disabled={loading.updateSupplier}
                className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading.updateSupplier ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}