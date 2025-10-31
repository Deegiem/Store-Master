// src/app/dashboard/admin/suppliers/page.tsx
import React from "react";
// import AddSupplierForm from "@/components/suppliers/AddSupplierForm";
import SupplierList from "@/components/suppliers/SupplierList";
import SupplierDetails from "@/components/suppliers/SupplierDetails";

export default function SuppliersPage() {
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
          {/* <div>
            <AddSupplierForm />
          </div> */}

          <div>
            <SupplierList />
          </div>
        </section>

        <aside className="space-y-4">
          <div><p>Selected Supplier</p></div>
          <SupplierDetails />
        </aside>
      </main>
    </div>
  );
}
