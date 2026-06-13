// src/components/procurement/ProcurementCard.tsx
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Building2, Package, Calendar, DollarSign } from "lucide-react"
import { ProcurementStatusBadge } from "./ProcurementStatusBadge"
import type { ProcurementListItem } from "@/types/procurement"

interface ProcurementCardProps {
  order: ProcurementListItem
  delay: number
}

export function ProcurementCard({ order, delay }: ProcurementCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => router.push(`/dashboard/admin/procurement/${order.po_id}`)}
      className="group cursor-pointer rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-[#003e9d]/20"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">{order.supplier_name}</h3>
        </div>
        <ProcurementStatusBadge status={order.status} />
      </div>

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

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">Total Amount</span>
        <span className="text-lg font-bold text-slate-900">₦{order.total_amount.toLocaleString()}</span>
      </div>
    </motion.div>
  )
}