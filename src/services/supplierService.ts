// src/services/supplierService.ts
import { api } from "@/lib/api";
import {
  CreateSupplierPayload,
  UpdateSupplierPayload,
  SupplierResponse,
  Supplier,
} from "@/types/supplier";

export const supplierService = {
  async getAll(): Promise<SupplierResponse> {
    const res = await api.get("/suppliers");
    return res.data;
  },

  async getById(id: string): Promise<Supplier> {
    const res = await api.get(`/suppliers/${id}`);
    return res.data;
  },

  async create(payload: CreateSupplierPayload) {
    const res = await api.post("/suppliers", payload);
    return res.data;
  },

  async update(id: string, payload: UpdateSupplierPayload) {
    const res = await api.put(`/suppliers/${id}`, payload);
    return res.data;
  },

  async remove(id: string) {
    const res = await api.delete(`/suppliers/${id}`);
    return res.data;
  },
};
