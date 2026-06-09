// src/components/audit/AuditSkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function AuditSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="mt-3 h-8 w-64 bg-slate-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-96 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-8 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Search Skeleton */}
        <div className="h-11 w-full bg-slate-200 rounded animate-pulse" />

        {/* Table Skeleton */}
        <div className="rounded-sm border border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="flex-1 h-4 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}