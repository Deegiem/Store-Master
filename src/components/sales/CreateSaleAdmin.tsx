"use client";
import { useState, useEffect } from "react";
import { useSalesStore } from "@/store/saleStore";
import { api } from "@/lib/api"; // to fetch products
// import { CreateSalePayload } from "@/types/sale";

interface Product {
  product_id: string;
  name: string;
}

export default function CreateSale() {
  const { createSale, fetchSales } = useSalesStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/products"); // adjust if different endpoint
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return alert("Select a product");

    setLoading(true);
    await createSale({ product_id: selectedProduct.product_id, quantity });
    setLoading(false);
    fetchSales();
    setQuantity(0);
    setSelectedProduct(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 space-y-4 mx-auto transition-all rounded-xl shadow-md hover:shadow-lg flex flex-col"
    >
      <h2 className="text-xl font-semibold text-[#1b42da]">Sell Product</h2>

      <select
        value={selectedProduct?.product_id || ""}
        onChange={(e) =>
          setSelectedProduct(products.find(p => p.product_id === e.target.value) || null)
        }
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1b42da] focus:border-transparent transition"
      >
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p.product_id} value={p.product_id}>
            {p.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#1b42da] focus:border-transparent transition"
        min={1}
      />

      <button
        type="submit"
        className={`w-full p-3 rounded-lg text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1b42da] hover:bg-[#0f2bc3]"
        }`}
        disabled={loading}
      >
        {loading ? "Selling..." : "Sell Product"}
      </button>
    </form>
  );
}
