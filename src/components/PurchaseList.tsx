"use client"

import { useEffect } from "react"
import { usePurchaseStore } from "@/store/purchaseStore"

export default function PurchaseList() {
  const { purchases, fetchPendingPurchases, approvePurchase, rejectPurchase, loading, error } = usePurchaseStore()

  useEffect(() => {
    fetchPendingPurchases()
  }, [fetchPendingPurchases])

  if (loading) return <p>Loading purchases...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Pending Purchases</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {purchases.map((purchase) => (
          <div
            key={purchase.purchase_id}
            className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
          >
            <p className="text-gray-700">
              <strong>Product ID:</strong> {purchase.product_id}
            </p>
            <p className="text-gray-700">
              <strong>Supplier ID:</strong> {purchase.supplier_id}
            </p>
            <p className="text-gray-700">
              <strong>Quantity:</strong> {purchase.quantity}
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => approvePurchase(purchase.purchase_id)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
              >
                Approve
              </button>
              <button
                onClick={() => rejectPurchase(purchase.purchase_id, "Stock not needed")}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
