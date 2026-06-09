"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { BarChart3, ShoppingCart, TrendingUp, FileText, Clock } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"

export default function DynamicReportsPage() {
  const params = useParams()
  const currentRole = params.role as string

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reports</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Business Reports</h1>
            <p className="mt-2 text-sm text-slate-500">Browse financial, procurement and sales reporting for your organization.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href={`/dashboard/${currentRole}/reports/sales`}
              className="rounded-sm border border-slate-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sales Summary</p>
                  <p className="text-sm text-slate-500">Top-level revenue and transaction performance.</p>
                </div>
              </div>
            </Link>
            <Link
              href={`/dashboard/${currentRole}/reports/procurement`}
              className="rounded-sm border border-slate-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Procurement Spend</p>
                  <p className="text-sm text-slate-500">Track supplier and branch procurement investment.</p>
                </div>
              </div>
            </Link>
            <Link
              href={`/dashboard/${currentRole}/reports/profit`}
              className="rounded-sm border border-slate-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Profit Reports</p>
                  <p className="text-sm text-slate-500">See margin, cost, and profit by branch.</p>
                </div>
              </div>
            </Link>
            <Link
              href={`/dashboard/${currentRole}/reports/tax`}
              className="rounded-sm border border-slate-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Tax Reports</p>
                  <p className="text-sm text-slate-500">Review VAT, effective tax, and branch tax totals.</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href={`/dashboard/${currentRole}/reports/inventory/slow-moving`}
              className="rounded-sm border border-slate-200 bg-white p-6 transition hover:shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Slow-Moving Inventory</p>
                  <p className="text-sm text-slate-500">Identify inventory items that are not selling fast enough.</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
