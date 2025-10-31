"use client";
import { useEffect } from "react";
import { useSalesStore } from "@/store/saleStore";

export default function AllSales() {
  const { sales, fetchSales, loading, error } = useSalesStore();

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  if (loading) return <p className="text-center text-gray-500 mt-4">Loading sales...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">{error}</p>;

  return (
    <div className="flex flex-col space-y-4 p-2">
        <div>
            <p className="text-[#0f2bc3] font-semibold text-2xl">All Sold Products</p>
        </div>
      {sales.map((sale) => (
        <div
          key={sale.sale_id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col"
        >
          <h3 className="font-semibold text-lg text-[#1b42da]">{sale.product_name}</h3>
          <p className="text-gray-700 mt-2"><strong>Quantity Sold:</strong> {sale.quantity_sold}</p>
          {sale.total_sale_price && (
            <p className="text-gray-700 mt-1"><strong>Total Price:</strong> ₦{sale.total_sale_price}</p>
          )}
          <p className="text-gray-500 mt-1 text-sm"><strong>Sold By:</strong> {sale.sold_by}</p>
          <p className="text-gray-400 text-xs mt-1">
            <strong>Sold At:</strong> {new Date(sale.sold_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
