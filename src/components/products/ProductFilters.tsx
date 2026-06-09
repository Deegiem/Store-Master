// src/components/products/ProductFilters.tsx
"use client"

import { Search, Filter } from "lucide-react"
import type { Category } from "@/types/category"

interface Props {
  search: string
  setSearch: (value: string) => void
  categoryId: string
  setCategoryId: (value: string) => void
  unpricedOnly: boolean
  setUnpricedOnly: (value: boolean) => void
  categories: Category[]
}

export default function ProductFilters({
  search,
  setSearch,
  categoryId,
  setCategoryId,
  unpricedOnly,
  setUnpricedOnly,
  categories,
}: Props) {
  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* SEARCH */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Search Product
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or SKU..."
              className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* UNPRICED FILTER */}
        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-slate-200 bg-[#F3F4F6] px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            <input
              type="checkbox"
              checked={unpricedOnly}
              onChange={(e) => setUnpricedOnly(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-[#003e9d] focus:ring-[#003e9d]"
            />
            Show Unpriced Only
          </label>
        </div>

        {/* FILTER HINT */}
        <div className="hidden items-end lg:flex">
          <p className="text-xs text-slate-400">
            <Filter className="mr-1 inline h-3 w-3" />
            Apply filters to narrow results
          </p>
        </div>
      </div>
    </div>
  )
}