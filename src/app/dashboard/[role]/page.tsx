"use client"

import { useParams } from "next/navigation"
import { usePermissions } from "@/hooks/usePermissions"
import dynamic from "next/dynamic"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"

// Dynamic imports with proper loading fallbacks
const AdminDashboardPage = dynamic(() => import("@/app/dashboard/admin/page"), {
  loading: () => <DashboardSkeleton title="Admin Dashboard" />,
})
const FinanceDashboardPage = dynamic(() => import("@/app/dashboard/finance/page"), {
  loading: () => <DashboardSkeleton title="Finance Dashboard" />,
})
const PurchaseDashboardPage = dynamic(() => import("@/app/dashboard/purchase/page"), {
  loading: () => <DashboardSkeleton title="Purchase Dashboard" />,
})
const StoreManagerDashboardPage = dynamic(() => import("@/app/dashboard/manager/page"), {
  loading: () => <DashboardSkeleton title="Store Manager Dashboard" />,
})
const StoreStaffDashboardPage = dynamic(() => import("@/app/dashboard/store/page"), {
  loading: () => <DashboardSkeleton title="Store Staff Dashboard" />,
})
const SalesStaffDashboardPage = dynamic(() => import("@/app/dashboard/sales/page"), {
  loading: () => <DashboardSkeleton title="Sales Dashboard" />,
})

export default function RoleDashboard() {
  const params = useParams()
  const currentRole = params.role as string

  // Route to the appropriate dashboard based on role
  switch (currentRole) {
    case "admin":
      return <AdminDashboardPage />
    case "finance":
      return <FinanceDashboardPage />
    case "purchase":
      return <PurchaseDashboardPage />
    case "manager":
      return <StoreManagerDashboardPage />
    case "store":
      return <StoreStaffDashboardPage />
    case "sales":
      return <SalesStaffDashboardPage />
    default:
      return <AdminDashboardPage />
  }
}