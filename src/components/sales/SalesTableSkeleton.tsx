"use client"

export function SalesTableSkeleton() {
  return (
    <div className="rounded-sm border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {[...Array(6)].map((_, i) => (
                <th key={i} className="px-5 py-4 text-left">
                  <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-slate-100">
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-5 py-4">
                    <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}