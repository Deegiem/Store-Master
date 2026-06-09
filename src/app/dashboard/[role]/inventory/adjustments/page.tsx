// src/app/dashboard/[role]/inventory/adjustments/page.tsx
"use client"

import { usePermissions } from "@/hooks/usePermissions"
import { AccessDenied } from "@/components/AccessDenied"
import { GlobalAdjustmentsView } from "@/components/inventory/GlobalAdjustmentsView"

export default function AdjustmentsPage() {
  const { isAdmin, isFinance, canViewReports } = usePermissions()

  // Only admin and finance can view all adjustments
  if (isAdmin || isFinance) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <GlobalAdjustmentsView />
      </div>
    )
  }

  return <AccessDenied message="You don't have permission to view global adjustments" />
}