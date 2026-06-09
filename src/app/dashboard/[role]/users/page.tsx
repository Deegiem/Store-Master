// src/app/dashboard/[role]/users/page.tsx
"use client"

import { useParams } from "next/navigation"
import { usePermissions } from "@/hooks/usePermissions"
import { RoleGuard } from "@/components/RoleGuard"
import UsersPage from "@/app/dashboard/admin/users/page"

export default function DynamicUsersPage() {
  const params = useParams()
  const { can } = usePermissions()
  const currentRole = params.role as string
  
  // Only admin can access users page
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <UsersPage />
    </RoleGuard>
  )
}