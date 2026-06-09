// src/app/dashboard/admin/procurement/rejected/page.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { XCircle, Search, Filter, Calendar, Building2, Package, DollarSign, AlertTriangle } from "lucide-react"
import { useProcurementStore } from "@/store/useProcurementStore"
import { RejectedOrderCard } from "@/components/procurement/RejectedOrderCard"
import { RejectedOrdersSkeleton } from "@/components/procurement/RejectedOrdersSkeleton"
import { EmptyRejectedState } from "@/components/procurement/EmptyRejectedState"

export default function RejectedOrdersPage() {
  const { list, fetchAll, loading } = useProcurementStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [supplierFilter, setSupplierFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const rejectedOrders = list.filter(order => order.status === "Rejected")

  // Get unique suppliers for filter
  const suppliers = ["all", ...new Set(rejectedOrders.map(order => order.supplier_name))]

  const filteredOrders = rejectedOrders.filter(order => {
    const matchesSearch = !searchTerm || 
      order.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.target_branch.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSupplier = supplierFilter === "all" || order.supplier_name === supplierFilter
    
    let matchesDate = true
    if (dateRange.start) {
      matchesDate = matchesDate && new Date(order.created_at) >= new Date(dateRange.start)
    }
    if (dateRange.end) {
      matchesDate = matchesDate && new Date(order.created_at) <= new Date(dateRange.end)
    }
    
    return matchesSearch && matchesSupplier && matchesDate
  })

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.total_amount, 0)

  if (loading.list) {
    return <RejectedOrdersSkeleton />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
              <XCircle className="h-3.5 w-3.5" />
              Rejected Orders
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Rejected Purchase Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review rejected procurement requests and take necessary action
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="rounded-sm bg-white px-4 py-2 text-sm text-slate-600 border border-slate-200">
              Total Rejected: ₦{totalValue.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Rejected</p>
            <p className="text-2xl font-bold text-red-600">{rejectedOrders.length}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Value</p>
            <p className="text-2xl font-bold text-slate-900">₦{rejectedOrders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Affected Suppliers</p>
            <p className="text-2xl font-bold text-slate-900">{new Set(rejectedOrders.map(o => o.supplier_name)).size}</p>
          </div>
          <div className="rounded-sm border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Rejection Rate</p>
            <p className="text-2xl font-bold text-amber-600">
              {list.length ? Math.round((rejectedOrders.length / list.length) * 100) : 0}%
            </p>
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
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="h-11 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            >
              {suppliers.map(supplier => (
                <option key={supplier} value={supplier}>
                  {supplier === "all" ? "All Suppliers" : supplier}
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
        {rejectedOrders.length > 0 && (
          <p className="text-sm text-slate-500">
            Showing {filteredOrders.length} of {rejectedOrders.length} rejected orders
          </p>
        )}

        {/* Warning Banner */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center gap-3 rounded-sm border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              Rejected orders require review. Please coordinate with procurement team for resubmission.
            </p>
          </div>
        )}

        {/* Content */}
        {filteredOrders.length === 0 ? (
          <EmptyRejectedState hasFilters={!!(searchTerm || supplierFilter !== "all" || dateRange.start || dateRange.end)} />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredOrders.map((order, index) => (
              <RejectedOrderCard key={order.po_id} order={order} delay={index * 0.05} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
