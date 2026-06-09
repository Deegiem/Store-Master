// src/components/procurement/ProcurementStats.tsx
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShoppingCart, Clock, CheckCircle, Wallet } from "lucide-react"

interface ProcurementStatsProps {
  total: number
  pending: number
  approved: number
  totalValue: number
}

export function ProcurementStats({ total, pending, approved, totalValue }: ProcurementStatsProps) {
  const router = useRouter()

  const stats = [
    { label: "Total Orders", value: total, icon: ShoppingCart, onClick: null, color: "bg-blue-50", iconColor: "text-blue-600" },
    { label: "Pending", value: pending, icon: Clock, onClick: () => router.push("/dashboard/admin/procurement/pending-approval"), color: "bg-amber-50", iconColor: "text-amber-600" },
    { label: "Approved", value: approved, icon: CheckCircle, onClick: null, color: "bg-green-50", iconColor: "text-green-600" },
    { label: "Total Value", value: `₦${totalValue.toLocaleString()}`, icon: Wallet, onClick: null, color: "bg-purple-50", iconColor: "text-purple-600" },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={stat.onClick || undefined}
          className={`rounded-sm border border-slate-200 bg-white p-5 ${stat.onClick ? "cursor-pointer transition-all hover:shadow-md" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
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