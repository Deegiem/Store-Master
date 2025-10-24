"use client"

import { useEffect } from "react"
import { useSupplierStore } from "@/store/supplierStore"

export default function SuppliersDashboard() {
  const { suppliers, fetchSuppliers, loading, error } = useSupplierStore()

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Suppliers Overview</h2>
      <p className="text-gray-600">Manage your suppliers efficiently.</p>

      {loading && <p>Loading suppliers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <div
            key={supplier.supplier_id}
            className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-800">
              {supplier.supplier_name}
            </h3>
            <p className="text-gray-600 text-sm">{supplier.company_name}</p>
            <p className="text-gray-500 text-sm mt-1">{supplier.email}</p>
            <p className="text-gray-500 text-sm">{supplier.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
