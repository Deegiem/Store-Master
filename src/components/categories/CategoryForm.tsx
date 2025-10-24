// /components/categories/CategoryForm.tsx
"use client";

import { useState } from "react";
import { useCategoryStore } from "@/store/categoryStore";

export default function CategoryForm() {
  const { createCategories, loading } = useCategoryStore();
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categories = inputValue
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    if (categories.length === 0) return;
    await createCategories({ categories });
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter category names separated by commas"
        className="w-full border border-gray-300 rounded-lg p-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Add Categories"}
      </button>
    </form>
  );
}
