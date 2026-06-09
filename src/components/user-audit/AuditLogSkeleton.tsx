// src/components/user-audit/AuditLogSkeleton.tsx
"use client"

export function AuditLogSkeleton() {
  return (
    <div className="p-5 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          <div className="flex-1 h-4 bg-slate-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}