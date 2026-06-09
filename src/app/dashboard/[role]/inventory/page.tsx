// src/app/dashboard/[role]/inventory/page.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Building2, Package, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
import { usePermissions } from "@/hooks/usePermissions"
import { useBranchStore } from "@/store/useBranchStore"
import { useAuthStore } from "@/store/useAuthStore"
import { AccessDenied } from "@/components/AccessDenied"
import { InventorySkeleton } from "@/components/inventory/InventorySkeleton"

export default function InventoryDashboardPage() {
  const router = useRouter()
  const { profile, isLoading: authLoading } = useAuthStore()
  const { isAdmin, isManager } = usePermissions()
  const { branches, fetchBranches, branchloading } = useBranchStore()

  useEffect(() => {
    if (!authLoading && isAdmin) {
      fetchBranches()
    }
  }, [fetchBranches, isAdmin, authLoading])

  // For manager, redirect directly to their assigned branch inventory
  useEffect(() => {
    if (!authLoading && isManager && profile?.branchId) {
      console.log("🔄 Redirecting manager to their branch:", profile.branchId)
      router.replace(`/dashboard/manager/inventory/${profile.branchId}`)
    }
  }, [isManager, profile?.branchId, router, authLoading])

  if (!isAdmin && !isManager) {
    return <AccessDenied message="You don't have permission to view inventory" />
  }

  // Show loading for manager redirect
  if (isManager) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <InventorySkeleton />
        </div>
      </div>
    )
  }

  // Admin view - show branch selector
  if (branchloading.branches) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <InventorySkeleton />
        </div>
      </div>
    )
  }

  const handleSelectBranch = (branchId: string) => {
    router.push(`/dashboard/admin/inventory/${branchId}`)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Package className="h-3.5 w-3.5" />
              Inventory Management
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Inventory Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select a branch to manage its inventory
            </p>
          </div>
        </motion.div>

        {/* Branch Grid */}
        {branches.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-sm border border-amber-200 bg-amber-50 p-12 text-center">
            <Building2 className="h-12 w-12 text-amber-400" />
            <p className="mt-4 text-sm font-medium text-amber-800">No Branches Found</p>
            <p className="mt-1 text-xs text-amber-600">
              Please create a branch before managing inventory.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectBranch(branch.id)}
                className="group cursor-pointer rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-[#003e9d]/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d]/10 to-[#0050c9]/10">
                      <Building2 className="h-6 w-6 text-[#003e9d]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{branch.name}</h3>
                      <p className="mt-0.5 font-mono text-xs text-slate-400">{branch.code}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#003e9d]" />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <p className="text-sm text-slate-600 line-clamp-2">{branch.address}</p>
                  </div>
                  {branch.phone && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3.5 w-3.5 text-slate-400" />
                      <p className="text-sm text-slate-600">{branch.phone}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-50">
                      <Package className="h-3 w-3 text-green-600" />
                    </div>
                    <span className="text-xs text-slate-500">Manage Stock</span>
                  </div>
                  <span className="text-xs text-[#003e9d] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Inventory →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}