// src/app/dashboard/admin/audit/page.tsx
"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Activity,
  ChevronDown
} from "lucide-react"
import { useAdminStore } from "@/store/adminStore"
import { AuditTable } from "@/components/audit/AuditTable"
import { AuditFilters } from "@/components/audit/AuditFilters"
import { AuditStats } from "@/components/audit/AuditStats"
import { AuditDetailDrawer } from "@/components/audit/AuditDetailDrawer"
import { AuditSkeleton } from "@/components/audit/AuditSkeleton"
import type { AuditLog } from "@/types/admin"

export default function AuditPage() {
  const {
    auditLogs,
    fetchAuditLogs,
    adminloading,
    error,
  } = useAdminStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedModule, setSelectedModule] = useState("all")
  const [selectedAction, setSelectedAction] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchAuditLogs()
  }, [fetchAuditLogs])

  // Get unique values for filters
  const modules = ["all", ...new Set(auditLogs?.map(log => log.module).filter(Boolean) || [])]
  const actions = ["all", ...new Set(auditLogs?.map(log => log.action).filter(Boolean) || [])]
  const roles = ["all", ...new Set(auditLogs?.map(log => log.user_role).filter(Boolean) || [])]

  const filteredLogs = auditLogs?.filter(log => {
    // Search filter
    const matchesSearch = !searchQuery || 
      log.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module?.toLowerCase().includes(searchQuery.toLowerCase())

    // Module filter
    const matchesModule = selectedModule === "all" || log.module === selectedModule
    
    // Action filter
    const matchesAction = selectedAction === "all" || log.action === selectedAction
    
    // Role filter
    const matchesRole = selectedRole === "all" || log.user_role === selectedRole
    
    // Date range filter
    let matchesDate = true
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(log.timestamp) >= new Date(dateRange.start)
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(log.timestamp) <= new Date(dateRange.end)
    }

    return matchesSearch && matchesModule && matchesAction && matchesRole && matchesDate
  }) || []

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2)
    const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `audit_logs_${new Date().toISOString()}.json`
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (adminloading.auditLogs) {
    return <AuditSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-[1400px] space-y-6">
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
              Audit Intelligence Console
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              System-wide activity monitoring & investigation hub
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={handleExport}
              disabled={filteredLogs.length === 0}
              className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export Logs
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <AuditStats logs={filteredLogs} />

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user, action, module, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <AuditFilters
            modules={modules}
            actions={actions}
            roles={roles}
            selectedModule={selectedModule}
            selectedAction={selectedAction}
            selectedRole={selectedRole}
            dateRange={dateRange}
            onModuleChange={setSelectedModule}
            onActionChange={setSelectedAction}
            onRoleChange={setSelectedRole}
            onDateRangeChange={setDateRange}
            onClear={() => {
              setSelectedModule("all")
              setSelectedAction("all")
              setSelectedRole("all")
              setDateRange({ start: "", end: "" })
            }}
          />
        )}

        {/* Error State */}
        {error.auditLogs && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            {error.auditLogs}
          </motion.div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredLogs.length} of {auditLogs?.length || 0} activities
          </p>
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">Real-time monitoring</span>
          </div>
        </div>

        {/* Audit Table */}
        <AuditTable
          logs={filteredLogs}
          onSelect={(log) => setSelectedLog(log)}
        />

        {/* Detail Drawer */}
        <AuditDetailDrawer
          log={selectedLog}
          open={!!selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      </div>
    </div>
  )
}