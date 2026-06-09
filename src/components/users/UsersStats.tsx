// src/components/users/UsersStats.tsx
"use client"

import { motion } from "framer-motion"
import { Users, UserCheck, UserX } from "lucide-react"

interface UsersStatsProps {
  total: number
  active: number
  inactive: number
}

export function UsersStats({ total, active, inactive }: UsersStatsProps) {
  const stats = [
    {
      label: "Total Users",
      value: total,
      icon: Users,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active",
      value: active,
      icon: UserCheck,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Inactive",
      value: inactive,
      icon: UserX,
      color: "bg-red-50",
      iconColor: "text-red-600",
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                {stat.value.toLocaleString()}
              </h2>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${stat.color}`}>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}