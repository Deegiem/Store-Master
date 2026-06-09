"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useSalesStore } from "@/store/saleStore"
import { SaleDetailCard } from "@/components/sales/SaleDetailCard"
import { SalesTableSkeleton } from "@/components/sales/SalesTableSkeleton"
import { EmptySalesState } from "@/components/sales/EmptySalesState"
import type { AppRole } from "@/lib/roleMapper"

export default function SaleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const saleId = params.saleId as string
  const { userBranchId, canViewAllBranches } = usePermissions()
  const { selectedSale, fetchSaleDetail, loading } = useSalesStore()

  useEffect(() => {
    if (saleId) {
      const branchFilter = canViewAllBranches ? undefined : userBranchId
      fetchSaleDetail(saleId, branchFilter)
    }
  }, [saleId, userBranchId, canViewAllBranches, fetchSaleDetail])

  const allowedRoles: AppRole[] = ["admin", "manager", "sales"]

  return (
    <RoleGuard allowedRoles={allowedRoles}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sales
          </button>

          {/* Sale Details */}
          {loading.saleDetail ? (
            <SalesTableSkeleton />
          ) : selectedSale ? (
            <SaleDetailCard 
              sale={selectedSale} 
              onCancel={() => {
                // Refresh the current sale after cancellation
                const branchFilter = canViewAllBranches ? undefined : userBranchId
                fetchSaleDetail(saleId, branchFilter)
              }}
            />
          ) : (
            <EmptySalesState message="Sale not found" />
          )}
        </div>
      </div>
    </RoleGuard>
  )
}