// src/app/dashboard/[role]/branches/[branchId]/staff/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import BranchStaffPage from "@/app/dashboard/admin/branches/[branchId]/staff/page"

export default function DynamicBranchStaffPage() {
  const params = useParams()
  const currentRole = params.role as string
  
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <BranchStaffPage />
    </RoleGuard>
  )
}