import { api } from "@/lib/api"
import { Supplier } from "@/types/supplier"

export const supplierService = {
  // Get all suppliers
  async getAll(): Promise<Supplier[]> {
    const response = await api.get("/suppliers")
    return response.data
  },

  // Get supplier by ID
  async getById(supplier_id: string): Promise<Supplier> {
    const response = await api.get(`/suppliers/${supplier_id}`)
    return response.data
  },

  // Add supplier
  async create(data: Omit<Supplier, "supplier_id" | "created_at">): Promise<Supplier> {
    const response = await api.post("/suppliers", data)
    return response.data
  },

  // Delete supplier
  async delete(supplier_id: string): Promise<string> {
    const response = await api.delete(`/suppliers/${supplier_id}`)
    return response.data
  },
}
