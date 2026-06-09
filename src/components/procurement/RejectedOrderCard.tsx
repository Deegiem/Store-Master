// src/components/procurement/RejectedOrderCard.tsx
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Building2, Package, Calendar, DollarSign, XCircle, AlertCircle, User } from "lucide-react"
import type { ProcurementListItem } from "@/types/procurement"

interface RejectedOrderCardProps {
  order: ProcurementListItem
  delay: number
}

export function RejectedOrderCard({ order, delay }: RejectedOrderCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => router.push(`/dashboard/admin/procurement/${order.po_id}`)}
      className="group cursor-pointer rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-red-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{order.supplier_name}</h3>
          <p className="mt-0.5 text-xs text-slate-500">PO-{order.po_id.slice(0, 8)}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
          <XCircle className="h-3 w-3" />
          Rejected
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sm text-slate-600">{order.target_branch}</span>
        </div>
        <div className="flex items-center gap-2">
          <Package className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sm text-slate-600">{order.items_count} items</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-sm text-slate-600">{new Date(order.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-3 flex items-center gap-1.5 rounded-sm bg-red-50 p-2">
        <AlertCircle className="h-3.5 w-3.5 text-red-600" />
        <span className="text-xs text-red-700">Requires review</span>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-500">Total amount</span>
        <p className="text-lg font-bold text-slate-900">₦{order.total_amount.toLocaleString()}</p>
      </div>
    </motion.div>
  )
}