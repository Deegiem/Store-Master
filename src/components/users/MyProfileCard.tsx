// src/components/users/MyProfileCard.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserCircle, Mail, Briefcase, Building2, Edit } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { UpdateProfileForm } from "@/components/users/UpdateProfileForm"

export function MyProfileCard() {
  const { currentUser, loading } = useUserStore()
  const [showEdit, setShowEdit] = useState(false)

  if (loading.currentUser) {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-4 w-48 bg-slate-200 rounded" />
          <div className="h-4 w-40 bg-slate-200 rounded" />
        </div>
      </div>
    )
  }

  if (!currentUser) return null

  const infoItems = [
    { label: "Name", value: `${currentUser.first_name} ${currentUser.last_name}`, icon: UserCircle },
    { label: "Email", value: currentUser.email, icon: Mail },
    { label: "Role", value: currentUser.role, icon: Briefcase },
    { label: "Branch", value: currentUser.branch_name || "Not Assigned", icon: Building2 },
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-slate-200 bg-white overflow-hidden"
      >
        {/* Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                <UserCircle className="h-5 w-5 text-[#003e9d]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">My Profile</h2>
                <p className="text-sm text-slate-500">Your personal information</p>
              </div>
            </div>
            <button
              onClick={() => setShowEdit(true)}
              className="inline-flex items-center gap-1 rounded-sm px-3 py-1.5 text-sm text-[#003e9d] transition hover:bg-slate-100"
            >
              <Edit className="h-3.5 w-3.5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#F3F4F6]">
                  <item.icon className="h-4 w-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-slate-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <UpdateProfileForm open={showEdit} onClose={() => setShowEdit(false)} />
    </>
  )
}