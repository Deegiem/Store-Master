// src/app/dashboard/admin/suppliers/page.tsx
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Truck, Filter, Search } from "lucide-react"
import { useSupplierStore } from "@/store/supplierStore"
import SupplierTable from "@/components/suppliers/SupplierTable"
import SupplierStats from "@/components/suppliers/SupplierStats"
import CreateSupplierModal from "@/components/suppliers/CreateSupplierModal"
import { SupplierFilters } from "@/components/suppliers/SupplierFilters"
import { SupplierSkeleton } from "@/components/suppliers/SupplierSkeleton"

export default function SuppliersPage() {
  const { suppliers, total, fetchSuppliers, loading, error } = useSupplierStore()
  const [openCreate, setOpenCreate] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = !searchTerm || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && supplier.is_active) ||
      (statusFilter === "inactive" && !supplier.is_active)
    
    return matchesSearch && matchesStatus
  })

  if (loading.suppliers) {
    return <SupplierSkeleton />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              <Truck className="h-3.5 w-3.5" />
              Vendor Management
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Suppliers
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage vendor partnerships and procurement sources
            </p>
          </div>

          <button
            onClick={() => setOpenCreate(true)}
            className="group flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-6 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add Supplier
          </button>
        </motion.div>

        {/* Stats */}
        <SupplierStats
          total={total}
          active={suppliers.filter(s => s.is_active).length}
          inactive={suppliers.filter(s => !s.is_active).length}
        />

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, contact, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 w-full rounded-sm border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
            />
          </div>
          
          <SupplierFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
        </div>

        {/* Error State */}
        {error.suppliers && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600"
          >
            {error.suppliers}
          </motion.div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
          </p>
        </div>

        {/* Supplier Table */}
        <SupplierTable suppliers={filteredSuppliers} loading={loading.suppliers} />

        {/* Create Modal */}
        <CreateSupplierModal open={openCreate} onClose={() => setOpenCreate(false)} />
      </div>
    </div>
  )
}