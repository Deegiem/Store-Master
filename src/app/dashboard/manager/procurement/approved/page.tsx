// src/app/dashboard/admin/procurement/approved/page.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Search, Filter, Calendar, Building2, Package, DollarSign } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { ApprovedOrderCard } from "@/components/procurement/ApprovedOrderCard"
import { ApprovedOrdersSkeleton } from "@/components/procurement/ApprovedOrdersSkeleton"
import { EmptyApprovedState } from "@/components/procurement/EmptyApprovedState"

export default function ApprovedOrdersPage() {
  const { list, fetchAll, loading } = useProcurementStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [branchFilter, setBranchFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const approvedOrders = list.filter(order => order.status === "Approved")

  // Get unique branches for filter
  const branches = ["all", ...new Set(approvedOrders.map(order => order.target_branch))]

  const filteredOrders = approvedOrders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.target_branch.toLowerCase().includes(searchTerm.toLowerCase())
    
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

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0)

  if (loading.list) {
    return <ApprovedOrdersSkeleton />
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-7xl space-y-6">
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
            <p className="text-2xl font-bold text-slate-900">₦{approvedOrders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}</p>
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
        {filteredOrders.length === 0 ? (
          <EmptyApprovedState hasFilters={!!(searchTerm || branchFilter !== "all" || dateRange.start || dateRange.end)} />
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
