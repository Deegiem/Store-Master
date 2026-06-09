// src/components/procurement/ProcurementItemsTable.tsx
"use client"

import { Package } from "lucide-react"
import type { ProcurementItem } from "@/types/procurement"

interface ProcurementItemsTableProps {
  items: ProcurementItem[]
}

export function ProcurementItemsTable({ items }: ProcurementItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-8 text-center">
        <Package className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-4 text-sm text-slate-500">No items found</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Order Items</h3>
        <p className="text-sm text-slate-500">{items.length} item{items.length !== 1 ? "s" : ""} in this order</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Product</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">SKU</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Ordered</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Received</th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">Unit Cost</th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-5 py-4 font-medium text-slate-900">
                  {item.product_name ?? item.product_id}
                  {!item.product_name && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                      Deleted
                    </span>
                  )}
                </td>                <td className="px-5 py-4 font-mono text-xs text-slate-500">{item.sku ?? "-"}</td>
                <td className="px-5 py-4 text-slate-600">{item.ordered_quantity}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${item.received_quantity ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"}`}>
                    {item.received_quantity ?? "—"}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600">₦{item.unit_cost.toLocaleString()}</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">₦{item.total_cost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-slate-200 bg-slate-50">
            <tr>
              <td colSpan={5} className="px-5 py-4 text-right font-semibold text-slate-900">Grand Total</td>
              <td className="px-5 py-4 text-right text-lg font-bold text-slate-900">
                ₦{items.reduce((sum, item) => sum + item.total_cost, 0).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
