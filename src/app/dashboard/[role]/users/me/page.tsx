// src/app/dashboard/[role]/users/me/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import MyProfilePage from "@/app/dashboard/admin/users/me/page"

export default function DynamicMyProfilePage() {
  const params = useParams()
  const currentRole = params.role as string
  
  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance", "purchase", "store", "sales"]}>
      <MyProfilePage />
    </RoleGuard>
  )
}