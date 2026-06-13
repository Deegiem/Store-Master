// src/app/dashboard/admin/products/[productId]/price-history/page.tsx
"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, History, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { useProductStore } from "@/store/productStore"

export default function PriceHistoryPage() {
  const params = useParams()
  const productId = params.productId as string
  const { priceHistory, fetchPriceHistory, productloading, error } = useProductStore()

  useEffect(() => {
    if (productId) {
      fetchPriceHistory(productId)
    }
  }, [productId, fetchPriceHistory])

  if (productloading.priceHistory) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#003e9d] border-t-transparent"></div>
          <p className="text-sm text-slate-500">Loading price history...</p>
        </div>
      </div>
    )
  }

  if (error.priceHistory) {
    return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-sm border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">{error.priceHistory}</p>
            <Link href={`/dashboard/admin/products/${productId}`} className="mt-4 inline-block text-[#003e9d] underline">
              Back to Product
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!priceHistory) {
    return (
     <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-12 text-center">
            <History className="mx-auto h-12 w-12 text-slate-400" />
            <p className="mt-4 text-lg font-semibold text-slate-900">No price history found</p>
            <p className="mt-1 text-sm text-slate-500">This product has no price changes yet</p>
            <Link
              href={`/dashboard/admin/products/${productId}`}
              className="mt-6 inline-block rounded-sm bg-gradient-to-r from-[#003e9d] to-[#0050c9] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Back to Product
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const summaryStats = [
    {
      label: "Current Price",
      value: `₦${priceHistory.current_price?.toLocaleString() ?? 0}`,
      icon: DollarSign,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label: "Total Changes",
      value: priceHistory.total_changes,
      icon: History,
      color: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Status",
      value: priceHistory.is_priced ? "Priced" : "Unpriced",
      icon: TrendingUp,
      color: priceHistory.is_priced ? "bg-green-50" : "bg-orange-50",
      iconColor: priceHistory.is_priced ? "text-green-600" : "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-2 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href={`/dashboard/admin/products/${productId}`}
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#003e9d] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Price History</h1>
          <p className="mt-1 text-sm text-slate-500">{priceHistory.product_name}</p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-3">
          {summaryStats.map((stat, index) => (
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

        {/* History Table */}
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
                    Date
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Old Price
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    New Price
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Margin
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Changed By
                  </th>
                  <th className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceHistory.history.map((item, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                      {new Date(item.change_date).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {item.old_price ? `₦${item.old_price.toLocaleString()}` : "—"}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                      ₦{item.new_price?.toLocaleString() ?? 0}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          (item.new_margin ?? 0) >= 15
                            ? "bg-green-50 text-green-700"
                            : (item.new_margin ?? 0) > 0
                            ? "bg-yellow-50 text-yellow-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {item.new_margin ?? 0}%
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <div>
                        <p className="font-medium text-slate-900">{item.changed_by}</p>
                        <p className="text-xs text-slate-500">{item.changed_by_role}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">{item.reason || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}