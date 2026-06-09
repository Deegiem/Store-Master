"use client"

import { useState, useEffect, useCallback } from "react"
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
    const [branchId, setBranchId] = useState("") // Start with empty string for "All Branches"
    const [showNewSaleModal, setShowNewSaleModal] = useState(false)
    const [selectedBranchForNewSale, setSelectedBranchForNewSale] = useState("")

    // Load branches for admin users
    useEffect(() => {
        if (canViewAllBranches && branches.length === 0) {
            fetchBranches()
        }
    }, [canViewAllBranches, branches.length, fetchBranches])

    // DO NOT auto-set branchId - let it default to empty string for "All Branches"

    const loadSales = useCallback(async () => {
        const params: any = {}

        if (search) params.search = search
        if (startDate) params.start_date = startDate
        if (endDate) params.end_date = endDate
        if (paymentMethod !== "all") params.payment_method = paymentMethod

        // Determine branch filter
        let branchFilter: string | undefined
        if (canViewAllBranches) {
            // For admin: if branchId is empty, don't send branch filter (shows all branches)
            // If branchId has a value, filter by that branch
            branchFilter = branchId || undefined
        } else if (userBranchId) {
            // For non-admin: always filter by their branch
            branchFilter = userBranchId
        }

        console.log('Fetching sales with:', { params, branchFilter }) // Debug log
        await fetchSales(params, branchFilter)
    }, [search, startDate, endDate, paymentMethod, branchId, canViewAllBranches, userBranchId, fetchSales])

    const loadTodaysSales = useCallback(async () => {
        if (!canViewTodaysSales) return

        let branchFilter: string | undefined
        if (canViewAllBranches) {
            branchFilter = branchId || undefined
        } else if (userBranchId) {
            branchFilter = userBranchId
        }

        // Only fetch if we have a branch filter or we're admin (admin can see all branches)
        if (branchFilter || canViewAllBranches) {
            await fetchTodaysSales(branchFilter)
        }
    }, [canViewTodaysSales, canViewAllBranches, branchId, userBranchId, fetchTodaysSales])

    useEffect(() => {
        loadSales()
    }, [loadSales])

    useEffect(() => {
        loadTodaysSales()
    }, [loadTodaysSales])

    // Remove client-side filtering since API already handles it
    const allowedRoles: AppRole[] = ["admin", "manager", "sales"]

    // Handle new sale button click
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
                        </div>
                    )}

                    {/* Stats */}
                    {canViewTodaysSales && todaysSales && (canViewAllBranches ? true : branchId) && (
                        <SalesStats
                            total_sales={todaysSales.total_sales}
                            total_revenue={todaysSales.total_revenue}
                            total_items_sold={todaysSales.total_items_sold}
                            average_transaction_value={todaysSales.average_transaction_value}
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

                    {/* Sales Table */}
                    {loading.sales ? (
                        <SalesTableSkeleton />
                    ) : sales.length > 0 ? (
                        <SalesListTable sales={sales} currentRole={currentRole} />
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