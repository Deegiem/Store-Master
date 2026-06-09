"use client"

import { useRouter, useParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import type { SaleListRecord } from "@/types/sale"
import { SaleStatusBadge } from "./SaleStatusBadge"

interface SalesListTableProps {
  sales: SaleListRecord[]
}

export function SalesListTable({ sales }: SalesListTableProps) {
  const router = useRouter()
  const params = useParams()
  const currentRole = params.role as string

  if (sales.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Sales Transactions</h3>
        <p className="text-sm text-slate-500">{sales.length} sale{sales.length !== 1 ? "s" : ""} found</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Sale Number
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Branch
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Cashier
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Items
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Total Amount
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Payment Method
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Date
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr 
                key={sale.sale_id} 
                className="border-b border-slate-100 transition hover:bg-slate-50 cursor-pointer"
                onClick={() => router.push(`/dashboard/${currentRole}/sales/${sale.sale_id}`)}
              >
                <td className="px-5 py-4 font-mono text-xs font-medium text-slate-900">
                  {sale.sale_number}
                </td>
                <td className="px-5 py-4 text-slate-600">{sale.branch_name}</td>
                <td className="px-5 py-4 text-slate-600">{sale.cashier_name}</td>
                <td className="px-5 py-4 text-right text-slate-600">{sale.items_count}</td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                  ₦{sale.total_amount.toLocaleString()}
                </td>
                <td className="px-5 py-4 text-slate-600">{sale.payment_method}</td>
                <td className="px-5 py-4">
                  <SaleStatusBadge status={sale.status} />
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {new Date(sale.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}