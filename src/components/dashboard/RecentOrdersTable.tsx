// src/components/dashboard/RecentOrdersTable.tsx
"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye } from "lucide-react"
import type { RecentPO } from "@/types/dashboard"

interface RecentOrdersTableProps {
  orders: RecentPO[]
  title?: string
  delay?: number
}

export function RecentOrdersTable({ orders, title = "Recent Purchase Orders", delay = 0 }: RecentOrdersTableProps) {
  const router = useRouter()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700"
      case "Pending Approval":
        return "bg-amber-100 text-amber-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-sm border border-slate-200 bg-white"
    >
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                PO ID
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Amount
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Created
              </th>
              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order, idx) => (
              <tr key={order.po_id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-mono text-xs text-slate-600">
                  {order.po_id.slice(0, 8)}...
                </td>
                <td className="px-5 py-3 font-semibold text-slate-900">
                  ₦{order.total_amount.toLocaleString()}
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => router.push(`/dashboard/purchase/procurement/${order.po_id}`)}
                    className="inline-flex items-center gap-1 text-[#003e9d] hover:underline"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}