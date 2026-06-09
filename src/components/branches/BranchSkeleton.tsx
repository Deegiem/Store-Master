// src/components/branches/BranchSkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function BranchSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-sm bg-slate-200 animate-pulse" />
              <div>
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="mt-1 h-3 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-5 w-5 bg-slate-200 rounded animate-pulse" />
          </div>

          {/* Address */}
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <div className="h-3.5 w-3.5 bg-slate-200 rounded animate-pulse" />
              <div className="flex-1 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-12 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}