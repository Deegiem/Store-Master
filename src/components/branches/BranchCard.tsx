// src/components/branches/BranchCard.tsx
"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Building2, MapPin, Phone, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import type { Branch } from "@/types/branch"

interface BranchCardProps {
  branch: Branch
  delay: number
}

export function BranchCard({ branch, delay }: BranchCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={() => router.push(`/dashboard/admin/branches/${branch.id}`)}
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
        <ChevronRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-[#003e9d]" />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-3.5 w-3.5 text-slate-400" />
          <p className="text-sm text-slate-600 line-clamp-2">{branch.address}</p>
        </div>
        {branch.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-slate-400" />
            <p className="text-sm text-slate-600">{branch.phone}</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {branch.is_active ? (
            <>
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-medium text-green-700">Active</span>
            </>
          ) : (
            <>
              <XCircle className="h-3.5 w-3.5 text-red-600" />
              <span className="text-xs font-medium text-red-700">Inactive</span>
            </>
          )}
        </div>
        {branch.zones && branch.zones.length > 0 && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400">Zones:</span>
            <span className="text-xs font-medium text-slate-600">
              {branch.zones.slice(0, 2).join(", ")}
              {branch.zones.length > 2 && ` +${branch.zones.length - 2}`}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  )
}