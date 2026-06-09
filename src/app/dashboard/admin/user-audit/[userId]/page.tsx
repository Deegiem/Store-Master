// src/app/dashboard/admin/user-audit/[userId]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Shield, 
  Clock, 
  Download,
  Filter
} from "lucide-react"
import { useAdminStore } from "@/store/adminStore"
import { UserInfoCard } from "@/components/user-audit/UserInfoCard"
import { AuditLogTable } from "@/components/user-audit/AuditLogTable"
import { AuditLogSkeleton } from "@/components/user-audit/AuditLogSkeleton"

interface PageProps {
  params: Promise<{ userId: string }>
}

export default function UserAuditDetailPage({ params }: PageProps) {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [filterModule, setFilterModule] = useState<string>("all")
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: ""
  })

  const {
    userAuditTrails,
    fetchUserAuditTrail,
    adminloading,
    error,
  } = useAdminStore()

  useEffect(() => {
    const unwrapParams = async () => {
      const resolved = await params
      setUserId(resolved.userId)
    }
    
    unwrapParams()
  }, [params])

  // Fetch audit trail once userId is available
  useEffect(() => {
    if (userId) {
      fetchUserAuditTrail(userId, { page: 1, limit: 100 })
    }
  }, [userId, fetchUserAuditTrail])

  const audit = userAuditTrails
  const user = audit?.user
  const logs = audit?.logs ?? []

  // Get unique modules for filter
  const modules = ["all", ...new Set(logs.map(log => log.module).filter(Boolean))]

  const filteredLogs = logs.filter(log => {
    if (filterModule !== "all" && log.module !== filterModule) return false
    if (dateRange.start && new Date(log.timestamp) < new Date(dateRange.start)) return false
    if (dateRange.end && new Date(log.timestamp) > new Date(dateRange.end)) return false
    return true
  })

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `audit_logs_${userId}_${new Date().toISOString()}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // Loading state while params are being resolved
  if (!userId) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
            <div className="text-center">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
              <p className="text-sm text-slate-500">Loading user data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <button
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#003e9d] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Shield className="h-3.5 w-3.5" />
              Forensic Audit Trail
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              User Activity Logs
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Complete audit trail of all user actions and system activities
            </p>
          </div>
          
          <button
            onClick={handleExport}
            disabled={filteredLogs.length === 0}
            className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Export Logs
          </button>
        </motion.div>

        {/* Error State */}
        {error.userAuditTrails && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            {error.userAuditTrails}
          </motion.div>
        )}

        {/* User Info Card */}
        {user && (
          <UserInfoCard
            user={user}
            totalActions={audit?.total_actions}
            userId={userId}
          />
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Module Filter
            </label>
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            >
              {modules.map(module => (
                <option key={module} value={module}>
                  {module === "all" ? "All Modules" : module}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Date From
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Date To
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>

          <button
            onClick={() => {
              setFilterModule("all")
              setDateRange({ start: "", end: "" })
            }}
            className="h-11 px-4 rounded-sm border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-sm border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Activity Timeline</h2>
                <p className="text-sm text-slate-500">
                  Showing {filteredLogs.length} of {logs.length} activities
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-500">Real-time</span>
              </div>
            </div>
          </div>

          {adminloading.userAuditTrails ? (
            <AuditLogSkeleton />
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-slate-100 p-3">
                <Clock className="h-6 w-6 text-slate-400" />
              </div>
              <p className="mt-4 text-sm text-slate-500">No activity logs found</p>
              <p className="text-xs text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <AuditLogTable logs={filteredLogs} />
          )}
        </div>
      </div>
    </div>
  )
}
