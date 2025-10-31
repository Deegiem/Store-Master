// src/components/suppliers/SupplierDetails.tsx
"use client";
import React from "react";
import { SupplierStore } from "@/store/supplierStore";

export default function SupplierDetails() {
  const selected = SupplierStore((s) => s.selectedSupplier);

  if (!selected) {
    return (
      <div className="p-4 bg-white rounded shadow text-sm text-gray-600">
        Select a supplier to view details.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow space-y-2">
      <h4 className="text-lg font-semibold">{selected.supplier_name}</h4>
      <div className="text-sm text-gray-700">Contact person: {selected.contact_person}</div>
      <div className="text-sm text-gray-700">Email: {selected.email}</div>
      <div className="text-sm text-gray-700">Phone: {selected.phone}</div>
      <div className="text-sm text-gray-700">Company: {selected.company_name}</div>
      <div className="text-sm text-gray-500">Created by: {selected.created_by}</div>
    </div>
  );
}
