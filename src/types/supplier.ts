// src/types/supplier.ts
export interface Supplier {
  supplier_id: string;
  supplier_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  company_name: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  name?: string;
}

export interface SupplierResponse {
  count: number;
  suppliers: Supplier[];
}

export interface CreateSupplierPayload {
  supplier_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  company_name: string;
}

export interface UpdateSupplierPayload {
  name?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  address?: string;
}
