// src/components/shared/StatsCard.tsx
"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  change?: string
  trendUp?: boolean
}

export function StatsCard({ label, value, icon: Icon, change, trendUp }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-sm bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-[#003e9d]" />
        </div>
        {change && (
          <span className={`text-sm font-semibold ${
            trendUp ? "text-green-600" : "text-red-600"
          }`}>
            {change}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </motion.div>
  )
}