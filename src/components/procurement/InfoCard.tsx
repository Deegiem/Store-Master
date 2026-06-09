// src/components/procurement/InfoCard.tsx
"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface InfoCardProps {
  label: string
  value: string
  icon: LucideIcon
  delay: number
}

export function InfoCard({ label, value, icon: Icon, delay }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#F3F4F6]">
          <Icon className="h-4 w-4 text-slate-500" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-sm font-medium text-slate-900 break-words">{value}</p>
        </div>
      </div>
    </motion.div>
  )
}