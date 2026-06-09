// src/components/products/ProductStats.tsx
"use client"

import { motion } from "framer-motion"
import { Package, DollarSign, AlertTriangle } from "lucide-react"

interface Props {
  totalProducts: number
  pricedCount: number
  unpricedCount: number
}

export default function ProductStats({ totalProducts, pricedCount, unpricedCount }: Props) {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Priced Products",
      value: pricedCount,
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Unpriced Products",
      value: unpricedCount,
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group rounded-sm border border-slate-200 bg-white p-6 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {stat.title}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">{stat.value.toLocaleString()}</h2>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-sm ${stat.bgColor}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}