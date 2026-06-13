"use client"

import { RoleGuard } from "@/components/RoleGuard"
import BranchPerformancePage from "@/app/dashboard/admin/branches/performance/page"
import type { AppRole } from "@/lib/roleMapper"

export default function DynamicBranchPerformancePage() {
  const allowedRoles: AppRole[] = ["admin", "finance"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <BranchPerformancePage />
    </RoleGuard>
  )
}