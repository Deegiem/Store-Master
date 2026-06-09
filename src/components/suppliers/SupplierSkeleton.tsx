// src/components/suppliers/SupplierSkeleton.tsx
"use client"

export function SupplierSkeleton() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="mt-2 h-8 w-16 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="h-11 w-full bg-slate-200 rounded animate-pulse" />
        <div className="rounded-sm border border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-200 rounded animate-pulse" />
                <div className="flex-1 h-4 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}