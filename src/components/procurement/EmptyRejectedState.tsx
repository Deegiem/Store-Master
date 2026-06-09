// src/components/procurement/EmptyRejectedState.tsx
"use client"

import { useRouter } from "next/navigation"
import { XCircle, Plus } from "lucide-react"

interface EmptyRejectedStateProps {
  hasFilters?: boolean
}

export function EmptyRejectedState({ hasFilters }: EmptyRejectedStateProps) {
  const router = useRouter()

  if (hasFilters) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
        <div className="rounded-full bg-amber-50 p-3">
          <XCircle className="h-8 w-8 text-amber-500" />
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-900">No matching rejected orders</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
      <div className="rounded-full bg-green-50 p-3">
        <XCircle className="h-8 w-8 text-green-500" />
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">No rejected orders</p>
      <p className="mt-1 text-sm text-slate-500">All orders have been approved successfully</p>
    </div>
  )
}