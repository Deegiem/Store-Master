"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import UserAuditListPage from "@/app/dashboard/admin/user-audit/page"
import type { AppRole } from "@/lib/roleMapper"

export default function DynamicUserAuditDetailPage() {
  const params = useParams()
  const currentRole = params.role as string
  
  const allowedRoles: AppRole[] = ["admin"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <UserAuditListPage />
    </RoleGuard>
  )
}