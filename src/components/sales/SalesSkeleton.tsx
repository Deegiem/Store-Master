import React from "react"

interface SalesSkeletonProps {
  title?: string
}

export function SalesSkeleton({ title = "Loading" }: SalesSkeletonProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-sm border border-slate-200 bg-white p-6">
          <p className="h-5 w-48 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="h-6 w-32 animate-pulse rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
