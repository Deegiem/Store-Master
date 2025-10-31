// /components/categories/CategoryList.tsx
"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/store/categoryStore";

export default function CategoryList() {
  const { categories, fetchCategories, deleteCategory, loading } = useCategoryStore();

  useEffect(() => {
    fetchCategories().then(() =>{
    })
  }, [fetchCategories]);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="space-y-2">
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map((cat) => (
          <div
            key={cat.category_id}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
          >
            <span className="text-gray-800 font-medium">{cat.name}</span>
            <button
              onClick={() => deleteCategory(cat.category_id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
