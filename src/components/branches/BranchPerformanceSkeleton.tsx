"use client"

export function BranchPerformanceSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2">
      <div className="mx-auto max-w-9xl space-y-6">
        {/* Header Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="mt-2 h-4 w-64 bg-slate-200 rounded" />
        </div>
        
        {/* Stats Cards Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-8 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        
        {/* Table Skeleton */}
        <div className="rounded-sm border border-slate-200 bg-white">
          <div className="p-5 border-b border-slate-200">
            <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="space-y-4 p-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}