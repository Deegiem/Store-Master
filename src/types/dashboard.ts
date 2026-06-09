export interface DashboardStats {
  total_products: number;
  total_suppliers: number;
  total_sales: number;
  total_purchases: number;
  low_stock: number;
}

// src/types/dashboard.ts

// ========== FINANCE DASHBOARD ==========
export interface FinanceDashboardRevenue {
  this_month: number
  last_month: number
  change_percentage: number
  trend: "up" | "down" | "flat"
}

export interface PendingPOApproval {
  po_id: string
  total_amount: number
  status: string
  created_at: string
  supplier_name?: string
  target_branch?: string
}

export interface PendingPOApprovals {
  count: number
  total_value: number
  orders: PendingPOApproval[]
}

export interface FinanceDashboardData {
  revenue: FinanceDashboardRevenue
  tax_collected: number
  discounts_given: number
  cancelled_revenue_lost: number
  payment_breakdown: Record<string, number>
  pending_po_approvals: PendingPOApprovals
}

// ========== PURCHASE MANAGER DASHBOARD ==========
export interface RecentPO {
  po_id: string
  total_amount: number
  status: string
  created_at: string
}

export interface POSummary {
  pending_approval: number
  my_recent_pos: RecentPO[]
}

export interface StockAlerts {
  low_stock_count: number
  out_of_stock_count: number
  low_stock_items: Array<{
    product_id: string
    product_name: string
    quantity: number
    reorder_point: number
  }>
}

export interface PurchaseDashboardData {
  pos_summary: POSummary
  stock_alerts: StockAlerts
  active_suppliers: number
}

// ========== STORE MANAGER DASHBOARD ==========
export interface TodaySummary {
  total_sales: number
  total_revenue: number
  avg_transaction: number
}

export interface InventoryStatus {
  total_products: number
  low_stock_count: number
  out_of_stock_count: number
  low_stock_items: Array<{
    product_id: string
    product_name: string
    quantity: number
    reorder_point: number
  }>
}

export interface PendingActions {
  transfers_to_approve: number
  incoming_transfers: number
  incoming_purchase_orders: number
}

export interface StoreManagerDashboardData {
  branch_name: string
  today_summary: TodaySummary
  inventory_status: InventoryStatus
  staff_performance_today: Array<{
    staff_name: string
    sales_count: number
    revenue: number
  }>
  pending_actions: PendingActions
}

// ========== STORE STAFF DASHBOARD ==========
export interface Tasks {
  pos_to_receive: number
  transfers_to_ship: number
  transfers_to_receive: number
  total_pending_tasks: number
}

export interface PurchaseOrderReady {
  po_id: string
  total_amount: number
  items_count: number
  created_at: string
}

export interface StoreStaffDashboardData {
  tasks: Tasks
  purchase_orders_ready: PurchaseOrderReady[]
  transfers_to_ship: Array<{
    transfer_id: string
    total_items: number
    created_at: string
  }>
  transfers_to_receive: Array<{
    transfer_id: string
    total_items: number
    created_at: string
  }>
}

// ========== SALES STAFF DASHBOARD ==========
export interface TodaySalesMetrics {
  sales_count: number
  revenue_generated: number
  items_sold: number
  avg_transaction: number
}

export interface BranchRank {
  my_rank: number | null
  total_staff_selling: number
}

export interface RecentSale {
  sale_number: string
  total_amount: number
  items_count: number
  payment_method: string
  created_at: string
}

export interface SalesStaffDashboardData {
  my_name: string
  today: TodaySalesMetrics
  branch_rank: BranchRank
  recent_sales: RecentSale[]
}