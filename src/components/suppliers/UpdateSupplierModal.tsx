"use client";
import React, { useEffect, useState } from "react";
import { SupplierStore } from "@/store/supplierStore";
import type { UpdateSupplierPayload } from "@/types/supplier";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";

interface Props {
  openFor: string | null;
  onClose: () => void;
}

export default function UpdateSupplierModal({ openFor, onClose }: Props) {
  const updateSupplier = SupplierStore((s) => s.updateSupplier);
  const suppliers = SupplierStore((s) => s.suppliers);
  const setSelectedSupplier = SupplierStore((s) => s.setSelectedSupplier);

  const [form, setForm] = useState<UpdateSupplierPayload>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (!openFor) {
      setForm({});
      setSelectedSupplier(null);
      return;
    }
    const sup = suppliers.find((x) => x.supplier_id === openFor) || null;
    setSelectedSupplier(sup);
    if (sup) {
      setForm({
        name: sup?.supplier_name,
        contact_person: sup?.contact_person,
        email: sup?.email,
        phone: sup?.phone,
        address: sup?.address,
      });
    }
  }, [openFor]);

  if (!openFor) return null;

  const handleChange = (k: keyof UpdateSupplierPayload, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!openFor) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await updateSupplier(openFor, form);
      setMessage({ text: "Supplier updated successfully.", type: "success" });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1500);
    } catch (err: any) {
      setMessage({ text: err?.message || "Update failed", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!openFor} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-semibold">Update supplier</h3>
        </DialogHeader>

        {message && (
          <div
            className={`p-2 mb-2 text-sm rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label>Supplier name</Label>
            <Input
              value={form.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Contact person</Label>
            <Input
              value={form.contact_person ?? ""}
              onChange={(e) => handleChange("contact_person", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label>Email</Label>
              <Input
                value={form.email ?? ""}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone ?? ""}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Address</Label>
            <Input
              value={form.address ?? ""}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <DialogFooter>
            <div className="flex gap-2 justify-end">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Updating..." : "Update supplier"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
