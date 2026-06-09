"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import UserAuditDetailPage from "@/app/dashboard/admin/user-audit/[userId]/page"
import type { AppRole } from "@/lib/roleMapper"

interface PageProps {
  params: Promise<{ userId: string }>
}

export default function DynamicUserAuditDetailPage({ params }: PageProps) {
  const allowedRoles: AppRole[] = ["admin"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <UserAuditDetailPage params={params} />
    </RoleGuard>
  )
}