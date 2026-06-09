"use client"

import { CheckCircle, XCircle } from "lucide-react"

interface SaleStatusBadgeProps {
  status: string
}

const statusConfig: Record<string, { icon: any; label: string; color: string }> = {
  "Completed": { icon: CheckCircle, label: "Completed", color: "bg-green-50 text-green-700 border-green-200" },
  "Cancelled": { icon: XCircle, label: "Cancelled", color: "bg-red-50 text-red-700 border-red-200" },
}

export function SaleStatusBadge({ status }: SaleStatusBadgeProps) {
  const config = statusConfig[status] || { 
    icon: CheckCircle, 
    label: status, 
    color: "bg-slate-100 text-slate-600 border-slate-200" 
  }
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  )
}