"use client"

import { motion } from "framer-motion"
import { TrendingUp, Package, DollarSign, BarChart3 } from "lucide-react"

interface SalesStatsProps {
  total_sales: number
  total_revenue: number
  total_items_sold: number
  average_transaction_value: number
  currency_symbol: string
}

export function SalesStats({ 
  total_sales, 
  total_revenue, 
  total_items_sold, 
  average_transaction_value, 
  currency_symbol 
}: SalesStatsProps) {
  const stats = [
    { 
      label: "Total Sales", 
      value: total_sales.toLocaleString(), 
      icon: TrendingUp, 
      color: "bg-blue-50", 
      iconColor: "text-blue-600" 
    },
    { 
      label: "Revenue", 
      value: `${currency_symbol}${total_revenue.toLocaleString()}`, 
      icon: DollarSign, 
      color: "bg-green-50", 
      iconColor: "text-green-600" 
    },
    { 
      label: "Items Sold", 
      value: total_items_sold.toLocaleString(), 
      icon: Package, 
      color: "bg-purple-50", 
      iconColor: "text-purple-600" 
    },
    { 
      label: "Avg Transaction", 
      value: `${currency_symbol}${average_transaction_value.toLocaleString()}`, 
      icon: BarChart3, 
      color: "bg-amber-50", 
      iconColor: "text-amber-600" 
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