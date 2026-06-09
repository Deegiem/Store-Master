import {api} from "@/lib/api"

import type {
  Supplier,
  SupplierApiResponse,
  CreateSupplierPayload,
  UpdateSupplierPayload,
  GetSuppliersResponse,
  DeleteSupplierResponse,
} from "@/types/supplier"

const normalizeSupplier = (
  supplier: SupplierApiResponse
): Supplier => ({
  id: supplier.id || supplier._id || "",

  name: supplier.name,
  contact_person: supplier.contact_person,
  email: supplier.email,
  phone: supplier.phone,
  address: supplier.address,
  is_active: supplier.is_active,

  created_at: supplier.created_at,
  updated_at: supplier.updated_at,
})

export const supplierService = {
  async getSuppliers(
    page = 1,
    limit = 50
  ): Promise<GetSuppliersResponse> {
    const response = await api.get(
      `/suppliers/?page=${page}&limit=${limit}`
    )

    return {
      ...response.data,

      data: response.data.data.map(
        normalizeSupplier
      ),
    }
  },

  async getSupplierById(
    supplierId: string
  ): Promise<Supplier> {
    const response = await api.get(
      `/suppliers/${supplierId}`
    )

    return normalizeSupplier(response.data)
  },

  async createSupplier(
    payload: CreateSupplierPayload
  ): Promise<Supplier> {
    const response = await api.post(
      "/suppliers/",
      payload
    )

    return normalizeSupplier(response.data)
  },

  async updateSupplier(
    supplierId: string,
    payload: UpdateSupplierPayload
  ): Promise<Supplier> {
    const response = await api.put(
      `/suppliers/${supplierId}`,
      payload
    )

    return normalizeSupplier(response.data)
  },

  async deleteSupplier(
    supplierId: string
  ): Promise<DeleteSupplierResponse> {
    const response = await api.delete(
      `/suppliers/${supplierId}`
    )

    return response.data
  },
}