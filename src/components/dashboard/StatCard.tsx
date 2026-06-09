// src/components/dashboard/StatCard.tsx
"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  color?: "blue" | "green" | "amber" | "purple" | "red" | "slate"
  onClick?: () => void
  delay?: number
}

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  amber: "bg-amber-50 text-amber-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
  slate: "bg-slate-50 text-slate-600",
}

export function StatCard({ label, value, icon: Icon, trend, color = "blue", onClick, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`rounded-sm border border-slate-200 bg-white p-5 ${onClick ? "cursor-pointer transition-all hover:shadow-md" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${colorStyles[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "+" : ""}{trend.value}% {trend.label || "vs last month"}
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</p>
    </motion.div>
  )
}