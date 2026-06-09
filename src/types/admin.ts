import { Role } from "./role"
import { AppAction } from "./actions"
import { Module } from "./module"
import type { BranchStaffMember } from "./branch"

// 1. ADMIN DASHBOARD DOMAIN

export interface SystemHealth {
  total_branches: number
  active_branches: number
  inactive_branches: number
  total_staff: number
  active_users: number
  inactive_users: number
}

export interface Revenue {
  today: number
  this_week: number
  this_month: number
  today_transactions: number
  month_transactions: number
}

export interface BranchRevenue {
  branch_id: string
  branch_name: string
  monthly_revenue: number
  staff?: BranchStaffMember[]
}

export interface BranchPerformance {
  top_branch: BranchRevenue
  average_monthly_revenue: number
  all_branches: BranchRevenue[]
  underperforming_branches: BranchRevenue[]
}

export interface StockAlertDetail {
  branch_id: string
  branch_name: string
  out_of_stock_count: number
  critical_stock_count: number
}

export interface StockAlerts {
  branches_with_critical_stock: number
  details: StockAlertDetail[]
}

export interface RecentLogin {
  name: string
  role: Role
  last_login: string
}

export interface UserActivity {
  not_logged_in_30_days: InactiveUser[]
  recent_logins: RecentLogin[]
  inactive_users: InactiveUser[]
}

export interface PendingActions {
  po_approvals_needed: number
  transfers_pending: number
}

export interface AdminDashboard {
  system_health: SystemHealth
  revenue: Revenue
  branch_performance: BranchPerformance
  stock_alerts: StockAlerts
  user_activity: UserActivity
  pending_actions: PendingActions
  total_orders?: number
}



// 2. AUDIT LOGS DOMAIN


export interface Metadata {
  role: Role
}

export interface AuditLog {
  id: string
  user_id?: string
  user_name: string
  user_role: Role
  user_email: string
  branch_name: string | null
  action: string
  module: string
  description: string
  details?: string
  target_id: string | null
  target_type: string | null
  metadata: Metadata
  timestamp: string
  ip_address: string
  user_agent?: string
}



//3. AUDIT TRAIL DOMAIN
export interface UserDetails {
  name: string
  email: string
  role: Role
}

export interface MetadataLogs {
  role: Role
  from_branch: string
  to_branch: string
  items_count: number
  rejected_reason: string
  email: string
  total_amount: number
  supplier: string
}

export interface ActionLog {
  action: AppAction
  module: Module
  description: string
  timestamp: string
  ip_address: string
  metadata: MetadataLogs | null
}


export interface UserAuditTrails {
  user: UserDetails
  total_actions: number
  logs: ActionLog[]
}


// 4. FAILED LOGINS DOMAIN

export interface SuspiciousAccount {
  email: string
  attempts: number
  unique_ips: string[]
  last_attempt: string
}

export interface FailedLoginReport {
  period_hours: number
  total_failed_attempts: number
  suspicious_accounts: SuspiciousAccount[]
}





// 5. SYSTEM SETTINGS DOMAIN

export interface SystemSettings {
  vat_rate: number
  vat_percentage: string
  po_approval_threshold: number
  currency_symbol: string
  currency_code: string
  default_low_stock_threshold: number
  critical_stock_threshold: number
  max_discount_percentage: number
  allow_negative_stock: boolean
  require_till_number: boolean
  system_name: string
  timezone: string
  last_updated_at: string
  last_updated_by: string
}




//6.  INVENTORY OVERVIEW DOMAIN
export interface Summary {
  total_products_tracked: number
  total_units_in_stock: number
  total_stock_value: number
  out_of_stock_count: number
  low_stock_count: number
  critical_stock_count: number
  dead_stock_count: number
}

export interface OutOfStockItem {
  product_name: string
  branch: string
}

export interface CriticalStockItem {
  product_name: string
  quantity: number
  branch: string
}

export interface DeadStockItem {
  product_name: string
  quantity: number
  value: number
  branch: string
  last_updated: string
}

export interface InventoryOverview {
  summary: Summary[]
  out_of_stock: OutOfStockItem[]
  critical_stock: CriticalStockItem[]
  dead_stock: DeadStockItem[]
}


// 7. Product Across Branches Domain
export interface BranchDetail {
  branch_name: string
  branch_id: string
  quantity: number
  selling_price: number
  reorder_point: number
  status: "In Stock" | "Low stock" | "Critical Stock" | "Out of Stock"
}

export interface ProductInventoryAllBranches {
  product_id: string
  total_units_system_wide: number
  branches: BranchDetail[]
}



// 8. BRANCH PERFORMANCE DOMAIN
export interface Branches {
  branch_id: string
  branch_name: string
  branch_code: string
  revenue: number
  total_sales: number
  cancelled_sales: number
  staff_count: number
  stock_value: number
  out_of_stock_items: number
  avg_sale_value: number
}

export interface BranchPerformanceOverTime {
  period_days: number
  branches: Branches[]
  system_total_revenue: number
  system_total_sales: number
}



// 9. INACTIVE USERS DOMAIN
export interface InactiveUser {
  user_id: string
  name: string
  email: string
  last_login: string
  role: Role
  days_inactive: number
}
