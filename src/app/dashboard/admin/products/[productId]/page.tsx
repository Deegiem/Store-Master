"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Tag,
  Calendar,
  Edit,
  Trash2,
  Package,
} from "lucide-react"

import { useProductStore } from "@/store/productStore"
import { usePermissions } from "@/hooks/usePermissions"
import SetPriceModal from "@/components/products/SetPriceModal"
import DeleteProductModal from "@/components/products/DeleteProductModal"

export default function ProductDetailsPage() {
  const params = useParams()
  const productId = params.productId as string

  const { selectedProduct, fetchProductById, productloading } = useProductStore()
  const { canSetProductPrice, canDeleteProduct, canViewPriceHistory } = usePermissions()

  const [openPriceModal, setOpenPriceModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    fetchProductById(productId)
  }, [productId, fetchProductById])

  if (productloading.selectedProduct) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
          <p className="text-sm text-slate-500">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!selectedProduct) {
    return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">Product not found</p>
            <Link href="/dashboard/admin/products" className="mt-4 inline-block text-[#003e9d] underline">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      label: "Current Price",
      value: `₦${selectedProduct.price?.toLocaleString() ?? 0}`,
      icon: DollarSign,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Cost Price",
      value: `₦${selectedProduct.cost_price?.toLocaleString() ?? 0}`,
      icon: Tag,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Margin",
      value: `${selectedProduct.margin_percentage ?? 0}%`,
      icon: TrendingUp,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Status",
      value: selectedProduct.is_priced ? "Priced" : "Unpriced",
      icon: Package,
      color: selectedProduct.is_priced ? "bg-green-50" : "bg-orange-50",
      iconColor: selectedProduct.is_priced ? "text-green-600" : "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <Link
              href="/dashboard/admin/products"
              className="mb-4 inline-flex items-center gap-2 text-sm text-[#003e9d] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {selectedProduct.name}
            </h1>
            <p className="mt-1 font-mono text-sm text-slate-500">SKU: {selectedProduct.sku}</p>
          </div>

          <div className="flex gap-3">
            {canSetProductPrice && (
              <button
                onClick={() => setOpenPriceModal(true)}
                className="inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(0,71,195,0.25)] transition hover:-translate-y-0.5"
              >
                <Edit className="h-4 w-4" />
                Set Price
              </button>
            )}
            {canDeleteProduct && (
              <button
                onClick={() => setOpenDeleteModal(true)}
                className="inline-flex items-center gap-2 rounded-sm border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            )}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-sm border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-sm ${stat.color}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-sm border border-slate-200 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900">Product Information</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Barcode</p>
              <p className="mt-1 font-mono text-sm text-slate-900">{selectedProduct.barcode || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Category</p>
              <p className="mt-1 text-sm text-slate-900">{selectedProduct.category_name || "—"}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Created At</p>
              <p className="mt-1 text-sm text-slate-900">
                {new Date(selectedProduct.created_at).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Last Updated</p>
              <p className="mt-1 text-sm text-slate-900">
                {selectedProduct.updated_at
                  ? new Date(selectedProduct.updated_at).toLocaleDateString()
                  : "-"}
              </p>
            </div>
          </div>

          {selectedProduct.description && (
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Description</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {selectedProduct.description}
              </p>
            </div>
          )}

          {canViewPriceHistory && (
            <div className="mt-8">
              <Link
                href={`/dashboard/admin/products/${productId}/price-history`}
                className="inline-flex items-center gap-2 rounded-sm border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <Calendar className="h-4 w-4" />
                View Price History
              </Link>
            </div>
          )}
        </motion.div>
      </div>

      {canSetProductPrice && (
        <SetPriceModal open={openPriceModal} onClose={() => setOpenPriceModal(false)} productId={productId} />
      )}
      {canDeleteProduct && (
        <DeleteProductModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} productId={productId} />
      )}
    </div>
  )
}