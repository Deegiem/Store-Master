// src/app/dashboard/[role]/products/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import ProductsPage from "@/app/dashboard/admin/products/page"

export default function DynamicProductsPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "purchase", "store", "sales"]}>
      <ProductsPage />
    </RoleGuard>
  )
}