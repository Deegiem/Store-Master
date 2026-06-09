// src/components/inventory/GlobalAdjustmentsTable.tsx
"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Calendar, Building2, Package, User, FileText } from "lucide-react"
import type { AllAdjustmentsItem } from "@/types/inventory"

interface GlobalAdjustmentsTableProps {
  adjustments: AllAdjustmentsItem[]
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

export function GlobalAdjustmentsTable({ adjustments }: GlobalAdjustmentsTableProps) {
  if (adjustments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
        <AlertTriangle className="h-12 w-12 text-slate-300" />
        <p className="mt-4 text-sm text-slate-500">No adjustments found</p>
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
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Branch
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Reason
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Adjusted By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {adjustments.map((item, index) => (
            <motion.tr
              key={item.id}
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
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-600">{item.branch}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className="text-sm font-semibold text-red-600">
                  -{item.quantity_removed} units
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${reasonColors[item.reason]}`}>
                  {reasonLabels[item.reason]}
                </span>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-900">{item.adjusted_by}</p>
                    <p className="text-xs text-slate-500">{item.adjusted_by_role}</p>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {new Date(item.date).toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                {item.note !== "string" && item.note ? (
                  <div className="flex items-start gap-2">
                    <FileText className="mt-0.5 h-3 w-3 text-slate-400" />
                    <span className="text-sm text-slate-600">{item.note}</span>
                  </div>
                ) : (
                  <span className="text-sm text-slate-400">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}