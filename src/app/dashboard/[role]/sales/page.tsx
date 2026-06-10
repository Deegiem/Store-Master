"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams } from "next/navigation"
import { Plus, Building2 } from "lucide-react"
import { RoleGuard } from "@/components/RoleGuard"
import { usePermissions } from "@/hooks/usePermissions"
import { useSalesStore } from "@/store/saleStore"
import { useBranchStore } from "@/store/useBranchStore"
import { SalesStats } from "@/components/sales/SalesStats"
import { SalesFilters, type PaymentMethodFilter } from "@/components/sales/SalesFilters"
import { SalesListTable } from "@/components/sales/SalesListTable"
import { SalesTableSkeleton } from "@/components/sales/SalesTableSkeleton"
import { EmptySalesState } from "@/components/sales/EmptySalesState"
import { NewSaleModal } from "@/components/sales/NewSaleModal"
import type { AppRole } from "@/lib/roleMapper"

export default function SalesPage() {
    const params = useParams()
    const currentRole = params.role as string
    const { userBranchId, canViewAllBranches, canCreateSale, canViewTodaysSales } = usePermissions()
    const { branches, fetchBranches } = useBranchStore()

    const { sales, todaysSales, fetchSales, fetchTodaysSales, loading } = useSalesStore()

    const [search, setSearch] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodFilter>("all")
    const [branchId, setBranchId] = useState("")
    const [showNewSaleModal, setShowNewSaleModal] = useState(false)
    const [selectedBranchForNewSale, setSelectedBranchForNewSale] = useState("")

    // Load branches for admin users
    useEffect(() => {
        if (canViewAllBranches && branches.length === 0) {
            fetchBranches()
        }
    }, [canViewAllBranches, branches.length, fetchBranches])

    // Fetch ALL sales (API doesn't support branch filtering)
    const loadSales = useCallback(async () => {
        const params: any = {}

        if (search) params.search = search
        if (startDate) params.start_date = startDate
        if (endDate) params.end_date = endDate
        if (paymentMethod !== "all") params.payment_method = paymentMethod

        // Don't send branch_id to API - it doesn't work
        await fetchSales(params, undefined)
    }, [search, startDate, endDate, paymentMethod, fetchSales])

    const loadTodaysSales = useCallback(async () => {
        if (!canViewTodaysSales) return
        await fetchTodaysSales(undefined)
    }, [canViewTodaysSales, fetchTodaysSales])

    useEffect(() => {
        loadSales()
    }, [loadSales])

    useEffect(() => {
        loadTodaysSales()
    }, [loadTodaysSales])

    // Client-side filtering for branch
    const filteredSales = useMemo(() => {
        let filtered = [...sales]
        
        // Filter by branch (client-side since API doesn't support it)
        if (canViewAllBranches && branchId) {
            filtered = filtered.filter(sale => sale.branch_name === branches.find(b => b.id === branchId)?.name)
        } else if (!canViewAllBranches && userBranchId) {
            const userBranchName = branches.find(b => b.id === userBranchId)?.name
            if (userBranchName) {
                filtered = filtered.filter(sale => sale.branch_name === userBranchName)
            }
        }
        
        return filtered
    }, [sales, branchId, canViewAllBranches, userBranchId, branches])

    const allowedRoles: AppRole[] = ["admin", "manager", "sales"]

    const handleNewSaleClick = () => {
        if (canViewAllBranches && !branchId) {
            alert("Please select a branch first")
            return
        }
        setSelectedBranchForNewSale(canViewAllBranches ? branchId : userBranchId || "")
        setShowNewSaleModal(true)
    }

    return (
        <RoleGuard allowedRoles={allowedRoles}>
            <div className="min-h-screen bg-[#F9FAFB] p-6">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Sales Management</h1>
                            <p className="mt-1 text-sm text-slate-500">
                                View and manage all sales transactions
                            </p>
                        </div>
                        {canCreateSale && (
                            <button
                                onClick={handleNewSaleClick}
                                disabled={canViewAllBranches && !branchId}
                                className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
                            >
                                <Plus className="h-4 w-4" />
                                New Sale
                            </button>
                        )}
                    </div>

                    {/* Branch Selector for Admin */}
                    {canViewAllBranches && branches.length > 0 && (
                        <div className="rounded-sm border border-slate-200 bg-white p-5">
                            <div className="flex items-center gap-3">
                                <Building2 className="h-5 w-5 text-slate-400" />
                                <label className="text-sm font-medium text-slate-700">Select Branch</label>
                                <select
                                    value={branchId}
                                    onChange={(e) => setBranchId(e.target.value)}
                                    className="flex-1 max-w-xs rounded-sm border border-slate-200 bg-[#F3F4F6] px-3 py-2 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
                                >
                                    <option value="">All Branches</option>
                                    {branches.map((branch) => (
                                        <option key={branch.id} value={branch.id}>
                                            {branch.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {!branchId && (
                                <p className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                                    <span className="text-base">⚠️</span>
                                    Please select a specific branch to create a new sale
                                </p>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    {canViewTodaysSales && todaysSales && (canViewAllBranches ? true : branchId) && (
                        <SalesStats
                            total_sales={filteredSales.length}
                            total_revenue={filteredSales.reduce((sum, sale) => sum + sale.total_amount, 0)}
                            total_items_sold={filteredSales.reduce((sum, sale) => sum + sale.items_count, 0)}
                            average_transaction_value={filteredSales.length > 0 ? filteredSales.reduce((sum, sale) => sum + sale.total_amount, 0) / filteredSales.length : 0}
                            currency_symbol="₦"
                        />
                    )}

                    {/* Filters */}
                    <SalesFilters
                        search={search}
                        setSearch={setSearch}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        endDate={endDate}
                        setEndDate={setEndDate}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        branchId={branchId}
                        setBranchId={setBranchId}
                    />

                    {/* Sales Table - Use filteredSales */}
                    {loading.sales ? (
                        <SalesTableSkeleton />
                    ) : filteredSales.length > 0 ? (
                        <SalesListTable sales={filteredSales} currentRole={currentRole} />
                    ) : (
                        <EmptySalesState message="No sales found matching your criteria" />
                    )}
                </div>
            </div>

            {/* New Sale Modal */}
            {selectedBranchForNewSale && (
                <NewSaleModal
                    open={showNewSaleModal}
                    onClose={() => setShowNewSaleModal(false)}
                    onSuccess={() => {
                        loadSales()
                        loadTodaysSales()
                    }}
                    branchId={selectedBranchForNewSale}
                />
            )}
        </RoleGuard>
    )
}