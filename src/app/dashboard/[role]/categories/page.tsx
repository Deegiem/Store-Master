// src/app/dashboard/[role]/categories/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import CategoriesPage from "@/app/dashboard/admin/categories/page"

export default function DynamicCategoriesPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "purchase"]}>
      <CategoriesPage />
    </RoleGuard>
  )
}