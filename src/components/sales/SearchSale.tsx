"use client";
import { useState, useEffect } from "react";
import { useSalesStore } from "@/store/saleStore";
import { salesService } from "@/services/saleService";

interface Product {
  product_id: string;
  name: string;
}

export default function SearchSale() {
  const { fetchSalesByProductId, sales, loading } = useSalesStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = async (product_id: string) => {
    setSearching(true);
    await fetchSalesByProductId(product_id);
  };

  const handleClear = () => {
    setQuery("");
    setSearching(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await salesService.getProductsForSale({ limit: 200 });
        setProducts(res.data ?? []);
      } catch (err) {
        void err;
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-6 lg:p-10 rounded-xl shadow-md w-full max-w-md lg:max-w-none mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl lg:text-2xl font-semibold text-[#1b42da]">
          Search Sales
        </h2>
        {query && (
          <button
            onClick={handleClear}
            className="text-sm text-[#1b42da] hover:underline"
          >
            Clear
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search product by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1b42da] focus:border-transparent transition"
      />

      {/* Product suggestions */}
      {query && (
        <div className="space-y-2 max-h-60 overflow-y-auto border rounded-lg p-2">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <button
                key={p.product_id}
                onClick={() => handleSearch(p.product_id)}
                className="block w-full text-left p-2 rounded hover:bg-[#e5edff] transition"
              >
                {p.name}
              </button>
            ))
          ) : (
            <p className="text-gray-400 text-center py-2">No product found</p>
          )}
        </div>
      )}

      {/* Loading */}
      {loading.sales && (
        <p className="text-gray-500 text-center">Loading sales...</p>
      )}

      {/* Sales results */}
      {searching && !loading.sales && (
        <div className="space-y-4 mt-4">
          {sales.length > 0 ? (
            sales.map((sale) => (
              <div
                key={sale.sale_id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <h3 className="font-semibold text-[#1b42da]">
                  Sale: {sale.sale_number}
                </h3>
                <p className="text-gray-700">
                  <strong>Branch:</strong> {sale.branch_name}
                </p>
                <p className="text-gray-700">
                  <strong>Cashier:</strong> {sale.cashier_name}
                </p>
                <p className="text-gray-700">
                  <strong>Items:</strong> {sale.items_count}
                </p>
                <p className="text-gray-700">
                  <strong>Total Amount:</strong> ₦{sale.total_amount.toLocaleString()}
                </p>
                <p className="text-gray-700">
                  <strong>Payment Method:</strong> {sale.payment_method}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {sale.status}
                </p>
                <p className="text-gray-400 text-xs">
                  <strong>Date:</strong> {new Date(sale.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No sales found for this product.
            </p>
          )}
        </div>
      )}
    </div>
  );
}