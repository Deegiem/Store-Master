// src/components/user-audit/UserAuditSkeleton.tsx
"use client"

export function UserAuditSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="rounded-sm border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-sm bg-slate-200 animate-pulse" />
              <div>
                <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                <div className="mt-1 h-3 w-32 bg-slate-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-5 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}