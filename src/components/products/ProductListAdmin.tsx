"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useProductStore } from "@/store/productStore";
import type { Product } from "@/types/products";

export default function ProductList() {
  const { products, fetchProducts, updateProduct, loading } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 🛠 Handle Edit Click
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  // ✅ Handle Product Update
  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.product_id, {
        name: form.name,
        price: form.price,
        quantity: form.quantity,
      });

      toast.success("✅ Product updated successfully!");
      setEditingProduct(null);
      await fetchProducts(); // Refresh list
    } catch (error: any) {
      toast.error(error?.message || "❌ Failed to update product.");
    }
  };

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
              <th className="px-5 py-3 border-b border-blue-100">Actions</th>
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
                <td className="px-5 py-3 border-b border-blue-100">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">
              Edit Product
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-blue-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: Number(e.target.value) })
                }
                className="w-full border border-blue-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: Number(e.target.value) })
                }
                className="w-full border border-blue-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
