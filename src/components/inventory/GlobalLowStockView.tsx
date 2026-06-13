"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Building2, Package, Search, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { useBranchStore } from "@/store/useBranchStore"
import { useInventoryStore } from "@/store/useInventoryStore"
import { InventorySkeleton } from "./InventorySkeleton"

interface LowStockItemWithBranch {
  branch_id: string
  branch_name: string
  product_id: string
  product_name: string
  quantity: number
  reorder_point: number
}

export function GlobalLowStockView() {
  const router = useRouter()
  const { branches, fetchBranches, branchloading } = useBranchStore()
  const { fetchLowStockItems } = useInventoryStore()
  const [allLowStockItems, setAllLowStockItems] = useState<LowStockItemWithBranch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBranch, setSelectedBranch] = useState("")

  useEffect(() => {
    if (branches.length === 0) {
      fetchBranches()
    }
  }, [branches.length, fetchBranches])

  // Fetch low stock items for all branches
  useEffect(() => {
    const fetchAllLowStock = async () => {
      if (branches.length === 0) return
      
      setIsLoading(true)
      const items: LowStockItemWithBranch[] = []
      
      for (const branch of branches) {
        try {
          await fetchLowStockItems(branch.id, 1, 100)
          
          // Get the low stock items from the store after fetch
          const state = useInventoryStore.getState()
          const branchItems = state.lowStockItems || []
          
          branchItems.forEach((item: any) => {
            items.push({
              branch_id: branch.id,
              branch_name: branch.name,
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              reorder_point: item.reorder_point
            })
          })
        } catch (err) {
          console.error(`Failed to fetch low stock for branch ${branch.name}:`, err)
        }
      }
      
      setAllLowStockItems(items)
      setIsLoading(false)
    }
    
    if (branches.length > 0) {
      fetchAllLowStock()
    }
  }, [branches, fetchLowStockItems])

  // Filter low stock items
  const filteredItems = allLowStockItems.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBranch = selectedBranch === "" || item.branch_id === selectedBranch
    
    return matchesSearch && matchesBranch
  })

  const handleViewBranch = (branchId: string) => {
    router.push(`/dashboard/purchase/inventory/${branchId}?tab=low-stock`)
  }

  const totalLowStockItems = allLowStockItems.length
  const affectedBranches = new Set(allLowStockItems.map(i => i.branch_id)).size

  if (branchloading.branches || isLoading) {
    return <InventorySkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Total Low Stock Items
              </p>
              <h2 className="mt-2 text-2xl font-bold text-amber-600">
                {totalLowStockItems}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-amber-50">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Affected Branches
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {affectedBranches}
              </h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-blue-50">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-sm border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by product name or branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-sm border border-slate-200 bg-[#F3F4F6] pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d]"
          />
        </div>
        
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="h-10 rounded-sm border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:border-[#003e9d] focus:outline-none focus:ring-1 focus:ring-[#003e9d] sm:w-48"
        >
          <option value="">All Branches</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Low Stock Items Table */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-green-400" />
          <p className="mt-4 text-lg font-semibold text-slate-900">No Low Stock Items</p>
          <p className="mt-1 text-sm text-slate-500">
            All branches have sufficient stock levels
          </p>
        </div>
      ) : (
        <div className="rounded-sm border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-lg font-semibold text-slate-900">Low Stock Items by Branch</h3>
            <p className="text-sm text-slate-500">
              Showing {filteredItems.length} low stock items across {new Set(filteredItems.map(i => i.branch_id)).size} branches
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Branch
                    </th>
                    <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Product
                    </th>
                    <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Current Stock
                    </th>
                    <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Reorder Point
                    </th>
                    <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Status
                    </th>
                    <th className="whitespace-nowrap px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredItems.map((item, index) => {
                    const isCritical = item.quantity === 0
                    const uniqueKey = `${item.branch_id}-${item.product_id}-${index}`
                    
                    return (
                      <tr key={uniqueKey} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            <span className="font-medium text-slate-900">{item.branch_name}</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                          {item.product_name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className={`font-semibold ${isCritical ? 'text-red-600' : 'text-amber-600'}`}>
                            {item.quantity} units
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-slate-500">
                          {item.reorder_point} units
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-right">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            isCritical ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {isCritical ? 'Out of Stock' : 'Low Stock'}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-5 py-4 text-center">
                          <button
                            onClick={() => handleViewBranch(item.branch_id)}
                            className="inline-flex items-center gap-1 text-[#003e9d] hover:underline"
                          >
                            <Eye className="h-4 w-4" />
                            View Branch
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}