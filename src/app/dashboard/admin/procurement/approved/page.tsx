"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Search, Eye } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { usePermissions } from "@/hooks/usePermissions"
import { useAuthStore } from "@/store/useAuthStore"
import { ApprovedOrderCard } from "@/components/procurement/ApprovedOrderCard"
import { ApprovedOrdersSkeleton } from "@/components/procurement/ApprovedOrdersSkeleton"
import { EmptyApprovedState } from "@/components/procurement/EmptyApprovedState"

export default function ApprovedOrdersPage() {
  const { list, fetchAll, loading } = useProcurementStore()
  const { profile } = useAuthStore() // Get profile from auth store
  const { 
    isAdmin,
    isFinance,
    isPurchase,
    isManager,
    userBranchId
  } = usePermissions()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  useEffect(() => {
    // API Access Control for viewing approved orders:
    // - Finance Manager / Admin: Can view all Purchase Orders system-wide
    // - Purchase Manager: Can only view Purchase Orders they created
    // - Store Manager: Can only view Purchase Orders for their assigned branch
    const fetchApprovedOrders = async () => {
      if (isAdmin || isFinance) {
        await fetchAll({ status: "Approved" })
      } else if (isPurchase) {
        await fetchAll({ status: "Approved", created_by: profile?.id })
      } else if (isManager && userBranchId) {
        await fetchAll({ branch_id: userBranchId, status: "Approved" })
      }
    }
    
    fetchApprovedOrders()
  }, [fetchAll, isAdmin, isFinance, isPurchase, isManager, userBranchId, profile?.id])

  // Filter approved orders from the list
  let approvedOrders = list.filter(order => order.status === "Approved")

  // Permission check
  const canViewApprovedOrders = isAdmin || isFinance || isPurchase || isManager

  if (!canViewApprovedOrders) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <Eye className="mx-auto h-12 w-12 text-red-400" />
            <p className="mt-4 text-lg font-semibold text-red-600">Access Denied</p>
            <p className="mt-1 text-sm text-red-500">
              You don't have permission to view approved purchase orders.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Get unique branches for filter (only for admin/finance)
  const branches = ["all", ...new Set(approvedOrders.map(order => order.target_branch).filter(Boolean))]

  const filteredOrders = approvedOrders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.supplier_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.target_branch?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBranch = branchFilter === "all" || order.target_branch === branchFilter
    
    let matchesDate = true
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(order.created_at) >= new Date(dateRange.start)
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(order.created_at) <= new Date(dateRange.end)
    }
    
    return matchesSearch && matchesBranch && matchesDate
  })

  const totalValue = filteredOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)

  if (loading.list) {
    return <ApprovedOrdersSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              <CheckCircle className="h-3.5 w-3.5" />
              Approved Orders
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Approved Purchase Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View all approved procurement orders ready for receiving
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
              Total Value: ₦{totalValue.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Approved</p>
            <p className="text-2xl font-bold text-slate-900">{approvedOrders.length}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Value</p>
            <p className="text-2xl font-bold text-slate-900">₦{approvedOrders.reduce((s, o) => s + (o.total_amount || 0), 0).toLocaleString()}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Unique Suppliers</p>
            <p className="text-2xl font-bold text-slate-900">{new Set(approvedOrders.map(o => o.supplier_name)).size}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Branches</p>
            <p className="text-2xl font-bold text-slate-900">{new Set(approvedOrders.map(o => o.target_branch)).size}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by supplier or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {(isAdmin || isFinance) && branches.length > 1 && (
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch === "all" ? "All Branches" : branch}
                  </option>
                ))}
              </select>
            )}

            <input
              type="date"
              placeholder="From"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
            <input
              type="date"
              placeholder="To"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
        </div>

        {/* Results Count */}
        {approvedOrders.length > 0 && (
          <p className="text-sm text-slate-500">
            Showing {filteredOrders.length} of {approvedOrders.length} approved orders
          </p>
        )}

        {/* Content */}
        {approvedOrders.length === 0 ? (
          <EmptyApprovedState hasFilters={false} />
        ) : filteredOrders.length === 0 ? (
          <EmptyApprovedState hasFilters={true} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order, index) => (
              <ApprovedOrderCard key={order.po_id} order={order} delay={index * 0.05} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}