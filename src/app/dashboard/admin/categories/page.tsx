// src/app/categories/page.tsx
"use client";

import CategoryForm from "@/components/categories/CategoryForm";
import CategoryListAdmin from "@/components/categories/CategoryListAdmin";

export default function CategoriesPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-[#1b42da] ">Categories</h1>
      <p>Manage and view your categories here.</p>
      <CategoryForm />
      <CategoryListAdmin />
    </div>
  );
}
