// src/components/user-audit/EmptyUserState.tsx
"use client"

import { Users, Search } from "lucide-react"

interface EmptyUserStateProps {
  searchTerm?: string
}

export function EmptyUserState({ searchTerm }: EmptyUserStateProps) {
  return (
    <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
      {searchTerm ? (
        <>
          <Search className="h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">No users found</p>
          <p className="mt-1 text-sm text-slate-500">
            No users match "{searchTerm}"
          </p>
        </>
      ) : (
        <>
          <Users className="h-12 w-12 text-slate-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">No users available</p>
          <p className="mt-1 text-sm text-slate-500">User list will appear here</p>
        </>
      )}
    </div>
  )
}