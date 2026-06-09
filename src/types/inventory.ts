// // src/types/inventory.ts
// export interface InventoryItem {
//   _id: string
//   product_id: string
//   branch_id: string
//   quantity: number
//   reorder_point: number
//   bin_location: string | null
//   selling_price: number
//   product_name: string
//   updated_at: string
// }

// export interface LowStockItem extends InventoryItem {}

// export interface AdjustmentLog {
//   _id: string
//   branch_id: string
//   product_id: string
//   user_id: string
//   quantity_removed: number
//   reason: string
//   note: string
//   date: string
//   product_name?: string
//   user_name?: string
//   branch_name?: string
// }

// export interface AdjustStockRequest {
//   product_id: string
//   quantity: number
//   reason: "damaged" | "theft" | "expired" | "lost" | "other"
//   note?: string
// }

// export interface PaginatedResponse<T> {
//   total: number
//   page: number
//   limit: number
//   pages: number
//   data: T[]
// }

// export type AdjustmentReason = "damaged" | "theft" | "expired" | "lost" | "other"

// export const ADJUSTMENT_REASONS = [
//   { value: "damaged", label: "Damaged", color: "bg-red-100 text-red-800" },
//   { value: "theft", label: "Theft", color: "bg-red-100 text-red-800" },
//   { value: "expired", label: "Expired", color: "bg-yellow-100 text-yellow-800" },
//   { value: "lost", label: "Lost", color: "bg-orange-100 text-orange-800" },
//   { value: "other", label: "Other", color: "bg-gray-100 text-gray-800" },
// ] as const



// src/types/inventory.ts

export interface InventoryItem {
  _id: string
  product_id: string
  branch_id: string
  quantity: number
  reorder_point: number
  bin_location: string | null
  selling_price: number
  product_name: string
  updated_at: string
}

export interface InventoryListResponse {
  total: number
  page: number
  limit: number
  pages: number
  data: InventoryItem[]
}

export interface LowStockItem extends InventoryItem {}

export interface LowStockResponse {
  total: number
  page: number
  limit: number
  pages: number
  data: LowStockItem[]
}

export interface AdjustmentPayload {
  product_id: string
  quantity: number
  reason: "damaged" | "expired" | "theft" | "internal_consumption"
  note?: string
  branch_id?: string // Only for Admin (optional)
}

export interface AdjustmentResponse {
  message: string
  branch_id: string
  product_id: string
  product_name: string
  quantity_removed: number
  new_quantity: number
  reason: string
  note: string
  low_stock_alert: boolean
  critical_alert: boolean
}

export interface AdjustmentHistoryItem {
  _id: string
  branch_id: string
  product_id: string
  user_id: string
  quantity_removed: number
  reason: string
  note: string
  date: string
}

export interface AllAdjustmentsItem {
  id: string
  branch: string
  product_id: string
  product_name: string
  quantity_removed: number
  reason: string
  note: string
  adjusted_by: string
  adjusted_by_role: string
  date: string
}

export interface AllAdjustmentsResponse {
  total: number
  page: number
  limit: number
  pages: number
  data: AllAdjustmentsItem[]
}

export type AdjustmentReason = "damaged" | "expired" | "theft" | "internal_consumption"