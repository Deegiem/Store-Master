"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import StatCard from "@/components/StatCard";
import { FiPackage, FiUser, FiShoppingCart, FiClipboard, FiAlertCircle } from "react-icons/fi";

export default function StatsPage() {
  const { stats, fetchStats, loading, error } = useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <p className="text-center text-gray-500 mt-6">Loading dashboard stats...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#1b42da]">Dashboard Stats</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={stats.total_products} icon={<FiPackage />} color="bg-blue-600" />
        <StatCard title="Total Suppliers" value={stats.total_suppliers} icon={<FiUser />} color="bg-green-600" />
        <StatCard title="Total Sales" value={stats.total_sales} icon={<FiShoppingCart />} color="bg-yellow-600" />
        <StatCard title="Total Purchases" value={stats.total_purchases} icon={<FiClipboard />} color="bg-purple-600" />
        <StatCard
          title="Low Stock Products"
          value={stats.low_stock}
          icon={<FiAlertCircle />}
          color="bg-red-600"
          tooltipText={stats.low_stock > 0 ? "Check products with low stock!" : "No products below threshold"}
        />
      </div>
    </div>
  );
}
