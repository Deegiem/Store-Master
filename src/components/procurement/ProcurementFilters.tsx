// src/components/procurement/ProcurementFilters.tsx
"use client"

import { Search, Filter } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import type { POStatus } from "@/types/procurement"

type ProcurementStatusFilter = POStatus | "all"

interface ProcurementFiltersProps {
  search: string
  setSearch: (value: string) => void
  status: ProcurementStatusFilter
  setStatus: Dispatch<SetStateAction<ProcurementStatusFilter>>
}

const statusOptions: Array<{ value: ProcurementStatusFilter; label: string }> = [
  { value: "all", label: "All Status" },
  { value: "Pending Approval", label: "Pending Approval" },
  { value: "Approved", label: "Approved" },
  { value: "Rejected", label: "Rejected" },
  { value: "Received", label: "Received" },
]

export function ProcurementFilters({ search, setSearch, status, setStatus }: ProcurementFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by supplier or branch..."
          className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        />
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProcurementStatusFilter)}
          className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
