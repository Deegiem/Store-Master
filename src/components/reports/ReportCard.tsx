import Link from "next/link"
import React from "react"

interface ReportCardProps {
  href: string
  title: string
  description?: string
  icon?: React.ReactNode
}

export function ReportCard({ href, title, description, icon }: ReportCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-sm border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">{icon}</div>
        <div className="flex-1">
          <div className="text-slate-900">{title}</div>
          {description && <div className="text-xs text-slate-500">{description}</div>}
        </div>
      </div>
    </Link>
  )
}
