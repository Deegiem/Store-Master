"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";

export default function ProductList() {
  const { products, fetchProducts, loading } = useProductStore();


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);



  // ✅ Handle Product Update


  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-700">All Products</h3>
        <span className="text-md text-blue-500 font-medium">
          Total: {products.length}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full text-sm text-left border border-blue-100 rounded-lg overflow-hidden">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs font-semibold tracking-wide">
            <tr>
              <th className="px-5 py-3 border-b border-blue-100">Name</th>
              <th className="px-5 py-3 border-b border-blue-100">Qty</th>
              <th className="px-5 py-3 border-b border-blue-100">Price</th>
              <th className="px-5 py-3 border-b border-blue-100">Threshold</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.product_id}
                className={`transition-all duration-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-blue-50/30"
                } hover:bg-blue-100/50`}
              >
                <td className="px-5 py-3 border-b border-blue-100 text-gray-800 font-medium">
                  {p.name}
                </td>
                <td className="px-5 py-3 border-b border-blue-100 text-gray-700">
                  {p.quantity}
                </td>
                <td className="px-5 py-3 border-b border-blue-100 text-gray-800 font-semibold">
                  ₦{p.price.toLocaleString()}
                </td>
                <td className="px-5 py-3 border-b border-blue-100 text-gray-700">
                  {p.threshold}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
    
    </div>
  );
}
