// src/components/user-audit/UserCard.tsx
"use client"

import { motion } from "framer-motion"
import { 
  UserCircle, 
  Mail, 
  Briefcase, 
  ChevronRight,
  Shield,
  Activity
} from "lucide-react"
import type { User } from "@/types/user"

interface UserCardProps {
  user: User
  onClick: () => void
  delay: number
}

export function UserCard({ user, onClick, delay }: UserCardProps) {
  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      admin: "bg-purple-50 text-purple-700 border-purple-200",
      manager: "bg-blue-50 text-blue-700 border-blue-200",
      finance: "bg-green-50 text-green-700 border-green-200",
      purchase: "bg-orange-50 text-orange-700 border-orange-200",
      store: "bg-cyan-50 text-cyan-700 border-cyan-200",
      sales: "bg-pink-50 text-pink-700 border-pink-200",
    }
    return roleColors[role?.toLowerCase()] || "bg-slate-50 text-slate-700 border-slate-200"
  }

  const getRoleIcon = (role: string) => {
    const roleIcons: Record<string, any> = {
      admin: Shield,
      manager: Briefcase,
      finance: Activity,
    }
    const Icon = roleIcons[role?.toLowerCase()]
    return Icon || UserCircle
  }

  const RoleIcon = getRoleIcon(user.role)
  const roleColor = getRoleColor(user.role)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="group cursor-pointer rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-[#003e9d]/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
            <UserCircle className="h-6 w-6 text-[#003e9d]" />
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
        <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#003e9d]" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${roleColor}`}>
          <RoleIcon className="h-3 w-3" />
          {user.role || "Unknown"}
        </div>
        {user.is_active ? (
          <span className="inline-flex items-center gap-1 text-xs text-green-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-red-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
            Inactive
          </span>
        )}
      </div>
    </motion.div>
  )
}