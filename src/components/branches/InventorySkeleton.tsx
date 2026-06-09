// src/components/branches/InventorySkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function InventorySkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI Grid Skeleton */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-sm border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="mt-2 h-8 w-16 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-11 w-11 bg-slate-200 rounded-sm animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stock Health Card Skeleton */}
      <div className="rounded-sm border border-slate-200 bg-white p-5">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
        <div className="mt-4 space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-3">
            <div className="rounded-sm bg-slate-50 p-3">
              <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 h-6 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="rounded-sm bg-slate-50 p-3">
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 h-6 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}