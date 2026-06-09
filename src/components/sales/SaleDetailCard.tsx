"use client"

import { Building2, User, CreditCard, Hash, Calendar, FileText, Receipt } from "lucide-react"
import type { SaleDetail } from "@/types/sale"
import { SaleStatusBadge } from "./SaleStatusBadge"
import { CancelSaleButton } from "./CancelSaleButton"
import { usePermissions } from "@/hooks/usePermissions"

interface SaleDetailCardProps {
  sale: SaleDetail
  onCancel?: () => void
}

export function SaleDetailCard({ sale, onCancel }: SaleDetailCardProps) {
  const { canCancelSale } = usePermissions()

  const detailSections = [
    { icon: Building2, label: "Branch", value: sale.branch_name },
    { icon: User, label: "Cashier", value: sale.cashier_name },
    { icon: CreditCard, label: "Payment Method", value: sale.payment_method },
    { icon: Hash, label: "Till Number", value: sale.till_number || "—" },
    { icon: Calendar, label: "Date", value: new Date(sale.created_at).toLocaleString() },
    { icon: FileText, label: "Notes", value: sale.notes || "—", fullWidth: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Receipt className="h-6 w-6 text-[#003e9d]" />
            <h1 className="text-2xl font-bold text-slate-900">{sale.sale_number}</h1>
            <SaleStatusBadge status={sale.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">Sale ID: {sale.sale_id}</p>
        </div>
        
        {canCancelSale && sale.status === "Completed" && (
          <CancelSaleButton saleId={sale.sale_id} onCancel={onCancel} />
        )}
      </div>

      {/* Details Grid */}
      <div className="rounded-sm border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Sale Details</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {detailSections.map((section, index) => (
            <div 
              key={index} 
              className={`flex items-start gap-3 ${section.fullWidth ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100">
                <section.icon className="h-4 w-4 text-slate-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {section.label}
                </p>
                <p className="mt-1 text-sm text-slate-900">{section.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-900">Items Sold</h3>
          <p className="text-sm text-slate-500">{sale.items.length} item{sale.items.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Product
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  SKU
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Quantity
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Unit Price
                </th>
                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sale.items.map((item, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium text-slate-900">{item.product_name}</td>
                  <td className="px-5 py-4 font-mono text-xs text-slate-500">{item.sku || "—"}</td>
                  <td className="px-5 py-4 text-right text-slate-600">{item.quantity}</td>
                  <td className="px-5 py-4 text-right text-slate-600">₦{item.unit_price.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-900">
                    ₦{item.line_total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr>
                <td colSpan={4} className="px-5 py-4 text-right font-semibold text-slate-900">
                  Subtotal
                </td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                  ₦{sale.subtotal.toLocaleString()}
                </td>
              </tr>
              {sale.discount > 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-4 text-right text-sm text-slate-600">
                    Discount
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-red-600">
                    -₦{sale.discount.toLocaleString()}
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan={4} className="px-5 py-4 text-right font-semibold text-slate-900">
                  Tax ({sale.tax})
                </td>
                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                  ₦{sale.tax.toLocaleString()}
                </td>
              </tr>
              <tr className="bg-slate-100">
                <td colSpan={4} className="px-5 py-4 text-right text-base font-bold text-slate-900">
                  Total
                </td>
                <td className="px-5 py-4 text-right text-base font-bold text-slate-900">
                  ₦{sale.total_amount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td colSpan={4} className="px-5 py-4 text-right text-sm text-slate-600">
                  Amount Paid
                </td>
                <td className="px-5 py-4 text-right text-sm font-medium text-green-600">
                  ₦{sale.amount_paid.toLocaleString()}
                </td>
              </tr>
              {sale.change_given > 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-4 text-right text-sm text-slate-600">
                    Change Given
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-slate-600">
                    ₦{sale.change_given.toLocaleString()}
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}