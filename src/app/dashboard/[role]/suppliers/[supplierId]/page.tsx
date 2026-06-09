// src/app/dashboard/[role]/suppliers/[supplierId]/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import SupplierDetailsPage from "@/app/dashboard/admin/suppliers/[supplierId]/page"

export default function DynamicSupplierDetailsPage() {
  return (
    <RoleGuard allowedRoles={["admin", "purchase"]}>
      <SupplierDetailsPage />
    </RoleGuard>
  )
}