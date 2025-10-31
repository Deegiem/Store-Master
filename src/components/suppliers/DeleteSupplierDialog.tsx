"use client";
import React, { useEffect, useState } from "react";
import { SupplierStore } from "@/store/supplierStore";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  openFor: string | null;
  onClose: () => void;
}

export default function DeleteSupplierDialog({ openFor, onClose }: Props) {
  const selected = SupplierStore((s) => s.selectedSupplier);
  const suppliers = SupplierStore((s) => s.suppliers);
  const deleteSupplier = SupplierStore((s) => s.deleteSupplier);
  const setSelectedSupplier = SupplierStore((s) => s.setSelectedSupplier);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

useEffect(() => {
  if (!openFor) {
    setSelectedSupplier(null);
    return;
  }
  const s = suppliers.find((x) => x.supplier_id === openFor) || null;
  setSelectedSupplier(s);
}, [openFor, suppliers, setSelectedSupplier]);


  if (!openFor) return null;

  const handleDelete = async () => {
    if (!openFor) return;
    setSubmitting(true);
    setMessage(null);

    try {
      await deleteSupplier(openFor);
      setMessage({ text: "Supplier deleted successfully.", type: "success" });
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1200);
    } catch (err: any) {
      setMessage({ text: err?.message || "Delete failed.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={!!openFor} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <h3 className="text-lg font-semibold">Delete supplier</h3>
        </DialogHeader>

        {message && (
          <div
            className={`p-2 mb-3 text-sm rounded ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="py-4">
          <p>
            Are you sure you want to delete{" "}
            <strong>{selected?.supplier_name}</strong>? This action cannot be undone.
          </p>
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={submitting}
            >
              {submitting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
