// src/components/users/UsersSkeleton.tsx
"use client"

export function UsersSkeleton() {
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
          <div className="h-12 w-36 bg-slate-200 rounded animate-pulse" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-8 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Search Skeleton */}
        <div className="h-11 w-64 bg-slate-200 rounded animate-pulse" />

        {/* Profile Card Skeleton */}
        <div className="rounded-sm border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-slate-200 rounded animate-pulse" />
              <div>
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="mt-1 h-3 w-40 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-slate-200 rounded animate-pulse" />
              <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Users Grid Skeleton */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-slate-200 rounded animate-pulse" />
                  <div>
                    <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
                    <div className="mt-1 h-3 w-32 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}