// src/components/audit/AuditFilters.tsx
"use client"

import { motion } from "framer-motion"
import { Calendar, X } from "lucide-react"

interface AuditFiltersProps {
  modules: string[]
  actions: string[]
  roles: string[]
  selectedModule: string
  selectedAction: string
  selectedRole: string
  dateRange: { start: string; end: string }
  onModuleChange: (value: string) => void
  onActionChange: (value: string) => void
  onRoleChange: (value: string) => void
  onDateRangeChange: (range: { start: string; end: string }) => void
  onClear: () => void
}

export function AuditFilters({
  modules,
  actions,
  roles,
  selectedModule,
  selectedAction,
  selectedRole,
  dateRange,
  onModuleChange,
  onActionChange,
  onRoleChange,
  onDateRangeChange,
  onClear,
}: AuditFiltersProps) {
  const hasActiveFilters = selectedModule !== "all" || selectedAction !== "all" || selectedRole !== "all" || dateRange.start || dateRange.end

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden rounded-sm border border-slate-200 bg-white p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-900">Advanced Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1 text-xs text-[#003e9d] hover:underline"
          >
            <X className="h-3 w-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Module Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Module
          </label>
          <select
            value={selectedModule}
            onChange={(e) => onModuleChange(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          >
            {modules.map(module => (
              <option key={module} value={module}>
                {module === "all" ? "All Modules" : module}
              </option>
            ))}
          </select>
        </div>

        {/* Action Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Action Type
          </label>
          <select
            value={selectedAction}
            onChange={(e) => onActionChange(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          >
            {actions.map(action => (
              <option key={action} value={action}>
                {action === "all" ? "All Actions" : action}
              </option>
            ))}
          </select>
        </div>

        {/* Role Filter */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            User Role
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          >
            {roles.map(role => (
              <option key={role} value={role}>
                {role === "all" ? "All Roles" : role}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Date Range
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              className="flex-1 h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              className="flex-1 h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}