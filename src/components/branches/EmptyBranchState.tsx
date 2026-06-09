// src/components/branches/EmptyBranchState.tsx
"use client"

import { Building2, Search } from "lucide-react"

interface EmptyBranchStateProps {
  searchTerm?: string
}

export function EmptyBranchState({ searchTerm }: EmptyBranchStateProps) {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
      {searchTerm ? (
        <>
          <Search className="h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">No branches found</p>
          <p className="mt-1 text-sm text-slate-500">
            No branches match "{searchTerm}"
          </p>
        </>
      ) : (
        <>
          <Building2 className="h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">No branches yet</p>
          <p className="mt-1 text-sm text-slate-500">Create your first branch to get started</p>
        </>
      )}
    </div>
  )
}