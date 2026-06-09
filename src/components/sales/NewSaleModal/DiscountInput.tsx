"use client"

import { Tag } from "lucide-react"

interface DiscountInputProps {
  discount: number
  setDiscount: (value: number) => void
}

export function DiscountInput({ discount, setDiscount }: DiscountInputProps) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-slate-400" />
        <label className="text-sm font-medium text-slate-700">Discount (Flat Amount)</label>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-semibold text-slate-500">₦</span>
        <input
          type="number"
          min="0"
          step="100"
          value={discount}
          onChange={(e) => setDiscount(Math.max(0, parseInt(e.target.value) || 0))}
          className="flex-1 rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          placeholder="Enter discount amount"
        />
      </div>
    </div>
  )
}