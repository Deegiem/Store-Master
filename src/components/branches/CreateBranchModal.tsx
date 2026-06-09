// src/components/branches/CreateBranchModal.tsx
"use client"

import { useState, useRef, useEffect, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Building2, Hash, MapPin, Phone, Globe2, AlertCircle } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"

interface Props {
  open: boolean
  onClose: () => void
}

export function CreateBranchModal({ open, onClose }: Props) {
  const { createBranch, branchloading, error } = useBranchStore()
  const modalRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    zones: "",
  })

  // ESC KEY CLOSE
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setForm({ name: "", code: "", address: "", phone: "", zones: "" })
    }
  }, [open])

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    await createBranch({
      ...form,
      zones: form.zones
        .split(",")
        .map((z) => z.trim())
        .filter(Boolean),
    })
    
    onClose()
  }

  const isFormValid = form.name.trim() && form.code.trim() && form.address.trim()

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleOutsideClick}
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <Building2 className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Create Branch</h2>
                  <p className="text-sm text-slate-500">Add a new operational location</p>
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
            <form onSubmit={handleSubmit} className="max-h-[calc(100vh-200px)] overflow-y-auto p-5">
              <div className="space-y-5">
                {/* Branch Name */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Branch Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g., Lagos Main Branch"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      required
                    />
                  </div>
                </div>

                {/* Branch Code */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Branch Code *
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g., LG001"
                      value={form.code}
                      onChange={(e) => setForm({ ...form, code: e.target.value })}
                      className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <textarea
                      placeholder="Full branch address"
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+234 801 234 5678"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    />
                  </div>
                </div>

                {/* Zones */}
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Zones
                  </label>
                  <div className="relative">
                    <Globe2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="North, West, Central (comma-separated)"
                      value={form.zones}
                      onChange={(e) => setForm({ ...form, zones: e.target.value })}
                      className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Separate multiple zones with commas</p>
                </div>

                {/* Error Message */}
                {error.createBranch && (
                  <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {error.createBranch}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-sm border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={branchloading.createBranch || !isFormValid}
                  className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {branchloading.createBranch ? "Creating..." : "Create Branch"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}