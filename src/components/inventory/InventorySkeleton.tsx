// src/components/inventory/InventorySkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function InventorySkeleton() {
  return (
    <div className="space-y-4">
      {/* Stats Skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-sm border border-slate-200 bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <div className="h-8 w-8 rounded-sm bg-slate-200 animate-pulse" />
            </div>
            <div className="mt-3 h-8 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="mt-1 h-3 w-20 bg-slate-200 rounded animate-pulse" />
          </motion.div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-sm border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 p-4">
          <div className="h-4 w-full max-w-md bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="divide-y divide-slate-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="h-10 w-10 rounded-sm bg-slate-200 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-48 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="h-8 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-28 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}