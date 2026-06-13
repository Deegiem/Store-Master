"use client"

import { motion } from "framer-motion"
import { UserCircle } from "lucide-react"

interface ProfileHeaderProps {
  title: string
  description?: string
  showEditButton?: boolean
  onEditClick?: () => void
}

export function ProfileHeader({ title, description, showEditButton = false, onEditClick }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9]">
            <UserCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
          </div>
        </div>
        
        {/* Edit Button - Now actually using showEditButton */}
        {showEditButton && onEditClick && (
          <button
            onClick={onEditClick}
            className="inline-flex items-center gap-2 rounded-sm border border-[#003e9d] px-4 py-2 text-sm font-semibold text-[#003e9d] transition hover:bg-[#003e9d]/5"
          >
            <UserCircle className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>
    </motion.div>
  )
}