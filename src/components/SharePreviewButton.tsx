"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useSalesStore } from "@/store/saleStore";
import { useEffect, useState } from "react";

export function SharePreviewButton() {
  const { profile } = useAuthStore();
  const { todaysSales } = useSalesStore();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Build dynamic OG URL with real data
    const params = new URLSearchParams({
      title: "Sales Report",
      date: new Date().toLocaleDateString(),
      revenue: `₦${todaysSales?.total_revenue?.toLocaleString() || "0"}`,
      sales: todaysSales?.total_sales?.toString() || "0",
      user: profile?.name || "User",
      chart: "📊",
    });

    const ogUrl = `${window.location.origin}/api/og?${params.toString()}`;
    setShareUrl(ogUrl);
  }, [todaysSales, profile]);

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Check out my StoreMaster sales report!");
    const url = encodeURIComponent(window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Preview link copied!");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={shareOnWhatsApp}
        className="inline-flex items-center gap-2 rounded-sm bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
      >
        📱 Share on WhatsApp
      </button>
      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-sm border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        🔗 Copy OG Link
      </button>
    </div>
  );
}