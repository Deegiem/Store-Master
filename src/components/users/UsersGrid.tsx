// src/components/users/UsersGrid.tsx
"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { UsersProfileCard } from "@/components/users/UsersProfileCard"
import type { User } from "@/types/user"

interface UsersGridProps {
  users: User[]
  onUserUpdate: () => void
}

export function UsersGrid({ users, onUserUpdate }: UsersGridProps) {
  if (users.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
        <Users className="h-12 w-12 text-slate-400" />
        <p className="mt-4 text-lg font-semibold text-slate-900">No users found</p>
        <p className="mt-1 text-sm text-slate-500">Create a user to get started</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {users.map((user, index) => (
        <UsersProfileCard
          key={user.user_id}
          user={user}
          onUserUpdate={onUserUpdate}
          delay={index * 0.05}
        />
      ))}
    </div>
  )
}