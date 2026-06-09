// src/components/audit/AuditStats.tsx
"use client"

import { motion } from "framer-motion"
import { 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Shield
} from "lucide-react"
import type { AuditLog } from "@/types/admin"

interface AuditStatsProps {
  logs: AuditLog[]
}

export function AuditStats({ logs }: AuditStatsProps) {
  const totalActions = logs.length
  const uniqueUsers = new Set(logs.map(log => log.user_email)).size
  const criticalActions = logs.filter(log => 
    log.action?.toUpperCase().includes("FAILED") || 
    log.action?.toUpperCase().includes("REJECTED") ||
    log.action?.toUpperCase().includes("DELETE")
  ).length
  const successActions = logs.filter(log => 
    log.action?.toUpperCase().includes("CREATE") || 
    log.action?.toUpperCase().includes("UPDATE") ||
    log.action?.toUpperCase().includes("APPROVE")
  ).length

  const stats = [
    {
      label: "Total Actions",
      value: totalActions,
      icon: Activity,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Users",
      value: uniqueUsers,
      icon: Users,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Critical Events",
      value: criticalActions,
      icon: AlertTriangle,
      color: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      label: "Successful Ops",
      value: successActions,
      icon: CheckCircle,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
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