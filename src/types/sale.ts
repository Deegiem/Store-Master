export interface Sale {
  sale_id: string
  product_id: string
  quantity: number
  sold_by?: string
  sold_at?: string
  remaining_quantity?: number
  threshold_alert?: boolean
}
