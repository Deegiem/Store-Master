export interface Supplier {
  id: string
  supplier_id?: string
  name: string
  supplier_name?: string
  company_name?: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SupplierApiResponse {
  _id?: string
  id?: string
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CreateSupplierPayload {
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
}

export interface UpdateSupplierPayload {
  name: string
  contact_person: string
  email: string
  phone: string
  address: string
  is_active: boolean
}

export interface GetSuppliersResponse {
  total: number
  page: number
  limit: number
  pages: number
  data: Supplier[]
}

export interface DeleteSupplierResponse {
  message: string
}
