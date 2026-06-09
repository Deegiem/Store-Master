// src/app/dashboard/[role]/procurement/rejected/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import RejectedOrdersPage from "@/app/dashboard/admin/procurement/rejected/page"

export default function DynamicRejectedOrdersPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance", "purchase"]}>
      <RejectedOrdersPage />
    </RoleGuard>
  )
}