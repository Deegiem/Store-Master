// src/app/dashboard/[role]/procurement/pending-approval/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import PendingApprovalPage from "@/app/dashboard/admin/procurement/pending-approval/page"

export default function DynamicPendingApprovalPage() {
  const params = useParams()
  const currentRole = params.role as string
  
  // Only Finance Manager can access pending approvals
  return (
    <RoleGuard allowedRoles={["finance", "admin", "purchase"]}>
      <PendingApprovalPage />
    </RoleGuard>
  )
}