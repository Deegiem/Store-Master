// src/app/dashboard/admin/users/page.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, Search, Filter } from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { useAuthStore } from "@/store/useAuthStore"
import { MyProfileCard } from "@/components/users/MyProfileCard"
import { UsersGrid } from "@/components/users/UsersGrid"
import { CreateUserModal } from "@/components/users/CreateUserModal"
import { UsersSkeleton } from "@/components/users/UsersSkeleton"
import { UsersStats } from "@/components/users/UsersStats"
import { UsersFilters } from "@/components/users/UsersFilters"

export default function UsersPage() {
  const { users, fetchUsers, fetchCurrentUser, loading, error } = useUserStore()
  const { isAuthenticated } = useAuthStore()
  const [creating, setCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser()
      fetchUsers()
    }
  }, [isAuthenticated, fetchCurrentUser, fetchUsers])

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !searchTerm ||
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "active" && user.is_active) ||
      (statusFilter === "inactive" && !user.is_active)
    
    return matchesSearch && matchesRole && matchesStatus
  }) || []

  if (!isAuthenticated) {
    return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-center justify-center rounded-sm border border-amber-200 bg-amber-50 p-12 text-center">
            <p className="text-amber-600">Please log in to access this page</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading.users || loading.currentUser) {
    return <UsersSkeleton />
  }

  if (error.users || error.currentUser) {
    return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-12 text-center">
            <p className="text-red-600">System error loading users</p>
          </div>
        </div>
      </div>
    )
  }

  const activeUsers = users?.filter(u => u.is_active).length || 0
  const inactiveUsers = users?.filter(u => !u.is_active).length || 0

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Users className="h-3.5 w-3.5" />
              Access Management
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Manage Users
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Control user access, roles, and permissions
            </p>
          </div>

          <button
            onClick={() => setCreating(true)}
            className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          >
            <UserPlus className="h-4 w-4" />
            Create User
          </button>
        </motion.div>

        {/* Stats */}
        <UsersStats
          total={users?.length || 0}
          active={activeUsers}
          inactive={inactiveUsers}
        />

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
          <UsersFilters
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            onRoleChange={setRoleFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredUsers.length} of {users?.length || 0} users
          </p>
        </div>

        {/* My Profile Section */}
        <MyProfileCard />

        {/* Users Grid */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Organization Users</h2>
          <UsersGrid users={filteredUsers} onUserUpdate={() => fetchUsers()} />
        </div>

        {/* Create Modal */}
        <CreateUserModal open={creating} onClose={() => setCreating(false)} />
      </div>
    </div>
  )
}