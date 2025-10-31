"use client";

import { useState, useEffect } from "react";
import { usePurchaseStore } from "@/store/purchaseStore";
import { useProductStore } from "@/store/productStore";
import { SupplierStore } from "@/store/supplierStore";
import { toast } from "react-hot-toast";

export default function CreatePurchaseForm() {
  const { createPurchase } = usePurchaseStore();
  const { products, fetchProducts } = useProductStore();
  const { suppliers, fetchSuppliers } = SupplierStore();

  const [productId, setProductId] = useState<string>("");
  const [supplierId, setSupplierId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, [fetchProducts, fetchSuppliers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId || !supplierId || quantity <= 0) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      await createPurchase({ product_id: productId, supplier_id: supplierId, quantity });
      toast.success("Purchase created successfully!");
      setProductId("");
      setSupplierId("");
      setQuantity(0);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create purchase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
      <div>
        <label className="block mb-1 font-medium">Product</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select product</option>
          {products.map((p) => (
            <option key={p.product_id} value={p.product_id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Supplier</label>
        <select
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select supplier</option>
          {suppliers.map((s) => (
            <option key={s.supplier_id} value={s.supplier_id}>
              {s.supplier_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Purchase"}
      </button>
    </form>
  );
}