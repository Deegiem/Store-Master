export interface ProductForSale {
  product_id: string
  name: string
  sku: string
  barcode: string
  price: number
  category_name: string
  available_quantity: number
  image_url: string
}

export interface ProductsForSaleResponse {
  page: number
  limit: number
  data: ProductForSale[]
}

export interface SaleQuoteItem {
  product_id: string
  product_name: string
  sku: string
  quantity: number
  unit_price: number
  line_total: number
  available_quantity: number
}

export interface SaleQuoteResponse {
  items: SaleQuoteItem[]
  subtotal: number
  discount: number
  discounted_subtotal: number
  tax: number
  tax_rate: string
  total_amount: number
  currency_symbol: string
  items_count: number
  payment_methods: string[]
}

export interface SaleLineItem {
  product_id: string
  quantity: number
}

export interface CreateSalePayload {
  items: SaleLineItem[]
  payment_method: string
  till_number: string
  notes?: string
}

export interface SaleCreateResponse {
  message: string
  sale_id: string
  sale_number: string
  items: {
    product_name: string
    quantity: number
    unit_price: number
    line_total: number
  }[]
  subtotal: number
  tax: number
  tax_rate: string
  total_amount: number
  payment_method: string
  currency_symbol: string
  timestamp: string
}

export interface SaleListRecord {
  sale_id: string
  sale_number: string
  branch_name: string
  cashier_name: string
  subtotal: number
  discount: number
  tax: number
  total_amount: number
  items_count: number
  payment_method: string
  status: string
  created_at: string
}

export type SaleListResponse = SaleListRecord[]

export interface SaleDetailItem {
  product_name: string
  sku: string
  barcode: string
  quantity: number
  unit_price: number
  line_total: number
}

export interface SaleDetail {
  sale_id: string
  sale_number: string
  branch_name: string
  cashier_name: string
  items: SaleDetailItem[]
  subtotal: number
  discount: number
  tax: number
  total_amount: number
  payment_method: string
  amount_paid: number
  change_given: number
  status: string
  till_number: string
  notes: string
  created_at: string
}

export interface TodaysSalesSummary {
  date: string
  total_sales: number
  total_revenue: number
  total_items_sold: number
  average_transaction_value: number
}

export interface CancelSalePayload {
  cancellation_reason: string
}

export interface CancelSaleResponse {
  message: string
  sale_id: string
  sale_number: string
  status: string
}

export interface SaleProductQueryParams {
  search?: string
  category_id?: string
  branch_id?: string
  page?: number
  limit?: number
}

export interface SaleListQueryParams {
  start_date?: string
  end_date?: string
  payment_method?: string
  page?: number
  limit?: number
}
