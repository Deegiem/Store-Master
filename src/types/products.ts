// /types/product.ts

// ======================================================
// 1. PRODUCT ENTITY
// ======================================================

export interface Product {
  id: string
  product_id?: string
  name: string
  sku: string
  barcode: string
  description: string
  price: number | null
  category_id: string
  category_name?: string
  image_url: string
  low_stock_threshold: number
  threshold?: number
  quantity?: number
  is_priced: boolean
  created_at: string

  cost_price: number | null
  margin_percentage: number | null

  created_by?: string
  updated_at?: string
  updated_by?: string

  last_price_change?: string
  last_price_changed_by?: string
}

// ======================================================
// 2. CREATE PRODUCT
// ======================================================

export interface CreateProductPayload {
  name: string
  sku: string
  barcode: string
  description: string
  low_stock_threshold: number
  category_id: string
  image_url: string
}

export interface CreateBulkProductPayload {
  category_id: string
  products: {
    name: string
    quantity: number
    price: number
    threshold: number
  }[]
}

export interface CreateProductResponse {
  message: string
  product_id: string
  name: string
  sku: string
  is_priced: boolean
  next_step: string
}

// ======================================================
// 3. GET PRODUCTS
// ======================================================

export interface GetProductsParams {
  search?: string
  category_id?: string
  unpriced_only?: boolean
  page?: number
  limit?: number
}

export interface GetProductsResponse {
  total: number
  page: number
  unpriced_count: number
  items: Product[]
}

// ======================================================
// 4. SET PRODUCT PRICE
// ======================================================

export interface SetProductPricePayload {
  price: number
  reference_cost?: number
  reason: string
}

export interface SetProductPriceResponse {
  message: string
  product_id: string
  product_name: string

  old_price: number | null
  new_price: number

  reference_cost: number | null
  margin_percentage: number | null

  branches_updated: number
  is_priced: boolean
}

// ======================================================
// 5. GET PRODUCT BY ID
// ======================================================

export interface GetProductByIdParams {
  product_id: string
}

// ======================================================
// 6. DELETE PRODUCT
// ======================================================

export interface DeleteProductResponse {
  message: string
  inventory_records_removed: number
}

// ======================================================
// 7. PRICE HISTORY
// ======================================================

export interface PriceHistoryItem {
  change_date: string

  change_type: string

  old_price: number | null
  new_price: number | null

  reference_cost: number | null

  old_margin: number | null
  new_margin: number | null

  changed_by: string
  changed_by_role: string

  reason: string

  effective_date: string
}

export interface GetPriceHistoryResponse {
  product_id: string
  product_name: string
  sku: string

  current_price: number | null

  is_priced: boolean

  total_changes: number

  history: PriceHistoryItem[]
}

export interface UpdateProductPayload {
  name?: string
  sku?: string
  barcode?: string
  description?: string
  price?: number
  quantity?: number
  threshold?: number
  low_stock_threshold?: number
  category_id?: string
  image_url?: string
}
