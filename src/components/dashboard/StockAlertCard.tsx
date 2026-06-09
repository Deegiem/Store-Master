"use client"

import { AlertTriangle, Package } from "lucide-react"
import { motion } from "framer-motion"

interface StockAlertCardProps {
  alerts: {
    low_stock_count: number
    out_of_stock_count: number
    low_stock_items: Array<{
      product_id: string
      product_name: string
      quantity: number
      reorder_point: number
    }>
  }
  delay: number
}

export function StockAlertCard({ alerts, delay }: StockAlertCardProps) {
  const hasAlerts = alerts.low_stock_count > 0 || alerts.out_of_stock_count > 0

  if (!hasAlerts) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="rounded-sm border border-slate-200 bg-white p-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-green-50">
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Stock Status</h3>
            <p className="text-sm text-slate-500">All stock levels are healthy</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Stock Alerts</h3>
          <p className="text-sm text-slate-500">
            {alerts.low_stock_count} low stock, {alerts.out_of_stock_count} out of stock
          </p>
        </div>
      </div>

      {alerts.low_stock_items.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-slate-500">Low stock items:</p>
          <div className="space-y-2">
            {alerts.low_stock_items.slice(0, 3).map((item) => (
              <div key={item.product_id} className="flex items-center justify-between text-sm">
                <span className="text-slate-700">{item.product_name}</span>
                <span className="font-semibold text-amber-600">{item.quantity} units</span>
              </div>
            ))}
          </div>
          {alerts.low_stock_items.length > 3 && (
            <p className="text-xs text-slate-400">
              +{alerts.low_stock_items.length - 3} more items
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}