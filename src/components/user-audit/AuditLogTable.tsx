// src/components/user-audit/AuditLogTable.tsx
"use client"

import { motion } from "framer-motion"
import { 
  Clock, 
  Activity, 
  Database,
  Shield,
  ShoppingCart,
  Package,
  Users,
  Settings
} from "lucide-react"
import type { ActionLog } from "@/types/admin"

interface AuditLogTableProps {
  logs: ActionLog[]
}

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const getModuleIcon = (module: string) => {
    const icons: Record<string, any> = {
      auth: Shield,
      user: Users,
      product: Package,
      procurement: ShoppingCart,
      inventory: Database,
      settings: Settings,
    }
    const Icon = icons[module?.toLowerCase()]
    return Icon || Activity
  }

  const getActionColor = (action: string) => {
    if (action?.toUpperCase().includes("CREATE")) return "bg-green-50 text-green-700"
    if (action?.toUpperCase().includes("UPDATE") || action?.toUpperCase().includes("EDIT")) return "bg-blue-50 text-blue-700"
    if (action?.toUpperCase().includes("DELETE") || action?.toUpperCase().includes("REMOVE")) return "bg-red-50 text-red-700"
    if (action?.toUpperCase().includes("APPROVE")) return "bg-purple-50 text-purple-700"
    if (action?.toUpperCase().includes("REJECT")) return "bg-orange-50 text-orange-700"
    if (action?.toUpperCase().includes("LOGIN")) return "bg-indigo-50 text-indigo-700"
    if (action?.toUpperCase().includes("LOGOUT")) return "bg-slate-50 text-slate-700"
    return "bg-slate-50 text-slate-700"
  }

  const formatAction = (action: string) => {
    return action
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
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
                <Activity className="h-3.5 w-3.5" />
                Action
              </div>
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              <div className="flex items-center gap-2">
                <Database className="h-3.5 w-3.5" />
                Module
              </div>
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              Details
            </th>
            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
              IP Address
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            const ModuleIcon = getModuleIcon(log.module)
            const actionColor = getActionColor(log.action)
            
            return (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.01 }}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-600">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${actionColor}`}>
                    {formatAction(log.action)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <ModuleIcon className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-sm text-slate-700">{log.module || "System"}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 max-w-md truncate">
                  {log.description || "-"}
                </td>
                <td className="px-5 py-4 font-mono text-xs text-slate-500">
                  {log.ip_address || "-"}
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
