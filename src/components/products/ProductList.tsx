// /components/products/ProductList.tsx
"use client";

import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";

export default function ProductList() {
  const { products, fetchProducts, deleteProduct, loading } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) return <p>Loading products...</p>;
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">All Products</h3>
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Qty</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Threshold</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id} className="border-b">
              <td className="p-3 border">{p.name}</td>
              <td className="p-3 border">{p.quantity}</td>
              <td className="p-3 border">₦{p.price}</td>
              <td className="p-3 border">{p.threshold}</td>
              <td className="p-3 border">
                <button
                  onClick={() => deleteProduct(p.product_id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
