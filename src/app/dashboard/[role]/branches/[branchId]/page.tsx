// src/app/dashboard/[role]/branches/[branchId]/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import BranchDetailPage from "@/app/dashboard/admin/branches/[branchId]/page"

export default function DynamicBranchDetailPage() {
  const params = useParams()
  const currentRole = params.role as string
  const branchId = params.branchId as string
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <BranchDetailPage />
    </RoleGuard>
  )
}