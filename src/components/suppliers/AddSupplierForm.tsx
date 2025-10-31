"use client";
import React, { useState } from "react";
import { SupplierStore } from "@/store/supplierStore";
import type { CreateSupplierPayload } from "@/types/supplier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddSupplierForm() {
  const addSupplier = SupplierStore((s) => s.addSupplier);
  const [form, setForm] = useState<CreateSupplierPayload>({
    supplier_name: "",
    contact_person: "",
    email: "",
    phone: "",
    address: "",
    company_name: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleChange = (k: keyof CreateSupplierPayload, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      await addSupplier(form);
      setMessage({ text: "Supplier created successfully!", type: "success" });
      setForm({
        supplier_name: "",
        contact_person: "",
        email: "",
        phone: "",
        address: "",
        company_name: "",
      });
    } catch (err: any) {
      setMessage({ text: err?.message || "Failed to create supplier", type: "error" });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-white rounded-md shadow-sm">
      {message && (
        <div
          className={`p-2 text-sm rounded ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <Label>Supplier name</Label>
        <Input
          value={form.supplier_name}
          onChange={(e) => handleChange("supplier_name", e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Contact person</Label>
        <Input
          value={form.contact_person}
          onChange={(e) => handleChange("contact_person", e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <Label>Address</Label>
        <Input value={form.address} onChange={(e) => handleChange("address", e.target.value)} />
      </div>
      <div>
        <Label>Company name</Label>
        <Input
          value={form.company_name}
          onChange={(e) => handleChange("company_name", e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Add supplier"}
        </Button>
      </div>
    </form>
  );
}
