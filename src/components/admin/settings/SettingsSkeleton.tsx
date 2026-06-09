"use client"

export function SettingsSkeleton() {
  return (
    <div className="rounded-sm border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="p-6 space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
          </div>
        ))}
        <div className="flex gap-3 pt-4">
          <div className="h-10 w-24 bg-slate-200 rounded animate-pulse" />
          <div className="h-10 w-32 bg-slate-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}