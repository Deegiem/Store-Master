// src/components/products/ProductTable.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Package } from "lucide-react"
import type { Product } from "@/types/products"

interface Props {
  products: Product[]
  loading: boolean
}

export default function ProductTable({ products, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-sm border border-slate-200 bg-white p-12">
        <div className="text-center">
          <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent mx-auto"></div>
          <p className="text-sm text-slate-500">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-sm border border-slate-200 bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Product
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                SKU
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Price
              </th>
              <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                Margin
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
            {products.map((product, index) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#F3F4F6]">
                      <Package className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">Barcode: {product.barcode}</p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-slate-600">{product.sku}</td>
                <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                  ₦{product.price?.toLocaleString() ?? 0}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      (product.margin_percentage ?? 0) >= 15
                        ? "bg-green-50 text-green-700"
                        : (product.margin_percentage ?? 0) > 0
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {product.margin_percentage ?? 0}%
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                      product.is_priced
                        ? "bg-green-50 text-green-700"
                        : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {product.is_priced ? "Priced" : "Unpriced"}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/dashboard/admin/products/${product.id}`}
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
    </motion.div>
  )
}