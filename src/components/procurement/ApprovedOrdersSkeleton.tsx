// src/components/procurement/ApprovedOrdersSkeleton.tsx
"use client"

export function ApprovedOrdersSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse" />
        
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-8 w-20 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-1 h-3 w-20 bg-slate-200 rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-slate-200 rounded-full animate-pulse" />
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}