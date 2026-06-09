// src/components/users/UsersProfileCard.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserCircle, Mail, Briefcase, Edit, Power, CheckCircle, XCircle } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { EditUserModal } from "@/components/users/EditUserModal"
import type { User } from "@/types/user"

interface UsersProfileCardProps {
  user: User
  onUserUpdate: () => void
  delay: number
}

export function UsersProfileCard({ user, onUserUpdate, delay }: UsersProfileCardProps) {
  const { updateUserStatus, loading } = useUserStore()
  const [editing, setEditing] = useState(false)

  const toggleStatus = async () => {
    await updateUserStatus(user.user_id, { active: !user.is_active })
    onUserUpdate()
  }

  const getRoleColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: "bg-purple-50 text-purple-700",
      manager: "bg-blue-50 text-blue-700",
      finance: "bg-green-50 text-green-700",
      purchase: "bg-orange-50 text-orange-700",
      store: "bg-cyan-50 text-cyan-700",
      sales: "bg-pink-50 text-pink-700",
    }
    return colors[role?.toLowerCase()] || "bg-slate-50 text-slate-700"
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">              <UserCircle className="h-6 w-6 text-[#003e9d]" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                {user.first_name} {user.last_name}
              </h3>
              <div className="mt-1 flex items-center gap-1">
                <Mail className="h-3 w-3 text-slate-400" />
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setEditing(true)}
              className="rounded-sm p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-[#003e9d]"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={toggleStatus}
              disabled={loading.updateStatus}
              className={`rounded-sm p-1.5 transition ${user.is_active
                  ? "text-red-400 hover:bg-red-50 hover:text-red-600"
                  : "text-green-400 hover:bg-green-50 hover:text-green-600"
                }`}
            >
              <Power className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getRoleColor(user.role)}`}>
              {user.role}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {user.is_active ? (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                <span className="text-xs text-green-700">Active</span>
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5 text-red-600" />
                <span className="text-xs text-red-700">Inactive</span>
              </>
            )}
          </div>
        </div>

        {user.branch_name && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500">Branch: {user.branch_name}</p>
          </div>
        )}
      </motion.div>

      <EditUserModal
        open={editing}
        onClose={() => setEditing(false)}
        user={user}
        onUserUpdate={onUserUpdate}
      />
    </>
  )
}