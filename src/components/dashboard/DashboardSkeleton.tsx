// src/components/dashboard/DashboardSkeleton.tsx
"use client"

import { motion } from "framer-motion"

interface DashboardSkeletonProps {
  title: string
}

export function DashboardSkeleton({ title }: DashboardSkeletonProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="mt-3 h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-80 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="h-11 w-36 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 bg-slate-200 rounded-sm animate-pulse" />
                <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
              </div>
              <div className="mt-3 h-8 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 h-3 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}