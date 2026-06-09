// src/app/dashboard/admin/procurement/[poId]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Building2, User, CheckCircle, XCircle, Truck, Package, Calendar, DollarSign } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { ProcurementItemsTable } from "@/components/procurement/ProcurementItemsTable"
import { ProcurementStatusBadge } from "@/components/procurement/ProcurementStatusBadge"
import { ProcurementDetailSkeleton } from "@/components/procurement/ProcurementDetailSkeleton"
import { ActionButtons } from "@/components/procurement/ActionButtons"
import { InfoCard } from "@/components/procurement/InfoCard"

export default function ProcurementDetailPage() {
  const { poId } = useParams()
  const router = useRouter()
  const { selectedPO, fetchById, loading } = useProcurementStore()

  useEffect(() => {
    if (poId) {
      fetchById(poId as string)
    }
  }, [poId, fetchById])

  if (loading.detail) {
    return <ProcurementDetailSkeleton />
  }

  if (!selectedPO) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
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

  const infoCards = [
    { label: "Branch", value: selectedPO.target_branch.name, icon: Building2 },
    { label: "Created By", value: selectedPO.created_by, icon: User },
    { label: "Approved By", value: selectedPO.approved_by || "Not approved", icon: CheckCircle },
    { label: "Created At", value: new Date(selectedPO.created_at).toLocaleDateString(), icon: Calendar },
    { label: "Total Amount", value: `₦${selectedPO.total_amount.toLocaleString()}`, icon: DollarSign },
  ]

  const canApprove = selectedPO.status === "Pending Approval"
  const canReject = selectedPO.status === "Pending Approval"
  const canReceive = selectedPO.status === "Approved"

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
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
              {selectedPO.supplier.name}
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

        {/* Action Buttons */}
        {(canApprove || canReject || canReceive) && (
          <ActionButtons
            canApprove={canApprove}
            canReject={canReject}
            canReceive={canReceive}
            poId={selectedPO.po_id}
          />
        )}

        {/* Items Table */}
        <ProcurementItemsTable items={selectedPO.items} />
      </div>
    </div>
  )
}