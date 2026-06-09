// src/app/dashboard/[role]/suppliers/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import SuppliersPage from "@/app/dashboard/admin/suppliers/page"

export default function DynamicSuppliersPage() {
  return (
    <RoleGuard allowedRoles={["admin", "purchase"]}>
      <SuppliersPage />
    </RoleGuard>
  )
}