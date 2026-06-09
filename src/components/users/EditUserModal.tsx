// src/components/users/EditUserModal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, User as UserIcon, Mail, Briefcase, Building2, Save, AlertCircle, Loader2 } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { useAdminStore } from "@/store/adminStore"
import { useBranchStore } from "@/store/useBranchStore"
import type { User, Role } from "@/types/user"

interface EditUserModalProps {
  open: boolean
  onClose: () => void
  user: User | null
  onUserUpdate: () => void
}

export function EditUserModal({ open, onClose, user, onUserUpdate }: EditUserModalProps) {
  const { updateUser, loading, error } = useUserStore()
  const { roles, fetchRoles, adminloading } = useAdminStore()
  const { branches, fetchBranches, branchloading } = useBranchStore()

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    role: "" as Role,
    branch_id: "",
    is_active: true,
  })

  useEffect(() => {
    if (open) {
      fetchRoles()
      fetchBranches()
    }
  }, [open, fetchRoles, fetchBranches])

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        role: user.role as Role,
        branch_id: user.branch_id || "",
        is_active: user.is_active,
      })
    }
  }, [user])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleSubmit = async () => {
    if (!user) return
    
    await updateUser(user.user_id, form)
    await onUserUpdate()
    onClose()
  }

  const isFormValid = form.first_name && form.last_name && form.role && form.branch_id

  if (!open || !user) return null

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <UserIcon className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit User</h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                    className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Role *
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                >
                  <option value="">Select Role</option>
                  {adminloading.roles ? (
                    <option disabled>Loading roles...</option>
                  ) : (
                    roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Branch *
                </label>
                <select
                  value={form.branch_id}
                  onChange={(e) => setForm({ ...form, branch_id: e.target.value })}
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                >
                  <option value="">Select Branch</option>
                  {branchloading.branches ? (
                    <option disabled>Loading branches...</option>
                  ) : (
                    branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-[#F3F4F6] p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">User Status</p>
                  <p className="text-xs text-slate-500">Enable or disable user access</p>
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

              {error.updateUser && (
                <div className="flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  {error.updateUser}
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
                disabled={loading.updateUser || !isFormValid}
                className="flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading.updateUser ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
