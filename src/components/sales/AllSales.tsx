"use client";
import { useEffect, useState } from "react";
import { useSalesStore } from "@/store/saleStore";
import { CancelSaleModal } from "./CancelSaleModal";
import type { SaleListRecord } from "@/types/sale";

export default function AllSales() {
  const { sales, fetchSales, loading, error } = useSalesStore();
  const [activeSale, setActiveSale] = useState<SaleListRecord | null>(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const handleCancelComplete = async () => {
    setIsCancelOpen(false);
    setActiveSale(null);
    await fetchSales();
  }

  if (loading.sales) return <p className="text-center text-gray-500 mt-4">Loading sales...</p>;
  if (error.sales) return <p className="text-center text-red-500 mt-4">{error.sales}</p>;

  return (
    <div className="space-y-4 p-2">
      <div>
        <p className="text-[#0f2bc3] font-semibold text-2xl">All Sold Products</p>
      </div>
      {sales.map((sale) => (
        <div
          key={sale.sale_id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold text-lg text-[#1b42da]">{sale.sale_number}</h3>
              <p className="text-slate-600">{sale.branch_name}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm text-slate-500">{sale.payment_method}</p>
              <p className="text-sm font-semibold text-slate-700">Status: {sale.status}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <p className="text-gray-700"><strong>Subtotal:</strong> ₦{sale.subtotal.toLocaleString()}</p>
            <p className="text-gray-700"><strong>Total:</strong> ₦{sale.total_amount.toLocaleString()}</p>
            <p className="text-gray-500"><strong>Cashier:</strong> {sale.cashier_name}</p>
            <p className="text-gray-500"><strong>Items:</strong> {sale.items_count}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Recorded at</p>
              <p className="text-sm text-slate-600">{new Date(sale.created_at).toLocaleString()}</p>
            </div>
            {sale.status !== "cancelled" && (
              <button
                type="button"
                onClick={() => {
                  setActiveSale(sale)
                  setIsCancelOpen(true)
                }}
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Cancel Sale
              </button>
            )}
          </div>
        </div>
      ))}

      <CancelSaleModal open={isCancelOpen} sale={activeSale} onClose={() => setIsCancelOpen(false)} onCancelled={handleCancelComplete} />
    </div>
  );
}
