// src/app/dashboard/[role]/products/[productId]/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import ProductDetailsPage from "@/app/dashboard/admin/products/[productId]/page"

export default function DynamicProductDetailsPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "purchase", "store"]}>
      <ProductDetailsPage />
    </RoleGuard>
  )
}