// src/components/branches/StaffCard.tsx
"use client"

import { motion } from "framer-motion"
import { UserCircle, Mail, Briefcase } from "lucide-react"
import type { BranchStaffMember } from "@/types/branch"

interface StaffCardProps {
  staff: BranchStaffMember
  delay: number
}

export function StaffCard({ staff, delay }: StaffCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white p-4 transition-all hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
          <UserCircle className="h-5 w-5 text-[#003e9d]" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-slate-900">{staff.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <Mail className="h-3 w-3 text-slate-400" />
            <p className="text-xs text-slate-500">{staff.email}</p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Briefcase className="h-3 w-3 text-slate-400" />
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getRoleColor(staff.role)}`}>
              {staff.role}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}