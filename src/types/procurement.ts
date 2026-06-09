export type POStatus =
  | "Pending Approval"
  | "Approved"
  | "Rejected"
  | "Received"

export interface ProcurementItem {
  product_id: string
  product_name?: string
  sku?: string
  ordered_quantity: number
  received_quantity?: number
  unit_cost: number
  total_cost: number
}

export interface ProcurementListItem {
  po_id: string
  supplier_name: string
  supplier_id: string
  target_branch: string
  branch_id: string
  total_amount: number
  status: POStatus
  items_count: number
  created_by: string
  created_at: string
  approved_by: string | null
  received_at: string | null
}

export interface ProcurementListResponse {
  total: number
  page: number
  limit: number
  pages: number
  items: ProcurementListItem[]
}

export interface ProcurementFilters {
  status?: POStatus | "" | "all"
  branch_id?: string
  supplier_id?: string
  created_by?: string
  page?: number
  limit?: number
}

/* DETAIL */
export interface ProcurementSupplier {
  id: string
  name: string
  phone: string
}

export interface ProcurementBranch {
  id: string
  name: string
}

export interface ProcurementDetail {
  po_id: string
  status: POStatus
  supplier: ProcurementSupplier
  target_branch: ProcurementBranch
  items: ProcurementItem[]
  items_count: number
  total_amount: number
  created_by: string
  created_at: string
  approved_by: string | null
  received_at: string | null
  receiving_notes?: string
}

/* CREATE */
export interface CreatePOItem {
  product_id: string
  quantity: number
  unit_cost: number
}

export interface CreatePOPayload {
  supplier_id: string
  target_branch: string
  items: CreatePOItem[]
}

export interface CreatePOResponse {
  message: string
  po_id: string
  total_amount: number
  status: POStatus
  requires_approval: boolean
  note: string
}

/* APPROVALS */
export interface PendingApprovalItem {
  po_id: string
  supplier_name: string
  supplier_id: string
  target_branch: string
  branch_id: string
  total_amount: number
  status: POStatus
  items_count: number
  created_by_name: string
  created_at: string
  items: ProcurementItem[]
}

export interface PendingApprovalResponse {
  count: number
  total_value: number
  orders: PendingApprovalItem[]
}

/* RECEIVE */
export interface ReceivePOItem {
  product_id: string
  received_qty: number
}

export interface ReceivePOPayload {
  items?: ReceivePOItem[]
  notes: string
}

/* ACTION RESPONSES */
export interface ActionResponse {
  message: string
  po_id: string
  status: POStatus
  approved_by?: string
  total_amount?: number
}
