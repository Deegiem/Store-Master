import { api } from "@/lib/api"
import { Purchase } from "@/types/purchase"

export const purchaseService = {
  // Create a new purchase (Admin only)
  async create(data: Omit<Purchase, "purchase_id" | "status" | "created_at">): Promise<Purchase> {
    const response = await api.post("/purchases", data)
    return response.data
  },

  // Get all pending purchases (Admin / Store Manager)
  async getPending(): Promise<Purchase[]> {
    const response = await api.get("/purchases/pending")
    return response.data
  },

  // Approve a purchase (Admin / Store Manager)
  async approve(purchase_id: string): Promise<string> {
    const response = await api.put(`/purchases/${purchase_id}/approve`)
    return response.data
  },

  // Reject a purchase (Admin / Store Manager)
  async reject(purchase_id: string, rejection_reason: string): Promise<string> {
    const response = await api.put(`/purchases/${purchase_id}/reject`, { rejection_reason })
    return response.data
  },
}
