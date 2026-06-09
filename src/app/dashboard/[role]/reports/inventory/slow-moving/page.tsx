import { RoleGuard } from "@/components/RoleGuard"
import { reportService } from "@/services/reportService"
import { ReportTable } from "@/components/reports/ReportTable"
import { ReportDaysFilterButton } from "@/components/reports/ReportDaysFilterButton"
import { Box, Clock, TrendingDown } from "lucide-react"

interface Props {
  params: { role: string }
  searchParams?: { days_threshold?: string }
}

export default async function SlowMovingInventoryReportPage({ params, searchParams }: Props) {
  void params
  const days = Number(searchParams?.days_threshold ?? 30)
  let slowMovingInventory: any = null
  try {
    slowMovingInventory = await reportService.getSlowMovingInventory({ days_threshold: days })
  } catch (err) {
    void err
  }

  const columns = [
    { key: "product", label: "Product" },
    { key: "branch", label: "Branch" },
    { key: "quantity", label: "Quantity" },
    { key: "value", label: "Value" },
    { key: "updated", label: "Last Updated" },
  ]

  return (
    <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Slow Moving Inventory</p>
                <h1 className="mt-2 text-3xl font-bold text-slate-900">Inventory at Risk</h1>
                <p className="mt-2 text-sm text-slate-500">Review the slowest-moving items across your branches.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                  <Clock className="h-4 w-4 text-amber-700" />
                  {slowMovingInventory?.threshold_days ?? days} days
                </div>
                <ReportDaysFilterButton currentDays={String(days)} />
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Slow Items</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{slowMovingInventory?.total_slow_items ?? 0}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Value Tied Up</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">₦{(slowMovingInventory?.total_value_tied_up ?? 0).toLocaleString()}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Branch Count</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{new Set((slowMovingInventory?.items ?? []).map((item: any) => item.branch)).size}</p>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-slate-600">
                <TrendingDown className="h-5 w-5 text-rose-600" />
                <p className="text-sm">Alert level</p>
              </div>
              <p className="mt-3 text-3xl font-bold text-slate-900">{slowMovingInventory?.threshold_days ?? days}d</p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 text-slate-700">
              <Box className="h-5 w-5 text-[#003e9d]" />
              <h2 className="text-lg font-semibold text-slate-900">Slow moving items</h2>
            </div>
            <div className="mt-6">
              <ReportTable
                columns={columns}
                rows={slowMovingInventory?.items ?? []}
                renderCell={(row: any, key: string) => {
                  if (key === "product") return row.product_name
                  if (key === "branch") return row.branch
                  if (key === "quantity") return row.quantity
                  if (key === "value") return `₦${(row.value_tied_up ?? 0).toLocaleString()}`
                  if (key === "updated") return new Date(row.last_updated).toLocaleDateString()
                  return null
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  )
}
