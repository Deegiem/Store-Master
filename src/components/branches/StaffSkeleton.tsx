// src/components/branches/StaffSkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function StaffSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03 }}
          className="rounded-sm border border-slate-200 bg-white p-4"
        >
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 bg-slate-200 rounded-sm animate-pulse" />
            <div className="flex-1">
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 flex items-center gap-2">
                <div className="h-3 w-3 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-40 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-3 w-3 bg-slate-200 rounded animate-pulse" />
                <div className="h-5 w-16 bg-slate-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}