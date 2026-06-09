"use client"

import { AlertTriangle, Copy, Check } from "lucide-react"
import { useState } from "react"
import type { SuspiciousAccount } from "@/types/admin"

interface SuspiciousAccountCardProps {
  account: SuspiciousAccount
  index: number
}

export function SuspiciousAccountCard({ account, index }: SuspiciousAccountCardProps) {
  const [copiedIp, setCopiedIp] = useState<string | null>(null)

  const copyToClipboard = (text: string, ip: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIp(ip)
    setTimeout(() => setCopiedIp(null), 2000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{account.email}</h3>
              <p className="text-sm text-slate-500">
                {account.attempts} failed attempt{account.attempts !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Unique IP Addresses
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {account.unique_ips.map((ip) => (
                <div
                  key={ip}
                  className="group inline-flex items-center gap-1 rounded-sm border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-mono text-slate-700"
                >
                  <span>{ip}</span>
                  <button
                    onClick={() => copyToClipboard(ip, ip)}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {copiedIp === ip ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Last Attempt
            </p>
            <p className="text-sm text-slate-600">{formatDate(account.last_attempt)}</p>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="rounded-sm bg-red-50 px-3 py-1 text-center">
            <p className="text-2xl font-bold text-red-600">{account.attempts}</p>
            <p className="text-[10px] font-semibold uppercase text-red-500">Attempts</p>
          </div>
        </div>
      </div>
    </div>
  )
}