// src/components/procurement/ProcurementStatusBadge.tsx
"use client"

import { Clock, CheckCircle, XCircle, Truck, Package } from "lucide-react"

interface ProcurementStatusBadgeProps {
  status: string
}

const statusConfig: Record<string, { icon: any; label: string; color: string }> = {
  "Pending Approval": { icon: Clock, label: "Pending Approval", color: "bg-amber-50 text-amber-700 border-amber-200" },
  "Approved": { icon: CheckCircle, label: "Approved", color: "bg-green-50 text-green-700 border-green-200" },
  "Rejected": { icon: XCircle, label: "Rejected", color: "bg-red-50 text-red-700 border-red-200" },
  "Received": { icon: Truck, label: "Received", color: "bg-blue-50 text-blue-700 border-blue-200" },
}

export function ProcurementStatusBadge({ status }: ProcurementStatusBadgeProps) {
  const config = statusConfig[status] || { icon: Package, label: status, color: "bg-slate-100 text-slate-600 border-slate-200" }
  const Icon = config.icon

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  )
}