"use client"

import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Package, Building2 } from "lucide-react"

interface BranchPerformanceStatsProps {
  totalRevenue: number
  totalSales: number
  totalItems: number
  activeBranches: number
  totalBranches: number
  currencySymbol: string
}

export function BranchPerformanceStats({
  totalRevenue,
  totalSales,
  totalItems,
  activeBranches,
  totalBranches,
  currencySymbol
}: BranchPerformanceStatsProps) {
  const stats = [
    {
      label: "Total Revenue",
      value: `${currencySymbol}${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-50",
      iconColor: "text-green-600",
      delay: 0.05
    },
    {
      label: "Total Sales",
      value: totalSales.toLocaleString(),
      icon: TrendingUp,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      delay: 0.1
    },
    {
      label: "Items Sold",
      value: totalItems.toLocaleString(),
      icon: Package,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      delay: 0.15
    },
    {
      label: "Active Branches",
      value: `${activeBranches} / ${totalBranches}`,
      icon: Building2,
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      delay: 0.2
    }
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: stat.delay }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</h2>
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