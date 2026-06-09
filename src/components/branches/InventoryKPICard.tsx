// src/components/branches/InventoryKPICard.tsx
"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface InventoryKPICardProps {
  label: string
  value: number
  icon: LucideIcon
  color: "blue" | "green" | "orange" | "red"
  delay: number
}

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
}

export function InventoryKPICard({ label, value, icon: Icon, color, delay }: InventoryKPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            {value.toLocaleString()}
          </h2>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-sm ${colorStyles[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  )
}