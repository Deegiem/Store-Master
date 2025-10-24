// /components/products/ProductForm.tsx
"use client";

import { useState } from "react";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { CreateProductPayload } from "@/types/products";

type ProductInput = CreateProductPayload["products"][number];


export default function ProductForm() {
  const { categories } = useCategoryStore();
  const { addProducts, loading } = useProductStore();

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: 0, price: 0, threshold: 5 },
  ]);

  
const handleChange = (i: number, field: keyof ProductInput, value: string | number) => {
  const updated = [...products];
  updated[i] = { ...updated[i], [field]: value } as ProductInput;
  setProducts(updated);
};

  const addField = () =>
    setProducts([...products, { name: "", quantity: 0, price: 0, threshold: 5 }]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("Select a category first");
    await addProducts({ category_id: categoryId, products });
    setProducts([{ name: "", quantity: 0, price: 0, threshold: 5 }]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm border space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-800">Add Products</h3>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.category_id} value={c.category_id}>
            {c.name}
          </option>
        ))}
      </select>

      {products.map((p, i) => (
        <div key={i} className="grid sm:grid-cols-4 gap-3">
          <input
            placeholder="Name"
            value={p.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Qty"
            value={p.quantity}
            onChange={(e) => handleChange(i, "quantity", Number(e.target.value))}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={p.price}
            onChange={(e) => handleChange(i, "price", Number(e.target.value))}
            className="border rounded-lg p-2"
          />
          <input
            type="number"
            placeholder="Threshold"
            value={p.threshold}
            onChange={(e) => handleChange(i, "threshold", Number(e.target.value))}
            className="border rounded-lg p-2"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="text-blue-600 hover:underline text-sm"
      >
        + Add Another Product
      </button>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Add Products"}
      </button>
    </form>
  );
}
