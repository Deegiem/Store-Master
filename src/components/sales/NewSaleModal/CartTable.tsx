"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import type { SaleLineItem, SaleQuoteResponse } from "@/types/sale"

interface CartTableProps {
  cart: SaleLineItem[]
  quote: SaleQuoteResponse | null
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export function CartTable({ cart, quote, onUpdateQuantity, onRemove }: CartTableProps) {
  if (!quote) return null

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-semibold text-slate-900">Shopping Cart</h3>
        <p className="text-sm text-slate-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Product
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Price
              </th>
              <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Quantity
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Total
              </th>
              <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((item) => {
              const cartItem = cart.find(c => c.product_id === item.product_id)
              const availableQuantity = item.available_quantity
              
              return (
                <tr key={item.product_id} className="border-b border-slate-100">
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{item.product_name}</p>
                      <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-slate-600">
                    ₦{item.unit_price.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product_id, (cartItem?.quantity || 1) - 1)}
                        className="rounded-sm p-1 hover:bg-slate-100 transition-colors"
                        disabled={!cartItem || cartItem.quantity <= 1}
                      >
                        <Minus className="h-3 w-3 text-slate-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-slate-900">
                        {cartItem?.quantity || 0}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product_id, (cartItem?.quantity || 0) + 1)}
                        className="rounded-sm p-1 hover:bg-slate-100 transition-colors"
                        disabled={cartItem?.quantity === availableQuantity}
                      >
                        <Plus className="h-3 w-3 text-slate-600" />
                      </button>
                    </div>
                    {cartItem?.quantity === availableQuantity && (
                      <p className="mt-1 text-center text-[10px] text-red-500">Max stock</p>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-slate-900">
                    ₦{item.line_total.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => onRemove(item.product_id)}
                      className="rounded-sm p-1 text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}