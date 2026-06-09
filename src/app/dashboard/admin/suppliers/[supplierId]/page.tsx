// src/app/dashboard/admin/suppliers/[supplierId]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Truck, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Building2
} from "lucide-react"
import { useSupplierStore } from "@/store/supplierStore"
import EditSupplierModal from "@/components/suppliers/EditSupplierModal"
import DeleteSupplierModal from "@/components/suppliers/DeleteSupplierModal"
import { SupplierDetailSkeleton } from "@/components/suppliers/SupplierDetailSkeleton"

export default function SupplierDetailsPage() {
  const { supplierId } = useParams()
  const router = useRouter()
  const { selectedSupplier, fetchSupplierById, loading, error } = useSupplierStore()
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  useEffect(() => {
    if (supplierId) {
      fetchSupplierById(supplierId as string)
    }
  }, [supplierId, fetchSupplierById])

  if (loading.selectedSupplier) {
    return <SupplierDetailSkeleton />
  }

  if (error.selectedSupplier) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center rounded-sm border border-red-200 bg-red-50 p-12 text-center">
            <p className="text-red-600">{error.selectedSupplier}</p>
            <button
              onClick={() => router.back()}
              className="mt-4 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedSupplier) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center rounded-sm border border-slate-200 bg-white p-12 text-center">
            <Truck className="h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">Supplier not found</p>
            <button
              onClick={() => router.back()}
              className="mt-4 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-4 py-2 text-sm font-semibold text-white"
            >
              Back to Suppliers
            </button>
          </div>
        </div>
      </div>
    )
  }

  const infoCards = [
    { label: "Contact Person", value: selectedSupplier.contact_person, icon: User },
    { label: "Email", value: selectedSupplier.email, icon: Mail },
    { label: "Phone", value: selectedSupplier.phone, icon: Phone },
    { label: "Address", value: selectedSupplier.address, icon: MapPin },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <button
              onClick={() => router.back()}
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#003e9d] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Suppliers
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-[#003e9d]/10">
                <Truck className="h-6 w-6 text-[#003e9d]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  {selectedSupplier.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Supplier profile and operational details
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenEdit(true)}
              className="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Edit className="h-4 w-4" />
              Edit Supplier
            </button>
            <button
              onClick={() => setOpenDelete(true)}
              className="inline-flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
        >
          {selectedSupplier.is_active ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-green-700">Active</span>
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 text-red-600" />
              <span className="text-red-700">Inactive</span>
            </>
          )}
        </motion.div>

        {/* Info Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {infoCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="rounded-sm border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F3F4F6]">
                  <card.icon className="h-5 w-5 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 break-words">
                    {card.value || "—"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-sm border border-slate-200 bg-white p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F3F4F6]">
              <Building2 className="h-5 w-5 text-slate-500" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Supplier ID
              </p>
              <p className="mt-1 font-mono text-sm text-slate-600">
                {selectedSupplier.id}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Modals */}
        <EditSupplierModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          supplier={selectedSupplier}
        />
        <DeleteSupplierModal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          supplier={selectedSupplier}
        />
      </div>
    </div>
  )
}