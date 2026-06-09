"use client"

import { useEffect, useState } from "react"
import { BarChart3, Download, Calendar, Building2 } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useSalesStore } from "@/store/saleStore"
import { useBranchStore } from "@/store/useBranchStore"
import { SalesTableSkeleton } from "@/components/sales/SalesTableSkeleton"
import { EmptySalesState } from "@/components/sales/EmptySalesState"
import type { AppRole } from "@/lib/roleMapper"

export default function SalesReportsPage() {
    const { userBranchId, canViewAllBranches, canExportReports } = usePermissions()
    const { sales, fetchSales, loading } = useSalesStore()
    const { branches, fetchBranches } = useBranchStore()

    const [startDate, setStartDate] = useState(
        new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]
    )
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
    const [branchId, setBranchId] = useState("")

    useEffect(() => {
        if (canViewAllBranches && branches.length === 0) {
            fetchBranches()
        }
    }, [canViewAllBranches, branches.length, fetchBranches])

    useEffect(() => {
        const params: any = {
            start_date: startDate,
            end_date: endDate,
        }

        let branchFilter: string | undefined
        if (canViewAllBranches && branchId) {
            branchFilter = branchId
        } else if (!canViewAllBranches && userBranchId) {
            branchFilter = userBranchId
        }

        fetchSales(params, branchFilter)
    }, [startDate, endDate, branchId, userBranchId, canViewAllBranches, fetchSales])

    const handleExport = () => {
        if (!canExportReports) {
            alert("You don't have permission to export reports")
            return
        }

        // Create CSV
        const headers = ["Sale Number", "Branch", "Cashier", "Items", "Total Amount", "Payment Method", "Status", "Date"]
        const csvData = sales.map(sale => [
            sale.sale_number,
            sale.branch_name,
            sale.cashier_name,
            sale.items_count,
            sale.total_amount,
            sale.payment_method,
            sale.status,
            new Date(sale.created_at).toLocaleDateString()
        ])

        const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n")
        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `sales_report_${startDate}_to_${endDate}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0)
    const totalItems = sales.reduce((sum, sale) => sum + sale.items_count, 0)
    const avgTransaction = sales.length > 0 ? totalRevenue / sales.length : 0

    const allowedRoles: AppRole[] = ["admin", "manager", "finance"]

    return (
        <RoleGuard allowedRoles={allowedRoles}>
            <div className="min-h-screen bg-[#F9FAFB] p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Sales Reports</h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Analyze sales performance and trends
                            </p>
                        </div>
                        {canExportReports && (
                            <button
                                onClick={handleExport}
                                disabled={sales.length === 0}
                                className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                            >
                                <Download className="h-4 w-4" />
                                Export Report
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="rounded-sm border border-slate-200 bg-white p-5">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-slate-400" />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                />
                                <span className="text-sm text-slate-500">to</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                />
                            </div>

                            {canViewAllBranches && (
                                <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-slate-400" />
                                    <select
                                        value={branchId}
                                        onChange={(e) => setBranchId(e.target.value)}
                                        className="rounded-sm border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                    >
                                        <option value="">All Branches</option>
                                        {branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-sm border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                        Total Transactions
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        {sales.length}
                                    </h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50">
                                    <BarChart3 className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                        Total Revenue
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        ₦{totalRevenue.toLocaleString()}
                                    </h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-green-50">
                                    <BarChart3 className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                        Total Items Sold
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        {totalItems}
                                    </h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-purple-50">
                                    <BarChart3 className="h-5 w-5 text-purple-600" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-sm border border-slate-200 bg-white p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                        Average Transaction
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold text-slate-900">
                                        ₦{avgTransaction.toLocaleString()}
                                    </h2>
                                </div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
                                    <BarChart3 className="h-5 w-5 text-amber-600" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sales Table */}
                    {loading.sales ? (
                        <SalesTableSkeleton />
                    ) : sales.length > 0 ? (
                        <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
                            <div className="border-b border-slate-200 px-5 py-4">
                                <h3 className="text-lg font-semibold text-slate-900">Transaction Details</h3>
                                <p className="text-sm text-slate-500">
                                    Showing {sales.length} transactions from {startDate} to {endDate}
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Sale Number
                                            </th>
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Branch
                                            </th>
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Cashier
                                            </th>
                                            <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Items
                                            </th>
                                            <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Total Amount
                                            </th>
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Payment Method
                                            </th>
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Status
                                            </th>
                                            <th className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                                                Date
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales.map((sale) => (
                                            <tr
                                                key={sale.sale_id}
                                                className="border-b border-slate-100 cursor-pointer hover:bg-slate-50"
                                                onClick={() => window.location.href = `/dashboard/admin/sales/${sale.sale_id}`}
                                            >
                                                <td className="px-5 py-4 font-mono text-xs font-medium text-slate-900">
                                                    {sale.sale_number}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">{sale.branch_name}</td>
                                                <td className="px-5 py-4 text-slate-600">{sale.cashier_name}</td>
                                                <td className="px-5 py-4 text-right text-slate-600">{sale.items_count}</td>
                                                <td className="px-5 py-4 text-right font-semibold text-slate-900">
                                                    ₦{sale.total_amount.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-4 text-slate-600">{sale.payment_method}</td>
                                                <td className="px-5 py-4">
                                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${sale.status === "Completed"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-red-50 text-red-700"
                                                        }`}>
                                                        {sale.status}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-slate-500">
                                                    {new Date(sale.created_at).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <EmptySalesState message={`No sales found for the selected period`} />
                    )}
                </div>
            </div>
        </RoleGuard>
    )
}