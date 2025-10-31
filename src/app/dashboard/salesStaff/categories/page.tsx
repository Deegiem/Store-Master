// src/app/categories/page.tsx
"use client";

// import CategoryForm from "@/components/categories/CategoryForm";
import CategoryList from "@/components/categories/CategoryList";

export default function CategoriesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-[#1b42da] mt-8">Categories</h1>
      <p>Manage and view your categories here.</p>
      {/* <CategoryForm /> */}
      <CategoryList />
    </div>
  );
}
