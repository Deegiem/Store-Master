// src/app/dashboard/admin/branches/[branchId]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { usePermissions } from "@/hooks/usePermissions"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Hash,
  Globe2,
  Users,
  Package,
  Settings,
  Power,
  Edit,
  Trash2
} from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import { BranchInfoCard } from "@/components/branches/BranchInfoCard"
import { BranchManagerCard } from "@/components/branches/BranchManagerCard"
import { BranchActionCard } from "@/components/branches/BranchActionCard"
import { EditBranchModal } from "@/components/branches/EditBranchModal"
import { ConfirmStatusModal } from "@/components/branches/ConfirmStatusModal"
import { BranchDetailSkeleton } from "@/components/branches/BranchDetailSkeleton"
import { AccessDenied } from "@/components/AccessDenied"

export default function BranchDetailPage() {
  const {
    canViewBranch,
    canUpdateBranch,
    canDeleteBranch,
  } = usePermissions()
  const { branchId } = useParams()
  const router = useRouter()
  const { selectedBranch, fetchBranchById, branchloading } = useBranchStore()
  const [editOpen, setEditOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (branchId) {
      fetchBranchById(branchId as string)
    }
  }, [branchId, fetchBranchById])

  if (branchloading.selectedBranch) {
    return <BranchDetailSkeleton />
  }

  if (!selectedBranch) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-12 text-center">
            <Building2 className="h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Branch Not Found</p>
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

  if (!canViewBranch(branchId as string)) {
    return <AccessDenied message="You don't have permission to view this branch" />
  }

  const actions = [
    {
      title: "Edit Branch",
      description: "Update branch information",
      icon: Edit,
      onClick: () => setEditOpen(true),
      color: "blue" as const,
    },
    {
      title: "Branch Staff",
      description: "View and manage staff",
      icon: Users,
      onClick: () => router.push(`/dashboard/admin/branches/${branchId}/staff`),
      color: "purple" as const,
    },
    {
      title: "Inventory",
      description: "View inventory summary",
      icon: Package,
      onClick: () => router.push(`/dashboard/admin/branches/${branchId}/inventory`),
      color: "green" as const,
    },
    {
      title: "Settings",
      description: "Configure branch settings",
      icon: Settings,
      onClick: () => router.push(`/dashboard/admin/branches/${branchId}/settings`),
      color: "slate" as const,
    },
    {
      title: selectedBranch.is_active ? "Deactivate" : "Activate",
      description: selectedBranch.is_active ? "Disable branch operations" : "Enable branch operations",
      icon: Power,
      onClick: () => setConfirmOpen(true),
      color: selectedBranch.is_active ? ("red" as const) : ("green" as const),
      danger: !selectedBranch.is_active ? false : true,
    },
  ]

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
              {selectedBranch.name}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Branch Operations Center
            </p>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid gap-5 lg:grid-cols-2">
          <BranchInfoCard branch={selectedBranch} />
          <BranchManagerCard branch={selectedBranch} />
        </div>

        {/* Action Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((action, index) => (
            <BranchActionCard
              key={action.title}
              {...action}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* Modals */}
        {canUpdateBranch && (
          <EditBranchModal
            open={editOpen}
            onClose={() => setEditOpen(false)}
            branch={selectedBranch}
          />
        )}
        {canDeleteBranch && (
          <ConfirmStatusModal
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            branch={selectedBranch}
          />
        )}
      </div>
    </div>
  )
}