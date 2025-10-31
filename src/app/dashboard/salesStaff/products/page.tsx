// src/app/categories/page.tsx
"use client";

import ProductList from "@/components/products/ProductList";
import ProductsListByCategory from "@/components/products/ProductsListBycategory";

export default function ProductsPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold text-[#1b42da] sm:mt-6">Products</h1>
      <p>Manage and view your categories here.</p>
      <div className="space-y-6 mt-4">
        <ProductsListByCategory />
        <ProductList />        
      </div>

    </div>
  );
}             
