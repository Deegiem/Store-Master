// src/components/suppliers/SupplierList.tsx
"use client";
import React, { useEffect } from "react";
import { SupplierStore } from "@/store/supplierStore";
// import { Button } from "@/components/ui/button";
// import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table"; // adjust import based on your UI lib
// import UpdateSupplierModal from "./UpdateSupplierModal";
// import DeleteSupplierDialog from "./DeleteSupplierDialog";
import { Supplier } from "@/types/supplier";
// import { useState } from "react";

export default function SupplierList() {
  const suppliers = SupplierStore((s) => s.suppliers);
  const fetchSuppliers = SupplierStore((s) => s.fetchSuppliers);
  const setSelectedSupplier = SupplierStore((s) => s.setSelectedSupplier);

//   const [editOpenFor, setEditOpenFor] = useState<string | null>(null);
//   const [deleteOpenFor, setDeleteOpenFor] = useState<string | null>(null);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return (
    <div className="bg-white rounded-md shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Suppliers</h3>
        <div className="text-sm text-gray-500">Total: {suppliers?.length ?? 0}</div>
      </div>
        
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto">
          <thead className="text-left text-xs uppercase text-gray-500">
            <tr
            >
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Company</th>
              {/* <th className="p-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {suppliers?.map((s: Supplier) => (
              <tr 
                key={s.supplier_id} 
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedSupplier(s)}
                >
                <td className="p-2">{s.supplier_name}</td>
                <td className="p-2">{s.contact_person}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.phone}</td>
                <td className="p-2">{s.company_name}</td>
                {/* <td className="p-2 space-x-2">
                  <Button
                    size="sm"
                    onClick={(e) => {
                      setSelectedSupplier(s);
                      e.stopPropagation(); // prevent triggering row click
                      setEditOpenFor(s.supplier_id);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      setSelectedSupplier(s);
                      e.stopPropagation(); // prevent triggering row click
                      setDeleteOpenFor(s.supplier_id);
                    }}
                  >
                    Delete
                  </Button>
                </td> */}
              </tr>
            ))}

            {suppliers?.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-sm text-gray-500">
                  No suppliers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* <UpdateSupplierModal openFor={editOpenFor} onClose={() => setEditOpenFor(null)} />
      <DeleteSupplierDialog openFor={deleteOpenFor} onClose={() => setDeleteOpenFor(null)} /> */}
    </div>
  );
}
