import React from "react"

interface ReportsFiltersProps {
  children?: React.ReactNode
}

export function ReportsFilters({ children }: ReportsFiltersProps) {
  return (
    <form className="flex flex-wrap items-center gap-3 rounded-sm border border-slate-200 bg-white p-4" method="get">
      <div className="flex gap-2 items-center">
        <label className="text-sm text-slate-600">From</label>
        <input name="from" type="date" className="h-10 rounded-sm border border-slate-200 bg-white px-3 text-sm text-slate-900" />
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-sm text-slate-600">To</label>
        <input name="to" type="date" className="h-10 rounded-sm border border-slate-200 bg-white px-3 text-sm text-slate-900" />
      </div>
      <div className="ml-auto">{children}</div>
    </form>
  )
}
