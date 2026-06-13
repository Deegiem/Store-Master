// src/components/suppliers/SupplierTable.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Truck, Mail, Phone } from "lucide-react"
import type { Supplier } from "@/types/supplier"

interface SupplierTableProps {
  suppliers: Supplier[]
  loading: boolean
}

export default function SupplierTable({ suppliers, loading }: SupplierTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
          <p className="text-sm text-slate-500">Loading suppliers...</p>
        </div>
      </div>
    )
  }

  if (suppliers.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-sm border border-slate-200 bg-white">
        <Truck className="h-12 w-12 text-slate-400" />
        <p className="mt-4 text-lg font-semibold text-slate-900">No suppliers found</p>
        <p className="mt-1 text-sm text-slate-500">Create your first supplier to get started</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Supplier
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Contact Person
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Contact Info
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Status
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <motion.tr
                key={supplier.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F3F4F6]">
                      <Truck className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{supplier.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-sm text-slate-700">{supplier.contact_person || "—"}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{supplier.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">{supplier.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      supplier.is_active
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {supplier.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right">
                  <Link
                    href={`/dashboard/admin/suppliers/${supplier.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#003e9d] transition hover:gap-2"
                  >
                    View
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}