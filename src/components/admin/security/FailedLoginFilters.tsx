"use client"

import { Calendar, RefreshCw } from "lucide-react"
import { useState } from "react"

interface FailedLoginFiltersProps {
  hours: number
  setHours: (hours: number) => void
  onRefresh: () => void
  isLoading: boolean
}

const hourOptions = [
  { label: "Last 24 Hours", value: 24 },
  { label: "Last 48 Hours", value: 48 },
  { label: "Last 7 Days", value: 168 },
  { label: "Last 30 Days", value: 720 },
  { label: "Last 90 Days", value: 2160 },
]

export function FailedLoginFilters({ hours, setHours, onRefresh, isLoading }: FailedLoginFiltersProps) {
  const [customHours, setCustomHours] = useState<string>("")

  const handleCustomHours = () => {
    const numHours = parseInt(customHours)
    if (!isNaN(numHours) && numHours > 0) {
      setHours(numHours)
      setCustomHours("")
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Calendar className="h-4 w-4 text-slate-400" />
        <div className="flex flex-wrap gap-2">
          {hourOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setHours(option.value)}
              className={`rounded-sm px-3 py-1.5 text-sm font-medium transition ${
                hours === option.value
                  ? "bg-[#003e9d] text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={customHours}
              onChange={(e) => setCustomHours(e.target.value)}
              placeholder="Custom hours"
              className="w-32 rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
            <button
              onClick={handleCustomHours}
              className="rounded-sm border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        Refresh
      </button>
    </div>
  )
}