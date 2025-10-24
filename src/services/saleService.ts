import { api } from "@/lib/api"
import { Sale } from "@/types/sale"

export const saleService = {
  // Sell a product (Admin, Store Manager, Sales Staff)
  async sell(data: Omit<Sale, "sale_id" | "sold_at" | "remaining_quantity">): Promise<string> {
    const response = await api.post("/products/sell", data)
    return response.data
  },

  // Get all sales records (Admin / Store Manager)
  async getAll(): Promise<Sale[]> {
    const response = await api.get("/sales")
    return response.data
  },
}
