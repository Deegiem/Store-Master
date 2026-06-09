// src/components/inventory/AdjustmentHistory.tsx
"use client"

import { motion } from "framer-motion"
import { History, Calendar, FileText, Package, User } from "lucide-react"
import type { AdjustmentHistoryItem } from "@/types/inventory"

interface AdjustmentHistoryProps {
  history: AdjustmentHistoryItem[]
  showUserInfo?: boolean
}

const reasonColors: Record<string, string> = {
  damaged: "text-red-700 bg-red-50",
  expired: "text-yellow-700 bg-yellow-50",
  theft: "text-orange-700 bg-orange-50",
  internal_consumption: "text-blue-700 bg-blue-50",
}

const reasonLabels: Record<string, string> = {
  damaged: "Damaged",
  expired: "Expired",
  theft: "Theft",
  internal_consumption: "Internal Consumption",
}

export function AdjustmentHistory({ history, showUserInfo = false }: AdjustmentHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
        <History className="h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm text-slate-500">No adjustment history found</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {history.map((item, index) => (
        <motion.div
          key={item._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03 }}
          className="rounded-sm border border-slate-200 bg-white p-4 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-slate-100">
                <Package className="h-4 w-4 text-slate-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${reasonColors[item.reason]}`}>
                    {reasonLabels[item.reason]}
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    -{item.quantity_removed} units
                  </span>
                </div>
                {showUserInfo && (
                  <div className="mt-1 flex items-center gap-2">
                    <User className="h-3 w-3 text-slate-400" />
                    <p className="text-xs text-slate-500">User ID: {item.user_id.slice(0, 8)}...</p>
                  </div>
                )}
                {item.note && (
                  <div className="mt-2 flex items-start gap-2">
                    <FileText className="mt-0.5 h-3 w-3 text-slate-400" />
                    <p className="text-sm text-slate-600">{item.note}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="h-3 w-3" />
                {new Date(item.date).toLocaleString()}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}