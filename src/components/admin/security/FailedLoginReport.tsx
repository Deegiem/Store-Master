"use client"

import { useEffect, useState, useCallback } from "react"
import { Download, Loader2, Shield, Info } from "lucide-react"
import { useAdminStore } from "@/store/adminStore"
import { FailedLoginFilters } from "./FailedLoginFilters"
import { SuspiciousAccountCard } from "./SuspiciousAccountCard"
import { usePermissions } from "@/hooks/usePermissions"

export function FailedLoginReport() {
  const { canExportReports } = usePermissions()
  const { failedLogins, fetchFailedLogins, adminloading, error } = useAdminStore()
  const [hours, setHours] = useState(168)

  const loadFailedLogins = useCallback(async () => {
    await fetchFailedLogins({ hours })
  }, [fetchFailedLogins, hours])

  useEffect(() => {
    loadFailedLogins()
  }, [loadFailedLogins])

  const handleExport = () => {
    if (!failedLogins || !canExportReports) return

    const headers = ["Email", "Attempts", "Unique IPs", "Last Attempt"]
    const csvData = failedLogins.suspicious_accounts.map(account => [
      account.email,
      account.attempts,
      account.unique_ips.join("; "),
      account.last_attempt
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `failed_logins_${hours}h_${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const isLoading = adminloading.failedLogins
  const suspiciousAttemptsSum = failedLogins?.suspicious_accounts.reduce(
    (sum, account) => sum + account.attempts, 
    0
  ) || 0
  const otherAttempts = (failedLogins?.total_failed_attempts || 0) - suspiciousAttemptsSum

  if (error.failedLogins) {
    return (
      <div className="rounded-sm border border-red-200 bg-red-50 p-8 text-center">
        <Shield className="mx-auto h-12 w-12 text-red-400" />
        <p className="mt-4 text-sm text-red-600">{error.failedLogins}</p>
        <button
          onClick={loadFailedLogins}
          className="mt-4 rounded-sm bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <FailedLoginFilters
        hours={hours}
        setHours={setHours}
        onRefresh={loadFailedLogins}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#003e9d]" />
          <span className="ml-3 text-sm text-slate-600">Loading security data...</span>
        </div>
      ) : failedLogins ? (
        <>
          {/* Summary Card */}
          <div className="rounded-sm border border-slate-200 bg-gradient-to-r from-red-50 to-white p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Period (Last {failedLogins.period_hours} hours)
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {failedLogins.total_failed_attempts}
                  </h2>
                  <p className="text-sm text-slate-600">total failed login attempts</p>
                </div>
                <div className="flex gap-3">
                  {canExportReports && failedLogins.suspicious_accounts.length > 0 && (
                    <button
                      onClick={handleExport}
                      className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      <Download className="h-4 w-4" />
                      Export Report
                    </button>
                  )}
                </div>
              </div>
              
              {/* Breakdown of attempts */}
              <div className="mt-2 flex flex-wrap gap-4 pt-2 border-t border-red-100">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-slate-600">
                    <strong>{suspiciousAttemptsSum}</strong> attempts from suspicious accounts
                  </span>
                </div>
                {otherAttempts > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-400" />
                    <span className="text-sm text-slate-600">
                      <strong>{otherAttempts}</strong> attempt{otherAttempts !== 1 ? "s" : ""} from other accounts
                    </span>
                  </div>
                )}
              </div>
              
              {/* Info note */}
              {otherAttempts > 0 && (
                <div className="flex items-start gap-2 rounded-sm bg-blue-50 p-3 text-xs text-blue-700">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <p>
                    Only accounts with multiple failed attempts are shown below. Single failed attempts from 
                    other accounts are not displayed to reduce noise.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Suspicious Accounts List */}
          {failedLogins.suspicious_accounts.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  Suspicious Accounts
                </h3>
                <p className="text-sm text-slate-500">
                  {failedLogins.suspicious_accounts.length} account
                  {failedLogins.suspicious_accounts.length !== 1 ? "s" : ""} detected
                </p>
              </div>
              <div className="space-y-3">
                {failedLogins.suspicious_accounts.map((account) => (
                  <SuspiciousAccountCard
                    key={account.email}
                    account={account}
                    index={0}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-slate-200 bg-white p-12 text-center">
              <Shield className="mx-auto h-12 w-12 text-green-400" />
              <p className="mt-4 text-sm text-slate-500">No suspicious accounts detected</p>
              <p className="text-xs text-slate-400">
                No failed login attempts found in the selected period
              </p>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}