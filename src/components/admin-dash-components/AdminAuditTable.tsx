// src/components/AdminAuditTable.tsx
"use client";

import { formatActionText, formatReadableText } from "@/utils/formatText"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  History,
  Search,
  User,
  Clock,
  Activity,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react"
import type { AuditLog } from "@/types/admin"
import { getAuditStatus } from "@/utils/audit"
import { formatDateTime } from "@/lib/dateUtils";

interface Props {
  logs?: AuditLog[]
}

export function AdminAuditTable({ logs }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const safeLogs = Array.isArray(logs) ? logs : []

  // Filter logs based on search
  const filteredLogs = safeLogs.filter(log =>
    log.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.target_type?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentLogs = filteredLogs.slice(startIndex, endIndex)

  const getStatusColor = (action: string) => {
    if (action.includes("CREATE")) return "bg-green-50 text-green-700"
    if (action.includes("UPDATE") || action.includes("EDIT")) return "bg-blue-50 text-blue-700"
    if (action.includes("DELETE") || action.includes("REMOVE")) return "bg-red-50 text-red-700"
    if (action.includes("APPROVE")) return "bg-purple-50 text-purple-700"
    if (action.includes("REJECT")) return "bg-orange-50 text-orange-700"
    return "bg-slate-50 text-slate-700"
  }

  if (safeLogs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-sm border border-slate-200 bg-white p-8 text-center"
      >
        <History className="mx-auto h-12 w-12 text-slate-400" />
        <p className="mt-4 text-lg font-semibold text-slate-900">No audit logs available</p>
        <p className="mt-1 text-sm text-slate-500">System activities will appear here</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-sm border border-slate-200 bg-white"
    >
      {/* Header */}
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-[#003e9d]" />
              <h2 className="text-lg font-semibold text-slate-900">Recent Audit Logs</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">Track system activities and user actions</p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="h-10 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d] sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-5 px-5">
        <div className="min-w-[800px] lg:min-w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    Time
                  </div>
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5" />
                    User
                  </div>
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  <div className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5" />
                    Action
                  </div>
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Target
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="font-medium text-slate-900">{log.user_name || "System"}</p>
                      {log.user_email && (
                        <p className="text-xs text-slate-500">{log.user_email}</p>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(log.action)}`}>
                      {formatActionText(log.action)} {/* This will show "Price Updated" instead of "PRICE_UPDATED" */}                  </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {log.target_type ? (
                      <div>
                        <p className="text-sm">{log.target_type}</p>
                        {log.target_id && (
                          <p className="text-xs font-mono text-slate-400">{log.target_id.slice(0, 8)}...</p>
                        )}
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {getAuditStatus(log.action)}
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 max-w-xs truncate">
                    {log.details || "-"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
            <p className="text-sm text-slate-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredLogs.length)} of {filteredLogs.length} entries
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-sm border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 w-8 rounded-sm text-sm font-medium transition ${currentPage === pageNum
                        ? "bg-[#003e9d] text-white"
                        : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-sm border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
    </motion.div>
  )
}