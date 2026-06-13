"use client"

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-64 bg-slate-200 rounded animate-pulse" />
      </div>

      {/* Profile Sections Skeleton */}
      {[1, 2, 3].map((section) => (
        <div key={section} className="overflow-hidden rounded-sm border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3].map((field) => (
              <div key={field} className="flex items-start gap-4 px-6 py-4">
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Status Badge Skeleton */}
      <div className="flex items-center justify-between rounded-sm border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-slate-200 rounded-full animate-pulse" />
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
        <div className="text-right space-y-1">
          <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Edit Button Skeleton */}
      <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
    </div>
  )
}