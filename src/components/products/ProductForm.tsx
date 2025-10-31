// /components/products/ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { CreateProductPayload } from "@/types/products";

type ProductInput = CreateProductPayload["products"][number];


export default function ProductForm() {
  const { categories, fetchCategories } = useCategoryStore();
  const { addProducts, loading } = useProductStore();

  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([
    { name: "", quantity: 0, price: 0, threshold: 5 },
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
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
      <h3 className="text-2xl font-semibold text-[#101ae7]">Add Products</h3>

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border rounded-lg px-3 py-2 w-full"
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option 
            className="rounded-md p-2"
            key={c.category_id} value={c.category_id}>
            {c.name}
          </option>
        ))}
      </select>
        <div className="grid sm:grid-cols-4 gap-3 m-1 space-y-1 text-[#bebec1]">
            <label htmlFor="Headlines"></label>
            <label htmlFor="Headlines">Quantity</label>
            <label htmlFor="Headlines">Price</label>
            <label htmlFor="Headlines">Threshold</label>
        </div>
      {products.map((p, i) => (
        <div key={i} className="grid sm:grid-cols-4 gap-3">
          <input
            placeholder="Product Name"
            value={p.name}
            onChange={(e) => handleChange(i, "name", e.target.value)}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={p.quantity}
            onChange={(e) => handleChange(i, "quantity", Number(e.target.value))}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={p.price}
            onChange={(e) => handleChange(i, "price", Number(e.target.value))}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Threshold"
            value={p.threshold}
            onChange={(e) => handleChange(i, "threshold", Number(e.target.value))}
            className="border rounded-md p-2"
          />
        </div>
      ))}
        <div className="flex items-center justify-between mt-4">
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
        </div>
    </form>
  );
}
