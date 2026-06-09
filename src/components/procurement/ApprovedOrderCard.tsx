// src/components/procurement/ApprovedOrderCard.tsx
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Building2, Package, Calendar, DollarSign, CheckCircle, Truck, User } from "lucide-react"
import type { ProcurementListItem } from "@/types/procurement"

interface ApprovedOrderCardProps {
  order: ProcurementListItem
  delay: number
}

export function ApprovedOrderCard({ order, delay }: ApprovedOrderCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => router.push(`/dashboard/admin/procurement/${order.po_id}`)}
      className="group cursor-pointer rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-green-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{order.supplier_name}</h3>
          <p className="mt-0.5 text-xs text-slate-500">PO-{order.po_id.slice(0, 8)}</p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
          <CheckCircle className="h-3 w-3" />
          Approved
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

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1">
          <Truck className="h-3.5 w-3.5 text-green-600" />
          <span className="text-xs text-green-700">Ready for receiving</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">Total</span>
          <p className="text-lg font-bold text-slate-900">₦{order.total_amount.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  )
}