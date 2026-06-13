"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface TopPerformerCardProps {
  branchName: string
  branchCode: string
  revenue: number
  salesCount: number
  growth: number
  currencySymbol: string
}

export function TopPerformerCard({
  branchName,
  branchCode,
  revenue,
  salesCount,
  growth,
  currencySymbol
}: TopPerformerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-sm border border-green-200 bg-gradient-to-r from-green-50 to-white p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-green-100">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-green-600 font-semibold">🏆 TOP PERFORMER</p>
            <h3 className="text-xl font-bold text-slate-900">{branchName}</h3>
            <p className="text-sm text-slate-500">{branchCode}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-slate-500">Revenue</p>
            <p className="text-lg font-bold text-slate-900">{currencySymbol}{revenue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Sales</p>
            <p className="text-lg font-bold text-slate-900">{salesCount}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Growth</p>
            <p className={`text-lg font-bold ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}