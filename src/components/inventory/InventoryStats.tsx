// src/components/inventory/InventoryStats.tsx
"use client"

import { motion } from "framer-motion"
import { Package, AlertTriangle, TrendingDown, DollarSign } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"

interface InventoryStatsProps {
  items: InventoryItem[]
}

export function InventoryStats({ items }: InventoryStatsProps) {
  const totalItems = items.length
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = items.filter((item) => item.quantity <= item.reorder_point).length
  const outOfStockCount = items.filter((item) => item.quantity === 0).length
  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.selling_price), 0)

  const stats = [
    {
      label: "Total Products",
      value: totalItems,
      icon: Package,
      color: "from-blue-600 to-blue-700",
    },
    {
      label: "Total Units",
      value: totalQuantity,
      icon: Package,
      color: "from-green-600 to-green-700",
    },
    {
      label: "Low Stock Items",
      value: lowStockCount,
      icon: AlertTriangle,
      color: "from-yellow-600 to-yellow-700",
    },
    {
      label: "Out of Stock",
      value: outOfStockCount,
      icon: TrendingDown,
      color: "from-red-600 to-red-700",
    },
    {
      label: "Inventory Value",
      value: new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0,
      }).format(totalValue),
      icon: DollarSign,
      color: "from-purple-600 to-purple-700",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-sm border border-slate-200 bg-white p-4"
        >
          <div className={`inline-flex rounded-sm bg-gradient-to-r ${stat.color} p-2`}>
            <stat.icon className="h-4 w-4 text-white" />
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-xs text-slate-500">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}