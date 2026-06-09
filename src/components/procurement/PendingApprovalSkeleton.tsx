// src/components/procurement/PendingApprovalSkeleton.tsx
"use client"

export function PendingApprovalSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded animate-pulse" />
                <div>
                  <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-1 h-4 w-32 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-10 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}