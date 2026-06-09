// src/app/dashboard/[role]/products/[productId]/price-history/page.tsx
"use client"

import { RoleGuard } from "@/components/RoleGuard"
import PriceHistoryPage from "@/app/dashboard/admin/products/[productId]/price-history/page"

export default function DynamicPriceHistoryPage() {
  return (
    <RoleGuard allowedRoles={["admin", "manager", "purchase"]}>
      <PriceHistoryPage />
    </RoleGuard>
  )
}