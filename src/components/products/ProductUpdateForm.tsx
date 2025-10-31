"use client";

import { useState } from "react";
import { useProductStore } from "@/store/productStore";

interface Props {
  product_id: string;
  currentName: string;
  currentPrice: number;
  currentQuantity: number;
}

export default function ProductUpdateForm({
  product_id,
  currentName,
  currentPrice,
  currentQuantity,
}: Props) {
  const { updateProduct, loading } = useProductStore();
  const [form, setForm] = useState({
    name: currentName,
    quantity: currentQuantity,
    price: currentPrice,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(product_id, {
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });
    alert("Product updated successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-md rounded-lg border max-w-md space-y-4"
    >
      <h3 className="text-lg font-semibold text-blue-600">Update Product</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (₦)
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Updating..." : "Update Product"}
      </button>
    </form>
  );
}
