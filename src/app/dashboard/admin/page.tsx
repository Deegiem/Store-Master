// src/app/dashboard/admin/page.tsx
"use client";

import { motion } from "framer-motion"
import {
  TrendingUp,
  Package,
  AlertTriangle,
  Building2,
  Activity,
  Users,
  DollarSign
} from "lucide-react"

import { useDashboardData } from "@/hooks/useDashboardData"
import { StatCard } from "@/components/admin-dash-components/StatCard"
import { BranchPerformance } from "@/components/admin-dash-components/BranchPerformance"
import { AdminAuditTable } from "@/components/admin-dash-components/AdminAuditTable"
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { SharePreviewButton } from "@/components/SharePreviewButton";

export default function DashboardPage() {
  const {
    dashboard,
    auditLogs,
    loading,
    outOfStock,
    lowStock,
    branches,
  } = useDashboardData()

  const { users, fetchUsers } = useUserStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  if (loading || !dashboard) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
            <p className="text-sm text-slate-500">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "Revenue (This Month)",
      value: `₦${dashboard.revenue.this_month.toLocaleString()}`,
      icon: DollarSign,
      // trend: dashboard.revenue.last_month ? `+${(((dashboard.revenue.this_month - dashboard.revenue.last_month) / dashboard.revenue.last_month) * 100).toFixed(1)}%` : "+0%",
      // trendUp: dashboard.revenue.this_month >= (dashboard.revenue.last_month ?? 0),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Branches",
      value: branches?.length || 0,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Active Users",
      value: users?.length || 0,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Out of Stock",
      value: outOfStock ?? 0,
      icon: Package,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Low Stock",
      value: lowStock ?? 0,
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Total Orders",
      value: dashboard.total_orders?.toLocaleString() || 0,
      icon: Activity,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
  ]

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <TrendingUp className="h-3.5 w-3.5" />
              Admin Dashboard
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Overview
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Real-time insights and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>

        {/* KPI CARDS GRID */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              // trend={stat.trend}
              // trendUp={stat.trendUp}
              bgColor={stat.bgColor}
              iconColor={stat.iconColor}
              delay={index * 0.05}
            />
          ))}
        </div>

        {/* BRANCH PERFORMANCE */}
        <BranchPerformance branches={branches ?? []} />

        {/* AUDIT LOGS */}
        <AdminAuditTable logs={auditLogs ?? []} />

        <SharePreviewButton />

      </div>
    </div>
  )
}