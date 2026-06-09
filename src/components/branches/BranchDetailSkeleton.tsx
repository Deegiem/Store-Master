// src/components/branches/BranchDetailSkeleton.tsx
"use client"

import { motion } from "framer-motion"

export function BranchDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 bg-slate-200 rounded-sm animate-pulse" />
          <div>
            <div className="h-8 w-64 bg-slate-200 rounded animate-pulse" />
            <div className="mt-1 h-4 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Branch Info Card Skeleton */}
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="h-10 w-10 bg-slate-200 rounded-sm animate-pulse" />
              <div>
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="mt-1 h-3 w-40 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-4 w-4 bg-slate-200 rounded animate-pulse mt-0.5" />
                  <div className="flex-1">
                    <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                    <div className="mt-1 h-4 w-full bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Branch Manager Card Skeleton */}
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded-sm animate-pulse" />
                <div>
                  <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-1 h-3 w-36 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="h-8 w-20 bg-slate-200 rounded-sm animate-pulse" />
            </div>
            <div className="mt-4">
              <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-slate-200 bg-slate-50 p-6">
                <div className="h-12 w-12 bg-slate-200 rounded-full animate-pulse" />
                <div className="mt-2 h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="mt-1 h-3 w-40 bg-slate-200 rounded animate-pulse" />
                <div className="mt-3 h-8 w-28 bg-slate-200 rounded-sm animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-11 w-11 bg-slate-200 rounded-sm animate-pulse" />
              <div className="mt-4 h-5 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 h-3 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}