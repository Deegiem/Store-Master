// src/app/dashboard/[role]/procurement/[poId]/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import ProcurementDetailPage from "@/app/dashboard/admin/procurement/[poId]/page"

export default function DynamicProcurementDetailPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance", "purchase", "store"]}>
      <ProcurementDetailPage />
    </RoleGuard>
  )
}