"use client";

import AllSales from "@/components/sales/AllSales";
import CreateSaleAdmin from "@/components/sales/CreateSaleAdmin";
import SearchSaleAdmin from "@/components/sales/SearchSaleAdmin";

export default function SalesPage() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-[#1b42da] sm:mt-6">Sales Dashboard</h1>
      <p className="text-gray-600">Manage, view, and track all sales efficiently.</p>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <SearchSaleAdmin />
          <CreateSaleAdmin />
        </div>

        <div className="space-y-4">
          <AllSales />
        </div>
      </div>
    </div>
  );
}
