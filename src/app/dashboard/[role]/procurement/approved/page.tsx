// src/app/dashboard/[role]/procurement/approved/page.tsx
"use client"

import { useParams } from "next/navigation"
import { RoleGuard } from "@/components/RoleGuard"
import ApprovedOrdersPage from "@/app/dashboard/admin/procurement/approved/page"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { useProcurementStore } from "@/store/useProcurementStore"
import { useEffect, useRef } from "react"
import type { AppRole } from "@/lib/roleMapper"

export default function DynamicApprovedOrdersPage() {
  const params = useParams()
  const { role, userBranchId, isPurchase, isManager, isStore, isAdmin, isFinance } = usePermissions()
  const { profile } = useAuthStore()
  const { fetchAll, resetFilters } = useProcurementStore()
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      
      resetFilters()
      
      if (isManager || isStore) {
        // Store roles: filter by branch and status
        fetchAll({ branch_id: userBranchId, status: "Approved" })
      } else if (isPurchase) {
        // Purchase Manager: filter by created_by and status
        fetchAll({ created_by: profile?.id, status: "Approved" })
      } else {
        // Admin/Finance: filter by status only
        fetchAll({ status: "Approved" })
      }
    }
  }, [role, userBranchId, profile?.id, fetchAll, resetFilters, isManager, isStore, isPurchase, isAdmin, isFinance])

  const allowedRoles: AppRole[] = ["admin", "manager", "finance", "purchase", "store"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <ApprovedOrdersPage />
    </RoleGuard>
  )
}