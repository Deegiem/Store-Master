// src/components/inventory/InventoryTable.tsx
"use client"

import { motion } from "framer-motion"
import { Package, TrendingDown, TrendingUp, AlertCircle, MinusCircle } from "lucide-react"
import type { InventoryItem } from "@/types/inventory"

interface InventoryTableProps {
  items: InventoryItem[]
  onAdjustStock?: (productId: string, productName: string, currentQuantity: number) => void
  showBranchInfo?: boolean
  branchName?: string
}

export function InventoryTable({ items, onAdjustStock, showBranchInfo, branchName }: InventoryTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStockStatus = (quantity: number, reorderPoint: number) => {
    if (quantity === 0) {
      return { label: "Out of Stock", color: "text-red-700 bg-red-50", icon: AlertCircle }
    }
    if (quantity <= reorderPoint) {
      return { label: "Low Stock", color: "text-yellow-700 bg-yellow-50", icon: TrendingDown }
    }
    return { label: "In Stock", color: "text-green-700 bg-green-50", icon: TrendingUp }
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
        <Package className="h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm text-slate-500">No inventory items found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Product
            </th>
            {showBranchInfo && (
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Branch
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Selling Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Reorder Point
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Last Updated
            </th>
            {onAdjustStock && (
              <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {items.map((item, index) => {
            const StockStatus = getStockStatus(item.quantity, item.reorder_point)
            return (
              <motion.tr
                key={item._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className="hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{item.product_name}</p>
                    <p className="mt-1 font-mono text-xs text-slate-400">{item.product_id.slice(0, 8)}...</p>
                  </div>
                </td>
                {showBranchInfo && (
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {branchName || item.branch_id.slice(0, 8)}...
                  </td>
                )}
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`text-sm font-semibold ${
                    item.quantity <= item.reorder_point ? "text-red-600" : "text-slate-900"
                  }`}>
                    {item.quantity} units
                  </span>
                  {item.bin_location && (
                    <p className="mt-1 text-xs text-slate-400">Bin: {item.bin_location}</p>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                  {formatPrice(item.selling_price)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${StockStatus.color}`}>
                    <StockStatus.icon className="h-3 w-3" />
                    {StockStatus.label}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {item.reorder_point} units
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {new Date(item.updated_at).toLocaleDateString()}
                </td>
                {onAdjustStock && (
                  <td className="whitespace-nowrap px-6 py-4 text-center">
                    <button
                      onClick={() => onAdjustStock(item.product_id, item.product_name, item.quantity)}
                      className="inline-flex items-center gap-1.5 rounded-sm bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700"
                    >
                      <MinusCircle className="h-3.5 w-3.5" />
                      Remove Stock
                    </button>
                  </td>
                )}
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}