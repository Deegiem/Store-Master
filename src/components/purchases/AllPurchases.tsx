"use client";

import { useEffect, useState } from "react";
import { usePurchaseStore } from "@/store/purchaseStore";
import { useProductStore } from "@/store/productStore";
import { SupplierStore } from "@/store/supplierStore";
import { Purchase } from "@/types/purchase";
import PurchaseCard from "@/components/purchases/PurchaseCard";
import { toast } from "react-hot-toast";

interface PurchaseListProps {
  filter?: "all" | "pending" | "rejected" | "approved";
}

export default function AllPurchases({ filter = "all" }: PurchaseListProps) {
  const {
    purchases,
    fetchAllPurchases,
    fetchPendingPurchases,
    fetchRejectedPurchases,
    fetchApprovedPurchases,
    loading,
  } = usePurchaseStore();

  const { products, fetchProducts } = useProductStore();
  const { suppliers, fetchSuppliers } = SupplierStore();

  const [hydrated, setHydrated] = useState<Purchase[]>([]);

  // 🔹 Fetch products and suppliers once
  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, [fetchProducts, fetchSuppliers]);

  // 🔹 Fetch purchases whenever filter changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        switch (filter) {
          case "pending":
            await fetchPendingPurchases();
            break;
          case "rejected":
            await fetchRejectedPurchases();
            break;
          case "approved":
            await fetchApprovedPurchases();
            break;
          default:
            await fetchAllPurchases();
            break;
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch purchases");
      }
    };
    fetchData();
  }, [
    filter,
    fetchAllPurchases,
    fetchPendingPurchases,
    fetchRejectedPurchases,
    fetchApprovedPurchases,
  ]);

  // 🔹 Merge product & supplier info after purchases or reference data change
  useEffect(() => {
    const merged = purchases.map((p) => {
      const product = products.find((prod) => prod.product_id === p.product_id);
      const supplier = suppliers.find((sup) => sup.supplier_id === p.supplier_id);

      return {
        ...p,
        product: product || { name: "Unknown Product" },
        supplier: supplier || { name: "Unknown Supplier" },
      };
    });
    setHydrated(merged);
  }, [purchases, products, suppliers]);

  if (loading) return <p>Loading purchases...</p>;
  if (!hydrated.length) return <p>No purchases found.</p>;

  return (
    <div className="space-y-3">
      {hydrated.map((p) => (
        <PurchaseCard key={p.purchase_id} purchase={p} />
      ))}
    </div>
  );
}
