// src/app/dashboard/[role]/inventory/low-stock/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import { AlertTriangle } from "lucide-react"
import type { AppRole } from "@/lib/roleMapper"

export default function GlobalLowStockPage() {
  const allowedRoles: AppRole[] = ["admin", "manager"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Low Stock Overview
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View low stock items across all branches
            </p>
          </div>
          
          <div className="rounded-sm border border-amber-200 bg-amber-50 p-12 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-400" />
            <h3 className="mt-4 text-lg font-semibold text-amber-800">Coming Soon</h3>
            <p className="mt-2 text-sm text-amber-700 max-w-md mx-auto">
              This feature is currently being developed. Please check individual branch inventory for low stock items.
            </p>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}