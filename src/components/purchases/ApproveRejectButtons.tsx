"use client";

import { useState } from "react";
import { usePurchaseStore } from "@/store/purchaseStore";
import { Purchase } from "@/types/purchase";
import { toast } from "react-hot-toast";

interface Props {
  purchase: Purchase;
}

export default function ApproveRejectButtons({ purchase }: Props) {
  const { approvePurchase, rejectPurchase } = usePurchaseStore();
  const [loading, setLoading] = useState(false);

  const handleAction = async (action: "approve" | "reject") => {
    setLoading(true);
    try {
      if (action === "approve") await approvePurchase(purchase.purchase_id);
      else await rejectPurchase(purchase.purchase_id, "No reason provided");

      toast.success(`Purchase ${action}d successfully!`);
    } catch (error: any) {
      toast.error(error?.message || `Failed to ${action} purchase.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => handleAction("approve")}
        disabled={loading}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >
        Approve
      </button>
      <button
        onClick={() => handleAction("reject")}
        disabled={loading}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
}
