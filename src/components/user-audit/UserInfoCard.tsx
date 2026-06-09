// src/components/user-audit/UserInfoCard.tsx
"use client"

import { motion } from "framer-motion"
import { 
  UserCircle, 
  Mail, 
  Shield,
  Activity,
} from "lucide-react"
import type { UserDetails } from "@/types/admin"

interface UserInfoCardProps {
  user: UserDetails
  totalActions?: number
  userId?: string
}

export function UserInfoCard({ user, totalActions, userId }: UserInfoCardProps) {
  const stats = [
    { label: "Total Actions", value: totalActions || 0, icon: Activity, color: "text-blue-600" },
    { label: "Role", value: user.role || "Unknown", icon: Shield, color: "text-purple-600" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
            <UserCircle className="h-8 w-8 text-[#003e9d]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {user.name}
            </h2>
            <div className="mt-1 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <p className="text-sm text-slate-600">{user.email}</p>
            </div>
            {userId && (
              <p className="mt-1 font-mono text-xs text-slate-400">
                User ID: {userId}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="flex items-center gap-1.5">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
              <p className="mt-1 text-lg font-semibold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
