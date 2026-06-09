// src/components/inventory/StockCard.tsx
"use client"

import { motion } from "framer-motion"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"

interface StockCardProps {
  productName: string
  quantity: number
  reorderPoint: number
  sellingPrice: number
  onClick?: () => void
}

export function StockCard({ productName, quantity, reorderPoint, sellingPrice, onClick }: StockCardProps) {
  const isLowStock = quantity <= reorderPoint && quantity > 0
  const isOutOfStock = quantity === 0
  
  const statusConfig = isOutOfStock
    ? { color: "border-red-200 bg-red-50", icon: AlertTriangle, text: "Out of Stock", textColor: "text-red-700" }
    : isLowStock
    ? { color: "border-yellow-200 bg-yellow-50", icon: AlertTriangle, text: "Low Stock", textColor: "text-yellow-700" }
    : { color: "border-slate-200 bg-white", icon: CheckCircle, text: "In Stock", textColor: "text-green-700" }
  
  const StatusIcon = statusConfig.icon
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`cursor-pointer rounded-sm border ${statusConfig.color} p-5 transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-sm p-2 ${
            isOutOfStock ? "bg-red-100" : isLowStock ? "bg-yellow-100" : "bg-blue-100"
          }`}>
            <Package className={`h-5 w-5 ${
              isOutOfStock ? "text-red-600" : isLowStock ? "text-yellow-600" : "text-[#003e9d]"
            }`} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{productName}</h3>
            <p className="mt-0.5 text-sm text-slate-500">
              ₦{sellingPrice.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-slate-900">{quantity}</div>
          <div className="mt-1 flex items-center gap-1">
            <StatusIcon className="h-3 w-3" />
            <span className={`text-xs font-medium ${statusConfig.textColor}`}>
              {statusConfig.text}
            </span>
          </div>
        </div>
      </div>
      
      {isLowStock && !isOutOfStock && (
        <div className="mt-3 rounded-sm border-t border-yellow-200 pt-3">
          <p className="text-xs font-medium text-yellow-700">
            Reorder point: {reorderPoint} units
          </p>
        </div>
      )}
    </motion.div>
  )
}