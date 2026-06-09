"use client"

import { Search, Filter, Calendar, Building2 } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"
import { usePermissions } from "@/hooks/usePermissions"
import { useBranchStore } from "@/store/useBranchStore"
import { useEffect } from "react"

export type PaymentMethodFilter = "all" | "Cash" | "Card" | "Bank Transfer" | "Mobile Money"

interface SalesFiltersProps {
  search: string
  setSearch: (value: string) => void
  startDate: string
  setStartDate: (value: string) => void
  endDate: string
  setEndDate: (value: string) => void
  paymentMethod: PaymentMethodFilter
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodFilter>>
  branchId: string
  setBranchId: (value: string) => void
}

const paymentOptions: Array<{ value: PaymentMethodFilter; label: string }> = [
  { value: "all", label: "All Methods" },
  { value: "Cash", label: "Cash" },
  { value: "Card", label: "Card" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "Mobile Money", label: "Mobile Money" },
]

export function SalesFilters({
  search,
  setSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  paymentMethod,
  setPaymentMethod,
  branchId,
  setBranchId,
}: SalesFiltersProps) {
  const { canViewAllBranches, userBranchId } = usePermissions()
  const { branches, fetchBranches } = useBranchStore()

  useEffect(() => {
    if (canViewAllBranches && branches.length === 0) {
      fetchBranches()
    }
  }, [canViewAllBranches, branches.length, fetchBranches])

  // For non-admin users, set branchId to their branch automatically
  useEffect(() => {
    if (!canViewAllBranches && userBranchId && !branchId) {
      setBranchId(userBranchId)
    }
  }, [canViewAllBranches, userBranchId, branchId, setBranchId])

  return (
    <div className="space-y-4 rounded-sm border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by sale number or cashier name..."
            className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethodFilter)}
            className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          >
            {paymentOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
            <span className="text-sm text-slate-500">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
        </div>

        {canViewAllBranches && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-400" />
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="h-11 min-w-[200px] rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  )
}