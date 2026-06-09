// src/components/branches/EditBranchModal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2,
  MapPin,
  Phone,
  Hash,
  Globe2,
  Save,
  X,
  AlertCircle,
} from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import type { Branch } from "@/types/branch"

interface EditBranchModalProps {
  open: boolean
  onClose: () => void
  branch: Branch | null
}

export function EditBranchModal({ open, onClose, branch }: EditBranchModalProps) {
  const { updateBranch, branchloading, error } = useBranchStore()

  const [form, setForm] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    zones: "",
    is_active: true,
  })

  useEffect(() => {
    if (branch) {
      setForm({
        name: branch.name || "",
        code: branch.code || "",
        address: branch.address || "",
        phone: branch.phone || "",
        zones: (branch.zones || []).join(", "),
        is_active: branch.is_active,
      })
    }
  }, [branch])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async () => {
    if (!branch) return

    await updateBranch(branch.id, {
      ...form,
      zones: form.zones
        .split(",")
        .map((z) => z.trim())
        .filter(Boolean),
    })

    onClose()
  }

  const isFormValid = form.name.trim() && form.code.trim() && form.address.trim()

  if (!open || !branch) return null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <Building2 className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit Branch</h2>
                  <p className="text-sm text-slate-500">Update branch information</p>
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
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-5">
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

                {/* Status Toggle */}
                <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Branch Status</p>
                    <p className="text-xs text-slate-500">Enable or disable branch operations</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, is_active: !form.is_active })}
                    className={`relative h-6 w-11 rounded-full transition ${
                      form.is_active ? "bg-green-500" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                        form.is_active ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Error Message */}
                {error.updateBranch && (
                  <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {error.updateBranch}
                  </div>
                )}
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
                onClick={handleSubmit}
                disabled={branchloading.updateBranch || !isFormValid}
                className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {branchloading.updateBranch ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}