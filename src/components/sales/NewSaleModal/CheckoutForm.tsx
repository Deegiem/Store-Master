"use client"

import { CreditCard, Hash, FileText, AlertCircle } from "lucide-react"
import type { SaleQuoteResponse } from "@/types/sale"

interface CheckoutFormProps {
  quote: SaleQuoteResponse
  paymentMethod: string
  setPaymentMethod: (value: string) => void
  tillNumber: string
  setTillNumber: (value: string) => void
  notes: string
  setNotes: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  isValidPaymentMethod: boolean
  cartEmpty: boolean
}

export function CheckoutForm({
  quote,
  paymentMethod,
  setPaymentMethod,
  tillNumber,
  setTillNumber,
  notes,
  setNotes,
  onSubmit,
  isLoading,
  isValidPaymentMethod,
  cartEmpty,
}: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      {/* Order Summary */}
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <h3 className="mb-3 font-semibold text-slate-900">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-medium text-slate-900">
              {quote.currency_symbol}{quote.subtotal.toLocaleString()}
            </span>
          </div>
          {quote.discount > 0 && (
            <div className="flex justify-between text-red-600">
              <span>Discount</span>
              <span>-{quote.currency_symbol}{quote.discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-600">Tax ({quote.tax_rate})</span>
            <span className="font-medium text-slate-900">
              {quote.currency_symbol}{quote.tax.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-slate-200 pt-2">
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span className="text-[#003e9d]">
                {quote.currency_symbol}{quote.total_amount.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {quote.items_count} item{quote.items_count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-slate-400" />
          <label className="text-sm font-medium text-slate-700">Payment Method</label>
        </div>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        >
          <option value="">Select payment method</option>
          {quote.payment_methods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
        {paymentMethod && !isValidPaymentMethod && (
          <p className="mt-2 text-xs text-red-600">
            Payment method not available for this transaction
          </p>
        )}
      </div>

      {/* Till Number */}
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4 text-slate-400" />
          <label className="text-sm font-medium text-slate-700">Till Number</label>
        </div>
        <input
          type="text"
          value={tillNumber}
          onChange={(e) => setTillNumber(e.target.value)}
          placeholder="Enter till number"
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
      </div>

      {/* Notes */}
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-400" />
          <label className="text-sm font-medium text-slate-700">Notes (Optional)</label>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any notes about this sale..."
          rows={3}
          className="mt-2 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
      </div>

      {/* Checkout Button */}
      <button
        onClick={onSubmit}
        disabled={cartEmpty || !paymentMethod || !isValidPaymentMethod || !tillNumber.trim() || isLoading}
        className="w-full rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] py-3 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : `Complete Sale (${quote.currency_symbol}${quote.total_amount.toLocaleString()})`}
      </button>

      {/* Validation Warnings */}
      {!cartEmpty && (!paymentMethod || !isValidPaymentMethod || !tillNumber.trim()) && (
        <div className="flex items-start gap-2 rounded-sm border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Complete all fields to continue</p>
            <ul className="mt-1 text-xs list-disc list-inside">
              {!paymentMethod && <li>Select a payment method</li>}
              {paymentMethod && !isValidPaymentMethod && <li>Selected payment method is not available</li>}
              {!tillNumber.trim() && <li>Enter till number</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}