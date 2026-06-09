// src/app/dashboard/[role]/branches/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import BranchesPage from "@/app/dashboard/admin/branches/page"

export default function DynamicBranchesPage() {
  const params = useParams()
  const currentRole = params.role as string
  
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <BranchesPage />
    </RoleGuard>
  )
}