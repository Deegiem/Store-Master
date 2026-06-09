"use client"

import { motion } from "framer-motion"

interface SalesStatCardProps {
  title: string
  value: string
  icon: React.ReactNode
  delay?: number
}

export function SalesStatCard({ title, value, icon, delay = 0 }: SalesStatCardProps) {
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
            {title}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">{value}</h2>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-slate-50">
          {icon}
        </div>
      </div>
    </motion.div>
  )
}