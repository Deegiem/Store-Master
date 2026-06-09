// src/components/branches/BranchInfoCard.tsx
"use client"

import { motion } from "framer-motion"
import { Building2, MapPin, Phone, Hash, Globe2, Calendar } from "lucide-react"
import type { Branch } from "@/types/branch"

interface BranchInfoCardProps {
  branch: Branch
}

export function BranchInfoCard({ branch }: BranchInfoCardProps) {
  const infoItems = [
    { label: "Branch Code", value: branch.code, icon: Hash },
    { label: "Address", value: branch.address, icon: MapPin },
    { label: "Phone", value: branch.phone || "—", icon: Phone },
    { label: "Zones", value: branch.zones?.join(", ") || "—", icon: Globe2 },
    { label: "Created", value: new Date(branch.created_at).toLocaleDateString(), icon: Calendar },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
          <Building2 className="h-5 w-5 text-[#003e9d]" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Branch Information</h2>
          <p className="text-sm text-slate-500">Core operational details</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {infoItems.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <item.icon className="mt-0.5 h-4 w-4 text-slate-400" />
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-slate-900 break-words">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">Branch ID</span>
          <span className="font-mono text-xs text-slate-600">{branch.id}</span>
        </div>
      </div>
    </motion.div>
  )
}