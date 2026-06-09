// src/components/audit/AuditTable.tsx
"use client"

import { motion } from "framer-motion"
import {
  Clock,
  User,
  Activity,
  Database,
  Shield,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react"
import type { AuditLog } from "@/types/admin"
import { formatDateTime } from "@/lib/dateUtils"

interface AuditTableProps {
  logs: AuditLog[]
  onSelect?: (log: AuditLog) => void
}

export function AuditTable({ logs, onSelect }: AuditTableProps) {
  const getSeverityIcon = (action: string) => {
    if (action?.toUpperCase().includes("FAILED") || action?.toUpperCase().includes("REJECTED")) {
      return <AlertCircle className="h-4 w-4 text-red-500" />
    }
    if (action?.toUpperCase().includes("CREATE") || action?.toUpperCase().includes("APPROVE")) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    }
    return <Info className="h-4 w-4 text-blue-500" />
  }

  const getSeverityColor = (action: string) => {
    if (action?.toUpperCase().includes("FAILED") || action?.toUpperCase().includes("REJECTED")) {
      return "border-red-200 bg-red-50 text-red-700"
    }
    if (action?.toUpperCase().includes("CREATE") || action?.toUpperCase().includes("APPROVE")) {
      return "border-green-200 bg-green-50 text-green-700"
    }
    return "border-blue-200 bg-blue-50 text-blue-700"
  }

  const formatAction = (action: string) => {
    return action
      ?.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (logs.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
        <Shield className="h-12 w-12 text-slate-400" />
        <p className="mt-4 text-lg font-semibold text-slate-900">No audit logs found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  Timestamp
                </div>
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" />
                  User
                </div>
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Role
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Action
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <div className="flex items-center gap-2">
                  <Database className="h-3.5 w-3.5" />
                  Module
                </div>
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Target
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                IP Address
              </th>
              <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => onSelect?.(log)}
                className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                  {formatDateTime(log.timestamp)}
                </td>
                <td className="px-5 py-4">
                  <div>
                    <p className="font-medium text-slate-900">{log.user_name || "System"}</p>
                    <p className="text-xs text-slate-500">{log.user_email}</p>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {log.user_role || "Unknown"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(log.action)}
                    <span className="text-sm font-medium text-slate-900">
                      {formatAction(log.action)}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {log.module || "-"}
                </td>
                <td className="px-5 py-4 text-slate-600">
                  {log.target_type || "-"}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-slate-500">
                  {log.ip_address || "-"}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getSeverityColor(log.action)}`}>
                    {log.action?.toUpperCase().includes("FAILED") ? "Failed" :
                      log.action?.toUpperCase().includes("CREATE") ? "Created" :
                        log.action?.toUpperCase().includes("UPDATE") ? "Updated" :
                          log.action?.toUpperCase().includes("DELETE") ? "Deleted" :
                            log.action?.toUpperCase().includes("APPROVE") ? "Approved" :
                              "Success"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <ChevronRight className="ml-auto h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1" />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
