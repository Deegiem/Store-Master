// src/components/procurement/ProcurementDetailSkeleton.tsx
"use client"

export function ProcurementDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 bg-slate-200 rounded animate-pulse" />
          <div>
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
            <div className="mt-1 h-4 w-32 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-slate-200 rounded animate-pulse" />
                <div>
                  <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-1 h-4 w-24 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}