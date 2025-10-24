"use client"

import { useEffect, useState } from "react"
import { useSaleStore } from "@/store/saleStore"

export default function SalesList() {
  const { sales, fetchSales, recordSale, loading, error } = useSaleStore()
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState<number>(0)

  useEffect(() => {
    fetchSales()
  }, [fetchSales])

  const handleSell = async () => {
    if (!productId || quantity <= 0) return
    await recordSale({ product_id: productId, quantity })
    setProductId("")
    setQuantity(0)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Sales Records</h2>

      {/* Record Sale Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="font-medium mb-2">Record New Sale</h3>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="border p-2 rounded-lg flex-1"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded-lg w-32"
          />
          <button
            onClick={handleSell}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Sell
          </button>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        {loading ? (
          <p>Loading sales...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Product ID</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Sold At</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((sale) => (
                  <tr key={sale.sale_id} className="border-b text-sm">
                    <td className="py-2">{sale.product_id}</td>
                    <td className="py-2">{sale.quantity}</td>
                    <td className="py-2">{sale.sold_at ? new Date(sale.sold_at).toLocaleString() : "—"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No sales recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
