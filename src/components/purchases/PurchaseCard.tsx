"use client";

import { useProductStore } from "@/store/productStore";
import { SupplierStore } from "@/store/supplierStore";
import { Purchase } from "@/types/purchase";
import ApproveRejectButtons from "./ApproveRejectButtons";

interface PurchaseCardProps {
  purchase: Purchase;
}

export default function PurchaseCard({ purchase }: PurchaseCardProps) {
  const { products } = useProductStore();
  const { suppliers } = SupplierStore();

  // ✅ Lookup the matching product and supplier
  const product = products.find((p) => p.product_id === purchase.product_id);
  const supplier = suppliers.find((s) => s.supplier_id === purchase.supplier_id);

  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <p>
          <strong>Product:</strong> {product?.name || "Unknown Product"}
        </p>
        <p>
          <strong>Supplier:</strong> {supplier?.name || "Unknown Supplier"}
        </p>
        <p>
          <strong>Quantity:</strong> {purchase.quantity}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`capitalize ${
              purchase.status === "pending"
                ? "text-yellow-500"
                : purchase.status === "rejected"
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {purchase.status}
          </span>
        </p>
      </div>

      {purchase.status === "pending" && (
        <ApproveRejectButtons purchase={purchase} />
      )}
    </div>
  );
}
