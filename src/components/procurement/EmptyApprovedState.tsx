"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Plus } from "lucide-react"
import { usePermissions } from "@/hooks/usePermissions"

interface EmptyApprovedStateProps {
  hasFilters?: boolean
}

export function EmptyApprovedState({ hasFilters }: EmptyApprovedStateProps) {
  const router = useRouter()
  const { canCreateProcurement, isAdmin, isPurchase } = usePermissions()

  // Check if user can create purchase orders
  const canCreatePO = canCreateProcurement || isAdmin || isPurchase

  if (hasFilters) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
        <div className="rounded-full bg-amber-50 p-3">
          <CheckCircle className="h-8 w-8 text-amber-500" />
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-900">No matching approved orders</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
      <div className="rounded-full bg-green-50 p-3">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      <p className="mt-4 text-lg font-semibold text-slate-900">No approved orders yet</p>
      <p className="mt-1 text-sm text-slate-500">Approved orders will appear here</p>
      
      {/* Only show Create PO button if user has permission */}
      {canCreatePO && (
        <button
          onClick={() => router.push("/dashboard/admin/procurement")}
          className="mt-6 inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus className="h-4 w-4" />
          Create Purchase Order
        </button>
      )}
    </div>
  )
}