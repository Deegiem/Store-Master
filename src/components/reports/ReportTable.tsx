"use client"

import React from "react"

interface ReportTableProps<T> {
  columns: { key: string; label: string }[]
  rows: T[]
  renderCell: (row: T, key: string) => React.ReactNode
  emptyMessage?: string
}

export function ReportTable<T>({ 
  columns, 
  rows, 
  renderCell, 
  emptyMessage = "No data available" 
}: ReportTableProps<T>) {
  if (!rows || rows.length === 0) {
    return (
      <div className="rounded-sm border border-slate-200 bg-white p-12 text-center">
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="rounded-sm border border-slate-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className="whitespace-nowrap px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="whitespace-nowrap px-5 py-4 text-slate-600">
                    {renderCell(row, col.key)}
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