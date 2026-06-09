// src/app/dashboard/admin/branches/[branchId]/staff/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Users, Mail, Briefcase, Search } from "lucide-react"
import { useBranchStore } from "@/store/useBranchStore"
import { StaffCard } from "@/components/branches/StaffCard"
import { StaffSkeleton } from "@/components/branches/StaffSkeleton"

export default function BranchStaffPage() {
  const { branchId } = useParams()
  const router = useRouter()
  const { branchStaff, fetchBranchStaff, branchloading } = useBranchStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (branchId) fetchBranchStaff(branchId as string)
  }, [branchId, fetchBranchStaff])

  const staff = branchStaff?.staff || []
  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
              <Users className="h-3.5 w-3.5" />
              Branch Personnel
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Branch Staff
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {branchStaff?.branch_name || "Branch"} staff members
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
        </div>

        {/* Content */}
        {branchloading.branchStaff ? (
          <StaffSkeleton />
        ) : filteredStaff.length === 0 ? (
          <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
            <Users className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">No staff found</p>
            <p className="mt-1 text-sm text-slate-500">
              {searchTerm ? "No staff match your search" : "No staff assigned to this branch yet"}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500">
              Showing {filteredStaff.length} of {staff.length} staff members
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStaff.map((staffMember, index) => (
                <StaffCard key={staffMember.user_id} staff={staffMember} delay={index * 0.05} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}