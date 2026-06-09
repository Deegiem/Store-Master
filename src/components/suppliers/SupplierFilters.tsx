// src/components/suppliers/SupplierFilters.tsx
"use client"

interface SupplierFiltersProps {
  statusFilter: string
  onStatusChange: (value: string) => void
}

export function SupplierFilters({ statusFilter, onStatusChange }: SupplierFiltersProps) {
  const filters = [
    { value: "all", label: "All Suppliers" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]

  return (
    <div className="flex gap-2 rounded-sm border border-slate-200 bg-white p-1">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onStatusChange(filter.value)}
          className={`px-4 py-1.5 text-sm font-medium rounded-sm transition-all ${
            statusFilter === filter.value
              ? "bg-gradient-to-r from-[#003e9d] to-[#0050c9] text-white shadow-[0_2px_4px_rgba(0,71,195,0.2)]"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}