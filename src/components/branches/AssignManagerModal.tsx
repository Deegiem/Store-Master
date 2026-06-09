// src/components/branches/AssignManagerModal.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, UserCheck, Loader2, X, UserCircle, Mail, Briefcase } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import { useUserStore } from "@/store/useUserStore"
import type { User } from "@/types/user"

interface AssignManagerModalProps {
  open: boolean
  onClose: () => void
  branchId: string
}

export function AssignManagerModal({ open, onClose, branchId }: AssignManagerModalProps) {
  const { assignManagerToBranch, branchloading } = useBranchStore()
  const { users, fetchUsers, loading: userLoading } = useUserStore()

  const [managerId, setManagerId] = useState("")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (open) {
      fetchUsers()
      setManagerId("")
      setSearch("")
    }
  }, [open, fetchUsers])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const managers = useMemo(() => {
    if (!users) return []
    return users.filter((u) => u.role === "Store Manager")
  }, [users])

  const filteredManagers = useMemo(() => {
    return managers.filter((m) =>
      `${m.first_name} ${m.last_name} ${m.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [managers, search])

  const handleSubmit = async () => {
    if (!managerId) return

    await assignManagerToBranch(branchId, {
      manager_id: managerId,
    })

    onClose()
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
            className="w-full max-w-lg rounded-sm bg-white shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                  <UserCheck className="h-5 w-5 text-[#003e9d]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Assign Branch Manager</h2>
                  <p className="text-sm text-slate-500">Select a manager from system users</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Search Input */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search managers by name or email..."
                  className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                  autoFocus
                />
              </div>

              {/* Manager List */}
              <div className="max-h-80 space-y-2 overflow-y-auto">
                {userLoading.users && (
                  <div className="flex items-center justify-center gap-2 py-8 text-sm text-slate-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading managers...
                  </div>
                )}

                {!userLoading.users && filteredManagers.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <UserCircle className="h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">
                      {search ? "No managers match your search" : "No managers available"}
                    </p>
                    {!search && (
                      <p className="text-xs text-slate-400">
                        Create a user with "Store Manager" role first
                      </p>
                    )}
                  </div>
                )}

                {filteredManagers.map((manager) => (
                  <button
                    key={manager.user_id}
                    onClick={() => setManagerId(manager.user_id)}
                    className={`flex w-full items-center justify-between rounded-sm border p-4 text-left transition-all ${
                      managerId === manager.user_id
                        ? "border-[#003e9d] bg-[#003e9d]/5 shadow-[0_0_0_1px_#003e9d]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
                        <UserCircle className="h-5 w-5 text-[#003e9d]" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {manager.first_name} {manager.last_name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <p className="text-xs text-slate-500">{manager.email}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <Briefcase className="h-3 w-3 text-slate-400" />
                          <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            {manager.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {managerId === manager.user_id && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#003e9d]">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Info Note */}
              {managers.length > 0 && (
                <div className="mt-4 rounded-sm bg-slate-50 p-3 text-center">
                  <p className="text-xs text-slate-500">
                    {managers.length} manager{managers.length !== 1 ? "s" : ""} available
                  </p>
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
                disabled={!managerId || branchloading.assignManager}
                className="rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {branchloading.assignManager ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Assigning...
                  </div>
                ) : (
                  "Assign Manager"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}