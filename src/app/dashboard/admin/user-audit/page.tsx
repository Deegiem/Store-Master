// src/app/dashboard/admin/user-audit/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Users, 
  Search, 
  Shield, 
  Clock,
  Mail,
  Briefcase,
  ChevronRight
} from "lucide-react"
import { useUserStore } from "@/store/useUserStore"
import { UserCard } from "@/components/user-audit/UserCard"
import { UserAuditSkeleton } from "@/components/user-audit/UserAuditSkeleton"
import { EmptyUserState } from "@/components/user-audit/EmptyUserState"

export default function UserAuditListPage() {
  const router = useRouter()
  const { users, fetchUsers, loading } = useUserStore()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const filteredUsers = users?.filter(user => 
    user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleUserSelect = (userId: string) => {
    router.push(`/dashboard/admin/user-audit/${userId}`)
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Shield className="h-3.5 w-3.5" />
              Security & Compliance
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              User Audit Trail
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Select a user to view complete forensic audit trail and activity history
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
              <Clock className="inline h-4 w-4 mr-2" />
              Real-time logs
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
        </div>

        {/* Content */}
        {loading.users ? (
          <UserAuditSkeleton />
        ) : filteredUsers.length === 0 ? (
          <EmptyUserState searchTerm={searchTerm} />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing {filteredUsers.length} of {users?.length || 0} users
              </p>
            </div>
            
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.map((user, index) => (
                <UserCard
                  key={user.user_id}
                  user={user}
                  onClick={() => handleUserSelect(user.user_id!)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}