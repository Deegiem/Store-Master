"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";

export default function ProductList() {
  const { products, fetchProducts, deleteProduct, updateProduct, loading } = useProductStore();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form, setForm] = useState({ name: "", price: 0, quantity: 0 });

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.product_id, form);
    setEditingProduct(null);
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
              <th className="px-5 py-3 border-b border-blue-100 text-center">Actions</th>
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
                <td className="px-5 py-3 border-b border-blue-100 text-center">
                  <div className="flex lg:flex-row sm:flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="w-full sm:w-auto text-sm text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-md py-1.5 px-5 font-medium shadow-sm transition-all duration-150"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.product_id)}
                      className="w-full sm:w-auto text-sm text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-md py-1.5 px-5 font-medium shadow-sm transition-all duration-150"
                    >
                      Delete
                    </button>
                  </div>
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
                onChange={(e) => setForm({ ...form, price: +e.target.value })}
                className="w-full border border-blue-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
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
