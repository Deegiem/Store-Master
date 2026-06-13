"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, User, CheckCircle, Package, Calendar, DollarSign } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { ProcurementItemsTable } from "@/components/procurement/ProcurementItemsTable"
import { ProcurementStatusBadge } from "@/components/procurement/ProcurementStatusBadge"
import { ProcurementDetailSkeleton } from "@/components/procurement/ProcurementDetailSkeleton"
import { ActionButtons } from "@/components/procurement/ActionButtons"
import { InfoCard } from "@/components/procurement/InfoCard"
import { AccessDenied } from "@/components/AccessDenied"

export default function ProcurementDetailPage() {
  const { poId } = useParams()
  const router = useRouter()
  const { selectedPO, fetchById, loading } = useProcurementStore()
  const { profile } = useAuthStore()
  const {
    isAdmin,
    isFinance,
    isPurchase,
    isManager,
    isStore,
    userBranchId,
    role
  } = usePermissions()

  useEffect(() => {
    if (poId) {
      console.log('🔍 Fetching PO:', poId)
      fetchById(poId as string)
    }
  }, [poId, fetchById])

  // Check if user has permission to view this PO
  const canViewPO = () => {
    if (!selectedPO) return false

    // Admin and Finance can view all
    if (isAdmin || isFinance) return true

    // Purchase Manager can only view POs they created
    if (isPurchase) {
      const userId = profile?.id
      // created_by is a string (user ID) in ProcurementDetail type
      return selectedPO.created_by === userId
    }

    // Store Manager can only view POs targeting their branch
    if (isManager || isStore) {
      const branchId = selectedPO.target_branch?.id
      return branchId === userBranchId
    }

    return false
  }

  // Determine action permissions based on role AND status
  const canApprove = selectedPO?.status === "Pending Approval" && (isAdmin || isFinance)
  const canReject = selectedPO?.status === "Pending Approval" && (isAdmin || isFinance)
  const canReceive = selectedPO?.status === "Approved" && (isAdmin || isManager || isStore)

  if (loading.detail) {
    return <ProcurementDetailSkeleton />
  }

  if (!selectedPO) {
    return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-12 text-center">
            <Package className="h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Purchase Order Not Found</p>
            <button
              onClick={() => router.back()}
              className="mt-4 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Check view permission after data is loaded
  if (!canViewPO()) {
    return <AccessDenied message="You don't have permission to view this purchase order" />
  }

  const infoCards = [
    { label: "Branch", value: selectedPO.target_branch?.name || "N/A", icon: Building2 },
    { label: "Created By", value: selectedPO.created_by || "N/A", icon: User },
    { label: "Approved By", value: selectedPO.approved_by || "Not approved", icon: CheckCircle },
    { label: "Created At", value: new Date(selectedPO.created_at).toLocaleDateString(), icon: Calendar },
    { label: "Total Amount", value: `₦${selectedPO.total_amount?.toLocaleString() || 0}`, icon: DollarSign },
  ]

  // Map items correctly - use ordered_quantity
  const itemsForReceiving = selectedPO?.items?.map(item => ({
    product_id: item.product_id,
    quantity: item.ordered_quantity
  })) || []

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => router.back()}
            className="rounded-sm p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Purchase Order
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {selectedPO.supplier?.name || "Unknown Supplier"}
            </p>
          </div>
          <div className="ml-auto">
            <ProcurementStatusBadge status={selectedPO.status} />
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {infoCards.map((card, index) => (
            <InfoCard key={card.label} {...card} delay={index * 0.05} />
          ))}
        </div>

        {/* Action Buttons - Only show if user has permission */}
        {(canApprove || canReject || canReceive) && (
          <ActionButtons
            canApprove={canApprove}
            canReject={canReject}
            canReceive={canReceive}
            poId={selectedPO.po_id}
            items={itemsForReceiving}
          />
        )}

        {/* Items Table */}
        <ProcurementItemsTable items={selectedPO.items || []} />
      </div>
    </div>
  )
}