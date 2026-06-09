// /components/products/ProductForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CreateProductPayload } from "@/types/products";

type ProductInput = Omit<CreateProductPayload, 'category_id'>;


export default function ProductForm() {
  const { categories, fetchCategories } = useCategoryStore();
  const { createProduct, productloading } = useProductStore();

  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState<ProductInput>({
    name: "",
    sku: "",
    barcode: "",
    description: "",
    low_stock_threshold: 5,
    image_url: "",
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  const handleChange = (field: keyof ProductInput, value: string | number) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) return alert("Select a category first");
    await createProduct({ ...product, category_id: categoryId });
    setProduct({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      low_stock_threshold: 5,
      image_url: "",
    });
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
            key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border rounded-md p-2"
            required
          />
          <input
            placeholder="SKU"
            value={product.sku}
            onChange={(e) => handleChange("sku", e.target.value)}
            className="border rounded-md p-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Barcode"
            value={product.barcode}
            onChange={(e) => handleChange("barcode", e.target.value)}
            className="border rounded-md p-2"
          />
          <input
            type="number"
            placeholder="Low Stock Threshold"
            value={product.low_stock_threshold}
            onChange={(e) => handleChange("low_stock_threshold", Number(e.target.value))}
            className="border rounded-md p-2"
            min="0"
          />
        </div>
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="border rounded-md p-2 w-full"
          rows={3}
        />
        <input
          placeholder="Image URL"
          value={product.image_url}
          onChange={(e) => handleChange("image_url", e.target.value)}
          className="border rounded-md p-2 w-full"
        />
        <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              disabled={productloading.createProduct}
              className="bg-[#101ae7] text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {productloading.createProduct ? "Creating..." : "Create Product"}
            </button>
        </div>
    </form>
  );
}
