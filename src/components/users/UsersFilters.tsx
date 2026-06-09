// src/components/users/UsersFilters.tsx
"use client"

interface UsersFiltersProps {
  roleFilter: string
  statusFilter: string
  onRoleChange: (value: string) => void
  onStatusChange: (value: string) => void
}

const roles = ["all", "admin", "manager", "finance", "purchase", "store", "sales"]
const statuses = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
]

export function UsersFilters({
  roleFilter,
  statusFilter,
  onRoleChange,
  onStatusChange,
}: UsersFiltersProps) {
  return (
    <div className="flex gap-2">
      <select
        value={roleFilter}
        onChange={(e) => onRoleChange(e.target.value)}
        className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
      >
        {roles.map(role => (
          <option key={role} value={role}>
            {role === "all" ? "All Roles" : role.charAt(0).toUpperCase() + role.slice(1)}
          </option>
        ))}
      </select>

      <div className="flex gap-2 rounded-sm border border-slate-200 bg-white p-1">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusChange(status.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all ${
              statusFilter === status.value
                ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-[0_2px_4px_rgba(0,71,195,0.2)]"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  )
}