// src/components/procurement/ProcurementSkeleton.tsx
"use client"

export function ProcurementSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
              <div className="mt-1 h-3 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
            <div className="h-6 w-24 bg-slate-200 rounded-full animate-pulse" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between">
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}