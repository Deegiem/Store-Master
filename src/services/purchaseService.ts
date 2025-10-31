import { api } from "@/lib/api";
import { Purchase } from "@/types/purchase";

export const purchaseService = {
  // Create purchase
  async create(data: Omit<Purchase, "purchase_id" | "status" | "created_at">): Promise<Purchase> {
    const { data: res } = await api.post("/purchases", data);
    return res;
  },

  // Get all purchases
  async getAll(): Promise<Purchase[]> {
    const { data } = await api.get("/purchases");
    console.log("Fetched purchases:", data);
    return Array.isArray(data.data) ? data.data : data; // ✅ fixed
  },

  // Get rejected purchases
  async getRejected(): Promise<Purchase[]> {
    const { data } = await api.get("/purchases/rejected");
    return Array.isArray(data.data) ? data.data : data; // ✅ fixed
  },

// Get approved purchases
async getApproved(): Promise<Purchase[]> {
  const { data } = await api.get("/purchases/approved");
  return Array.isArray(data.data) ? data.data : []; // ✅ fixed
}, 
  // Get all pending purchases
  async getPending(): Promise<Purchase[]> {
    const { data } = await api.get("/purchases/pending");
    return Array.isArray(data.data) ? data.data : data; // ✅ fixed
  },

  // Approve purchase
  async approve(purchase_id: string): Promise<string> {
    const { data } = await api.put(`/purchases/${purchase_id}/approve`);
    return data?.message || "Purchase approved successfully";
  },

  // Reject purchase
  async reject(purchase_id: string, rejection_reason: string): Promise<string> {
    const { data } = await api.put(`/purchases/${purchase_id}/reject`, { rejection_reason });
    return data?.message || "Purchase rejected successfully";
  },
};
