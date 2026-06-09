"use client"

import { useDashboardData } from "@/hooks/useDashboardData"
import { StatCard } from "@/components/admin-dash-components/StatCard"
import { BranchPerformance } from "@/components/admin-dash-components/BranchPerformance"
import { AuditTable } from "@/components/audit/AuditTable"

export default function DashboardPage() {
  const {
    dashboard,
    auditLogs,
    loading,
    outOfStock,
    lowStock,
    branches,
  } = useDashboardData()

  if (loading || !dashboard) {
    return <p>Loading...</p>
  }

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Revenue (This Month)"
          value={`$${dashboard.revenue.this_month}`}
        />

        <StatCard
          title="Out of Stock"
          value={outOfStock}
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
        />
      </div>

      {/* Branch Performance */}
      <BranchPerformance branches={branches} />

      {/* Audit Logs */}
      <AuditTable logs={auditLogs} />
    </div>
  )
}