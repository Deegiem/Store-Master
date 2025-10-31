"use client";
import { useState, useEffect } from "react";
import { useSalesStore } from "@/store/saleStore";
import { api } from "@/lib/api";

interface Product {
  product_id: string;
  name: string;
}

export default function SearchSale() {
  const { fetchSalesByProductId, sales, loading } = useSalesStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);

  const filteredProducts = products.filter(p =>
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
      const res = await api.get("/products");
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md  mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#1b42da]">Search Sales</h2>
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
            filteredProducts.map(p => (
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
      {loading && <p className="text-gray-500 text-center">Loading sales...</p>}

      {/* Sales results */}
      {searching && !loading && (
        <div className="space-y-4 mt-4">
          {sales.length > 0 ? (
            sales.map(s => (
              <div
                key={s.sale_id}
                className="border p-4 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-[#1b42da]">{s.product_name}</h3>
                <p className="text-gray-700"><strong>Quantity Sold:</strong> {s.quantity_sold}</p>
                {s.total_sale_price && <p className="text-gray-700"><strong>Total:</strong> ₦{s.total_sale_price}</p>}
                <p className="text-gray-500 text-sm"><strong>Sold By:</strong> {s.sold_by}</p>
                <p className="text-gray-400 text-xs"><strong>Sold At:</strong> {new Date(s.sold_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-4">No sales found for this product.</p>
          )}
        </div>
      )}
    </div>
  );
}
