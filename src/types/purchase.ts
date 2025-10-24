export interface Purchase {
  purchase_id: string
  supplier_id: string
  product_id: string
  quantity: number
  status?: "pending" | "approved" | "rejected"
  rejection_reason?: string | null
  created_at?: string
  approved_at?: string | null
  rejected_at?: string | null
}
