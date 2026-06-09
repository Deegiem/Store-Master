"use client"

import { use, useState, useEffect, useCallback } from "react"
import { RoleGuard } from "@/components/RoleGuard"
import { reportService } from "@/services/reportService"
import { ReportTable } from "@/components/reports/ReportTable"
import { ReportDateFilterButton } from "@/components/reports/ReportDateFilterButton"
import { Building2, CreditCard, Sparkles } from "lucide-react"
import { formatDateRange } from "@/lib/dateUtils"

interface Props {
    params: { role: string }
    searchParams: Promise<{ start_date?: string; end_date?: string }> | { start_date?: string; end_date?: string }
}

export default function SalesByBranchReportPage({ searchParams }: Props) {
    // Unwrap the searchParams Promise
    const unwrappedSearchParams = searchParams instanceof Promise ? use(searchParams) : searchParams
    const from = unwrappedSearchParams?.start_date ?? ""
    const to = unwrappedSearchParams?.end_date ?? ""

    const [salesByBranch, setSalesByBranch] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const params: any = {}
            if (from) params.start_date = from
            if (to) params.end_date = to

            const data = await reportService.getSalesByBranch(params)
            setSalesByBranch(data)
        } catch (e: any) {
            console.error('Failed to fetch sales by branch:', e)
            setError(e.message || 'Failed to load data')
        } finally {
            setLoading(false)
        }
    }, [from, to])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const columns = [
        { key: "branch", label: "Branch" },
        { key: "revenue", label: "Revenue" },
        { key: "sales", label: "Sales Count" },
        { key: "tax", label: "Tax" },
        { key: "average", label: "Avg Transaction" },
    ]

    const branches = salesByBranch?.branches ?? []

    return (
        <RoleGuard allowedRoles={["admin", "manager", "finance"]}>
            <div className="min-h-screen bg-[#F9FAFB] p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="rounded-sm border border-slate-200 bg-white p-6">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                                    Sales by Branch
                                </p>
                                <h1 className="mt-2 text-3xl font-bold text-slate-900">Branch Revenue Performance</h1>
                                <p className="mt-2 text-sm text-slate-500">
                                    Review how each branch is contributing to overall sales.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                    <Building2 className="h-4 w-4" />
                                    {branches.length} branches
                                </div>
                                <ReportDateFilterButton currentStartDate={from} currentEndDate={to} />
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent" />
                            <span className="ml-3 text-sm text-slate-600">Loading branch data...</span>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
                            <p className="text-sm text-red-600">{error}</p>
                            <button
                                onClick={fetchData}
                                className="mt-3 rounded-sm bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Stats Grid */}
                    {!loading && !error && (
                        <>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-sm border border-slate-200 bg-white p-5">
                                    <p className="text-sm text-slate-500">Period</p>
                                    <p className="mt-3 text-xl font-bold text-slate-900">
                                        {formatDateRange(salesByBranch?.period?.start, salesByBranch?.period?.end)}
                                    </p>
                                </div>
                                <div className="rounded-sm border border-slate-200 bg-white p-5">
                                    <p className="text-sm text-slate-500">Total Revenue</p>
                                    <p className="mt-3 text-3xl font-bold text-slate-900">
                                        ₦{(salesByBranch?.total_revenue ?? 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-sm border border-slate-200 bg-white p-5">
                                    <p className="text-sm text-slate-500">Average Sales / Branch</p>
                                    <p className="mt-3 text-xl font-bold text-slate-900">
                                        ₦{salesByBranch?.total_revenue && branches.length > 0
                                            ? Math.round(salesByBranch.total_revenue / branches.length).toLocaleString()
                                            : "0"}
                                    </p>
                                </div>
                                <div className="rounded-sm border border-slate-200 bg-white p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500">Top Branch</p>
                                            <p className="mt-3 text-xl font-bold text-slate-900">
                                                {branches[0]?.branch_name ?? "-"}
                                            </p>
                                        </div>
                                        <CreditCard className="h-6 w-6 text-slate-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Branch Breakdown Table */}
                            <div className="rounded-sm border border-slate-200 bg-white p-6">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <Sparkles className="h-5 w-5" />
                                    <h2 className="text-lg font-semibold text-slate-900">Branch breakdown</h2>
                                </div>
                                <div className="mt-6">
                                    <ReportTable
                                        columns={columns}
                                        rows={branches}
                                        renderCell={(row: any, key: string) => {
                                            if (key === "branch") return row.branch_name
                                            if (key === "revenue") return `₦${(row.revenue ?? 0).toLocaleString()}`
                                            if (key === "sales") return row.sales_count
                                            if (key === "tax") return `₦${(row.tax_collected ?? 0).toLocaleString()}`
                                            if (key === "average") return `₦${(row.avg_transaction ?? 0).toLocaleString()}`
                                            return null
                                        }}
                                        emptyMessage="No branch data available for the selected period"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </RoleGuard>
    )
}