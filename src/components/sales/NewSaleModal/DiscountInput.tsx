"use client"

import { Tag, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useAdminStore } from "@/store/adminStore"

interface DiscountInputProps {
  discount: number
  setDiscount: (value: number) => void
  subtotal?: number
  maxDiscountPercentage?: number
}

export function DiscountInput({ discount, setDiscount, subtotal = 0, maxDiscountPercentage = 0 }: DiscountInputProps) {
  const [error, setError] = useState<string | null>(null)
  const { systemSettings, fetchSystemSettings } = useAdminStore()
  
  useEffect(() => {
    if (!systemSettings) {
      fetchSystemSettings()
    }
  }, [systemSettings, fetchSystemSettings])
  
  const maxPercentage = systemSettings?.max_discount_percentage ?? maxDiscountPercentage
  const maxDiscountAmount = (subtotal * maxPercentage) / 100
  
  const handleDiscountChange = (value: number) => {
    setError(null)
    
    if (maxPercentage > 0 && value > maxDiscountAmount) {
      setError(`Maximum discount allowed is ${maxPercentage}% (${subtotal > 0 ? `₦${maxDiscountAmount.toLocaleString()}` : 'check settings'})`)
    }
    
    setDiscount(value)
  }
  
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4 text-slate-400" />
        <label className="text-sm font-medium text-slate-700">Discount (Flat Amount)</label>
        {maxPercentage > 0 && (
          <span className="text-xs text-slate-500 ml-2">
            (Max {maxPercentage}% = ₦{maxDiscountAmount.toLocaleString()})
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-lg font-semibold text-slate-500">₦</span>
        <input
          type="number"
          min="0"
          step="100"
          value={discount}
          onChange={(e) => handleDiscountChange(Math.max(0, parseInt(e.target.value) || 0))}
          className="flex-1 rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          placeholder="Enter discount amount"
        />
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
    </div>
  )
}