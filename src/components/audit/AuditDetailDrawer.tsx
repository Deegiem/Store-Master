// src/components/audit/AuditDetailDrawer.tsx
"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  User,
  Activity,
  Database,
  Globe,
  Clock,
  Tag,
  Shield,
  ChevronRight,
  Copy,
  Check
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"
import type { AuditLog } from "@/types/admin"
import { formatDateTime } from "@/lib/dateUtils"

interface AuditDetailDrawerProps {
  log: AuditLog | null
  open: boolean
  onClose: () => void
}

type DetailField = {
  label: string
  value: string
  copyable?: boolean
  mono?: boolean
  badge?: boolean
}

type DetailSection = {
  title: string
  icon: LucideIcon
  fields: DetailField[]
}

export function AuditDetailDrawer({ log, open, onClose }: AuditDetailDrawerProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!log) return null

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const formatAction = (action: string) => {
    return action
      ?.toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const sections: DetailSection[] = [
    {
      title: "User Context",
      icon: User,
      fields: [
        { label: "Full Name", value: log.user_name, copyable: true },
        { label: "Email", value: log.user_email, copyable: true },
        { label: "User ID", value: log.user_id || "N/A", copyable: true, mono: true },
        { label: "Role", value: log.user_role, badge: true },
      ]
    },
    {
      title: "Event Details",
      icon: Activity,
      fields: [
        { label: "Action", value: formatAction(log.action), badge: true },
        { label: "Module", value: log.module },
        { label: "Target Type", value: log.target_type || "N/A" },
        { label: "Target ID", value: log.target_id || "N/A", mono: true, copyable: !!log.target_id },
      ]
    },
    {
      title: "System Trace",
      icon: Globe,
      fields: [
        { label: "IP Address", value: log.ip_address || "N/A", copyable: !!log.ip_address, mono: true },
        { label: "Timestamp", value: formatDateTime(log.timestamp), copyable: true },  // ← Updated here
        { label: "User Agent", value: log.user_agent || "N/A" },
      ]
    },
  ]

  const getBadgeColor = (value: string) => {
    if (value?.toUpperCase().includes("FAILED") || value?.toUpperCase().includes("REJECTED")) {
      return "bg-red-50 text-red-700 border-red-200"
    }
    if (value?.toUpperCase().includes("CREATE") || value?.toUpperCase().includes("APPROVE")) {
      return "bg-green-50 text-green-700 border-green-200"
    }
    if (value?.toUpperCase().includes("UPDATE") || value?.toUpperCase().includes("EDIT")) {
      return "bg-blue-50 text-blue-700 border-blue-200"
    }
    if (value?.toUpperCase().includes("DELETE") || value?.toUpperCase().includes("REMOVE")) {
      return "bg-red-50 text-red-700 border-red-200"
    }
    return "bg-slate-50 text-slate-700 border-slate-200"
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#003e9d]/10">
                    <Shield className="h-5 w-5 text-[#003e9d]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Audit Event Detail</h2>
                    <p className="text-sm text-slate-500">Forensic investigation view</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-sm p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {sections.map((section) => (
                <div key={section.title} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100">
                      <section.icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{section.title}</h3>
                  </div>

                  <div className="rounded-sm border border-slate-200 bg-slate-50/30 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {section.fields.map((field) => (
                        <div key={field.label} className="space-y-1">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            {field.label}
                          </p>
                          <div className="flex items-center justify-between gap-2">
                            {field.badge ? (
                              <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getBadgeColor(field.value)}`}>
                                {field.value || "N/A"}
                              </span>
                            ) : (
                              <p className={`text-sm text-slate-900 ${field.mono ? "font-mono" : ""}`}>
                                {field.value || "N/A"}
                              </p>
                            )}
                            {field.copyable && field.value && (
                              <button
                                onClick={() => copyToClipboard(field.value, field.label)}
                                className="rounded-sm p-1 text-slate-400 transition hover:bg-slate-100 hover:text-[#003e9d]"
                              >
                                {copiedField === field.label ? (
                                  <Check className="h-3.5 w-3.5 text-green-600" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Metadata Section */}
              {log.metadata && Object.keys(log.metadata).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-slate-100">
                      <Database className="h-4 w-4 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Metadata Intelligence</h3>
                  </div>

                  <div className="rounded-sm border border-slate-200 bg-slate-50/30 p-4">
                    <pre className="max-h-96 overflow-auto rounded-sm bg-slate-900 p-4 text-xs text-slate-300">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 border-t border-slate-200 bg-white px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-xs text-slate-500">
                    Event ID: {log.id}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5"
                >
                  Close
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
