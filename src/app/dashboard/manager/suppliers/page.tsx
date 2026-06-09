// src/app/dashboard/manager/suppliers/page.tsx
"use client";
import { useEffect } from "react";
import { useSupplierStore } from "@/store/supplierStore";
import SupplierTable from "@/components/suppliers/SupplierTable";
import { SupplierDetailSkeleton } from "@/components/suppliers/SupplierDetailSkeleton";

export default function SuppliersPage() {
  const { suppliers, loading, fetchSuppliers } = useSupplierStore();

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return (
    <div className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Suppliers</h1>
          <p className="text-sm text-gray-500">Create, update, and manage suppliers from a single consolidated interface.</p>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-4">
          <SupplierTable suppliers={suppliers} loading={loading.suppliers} />
        </section>

        <aside className="space-y-4">
          <div><p>Selected Supplier</p></div>
          <SupplierDetailSkeleton />
        </aside>
      </main>
    </div>
  );
}
