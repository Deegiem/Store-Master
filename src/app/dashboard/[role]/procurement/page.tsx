// src/app/dashboard/[role]/procurement/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { useProcurementStore } from "@/store/useProcurementStore"
import ProcurementPage from "@/app/dashboard/admin/procurement/page"
import { useEffect, useRef } from "react"
import type { AppRole } from "@/lib/roleMapper"

export default function DynamicProcurementPage() {
  const params = useParams()
  const { role, userBranchId, isAdmin, isFinance, isPurchase, isManager } = usePermissions()
  const { profile } = useAuthStore()
  const { fetchAll, resetFilters } = useProcurementStore()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      
      resetFilters()
      
      if (isManager) {
        // Store Manager → only POs targeting their branch
        fetchAll({ branch_id: userBranchId })
      } else if (isPurchase) {
        // Purchase Manager → only POs they created
        fetchAll({ created_by: profile?.id })
      } else {
        // Admin/Finance: all POs
        fetchAll()
      }
    }
  }, [role, userBranchId, profile?.id, fetchAll, resetFilters, isManager, isPurchase, isAdmin, isFinance])

  // Allowed roles: admin, manager, finance, purchase (store is deprecated)
  const allowedRoles: AppRole[] = ["admin", "manager", "finance", "purchase"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <ProcurementPage />
    </RoleGuard>
  )
}