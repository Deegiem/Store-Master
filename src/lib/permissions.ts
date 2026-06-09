// src/lib/permissions.ts
import { type AppRole } from "./roleMapper"

export const PERMISSIONS = {
  // ========== DASHBOARD ACCESS ==========
  view_admin_dashboard: ["admin"],
  view_finance_dashboard: ["finance"],
  view_purchase_dashboard: ["purchase"],
  view_store_manager_dashboard: ["manager"],  // Manager now has store dashboard
  view_store_staff_dashboard: ["manager"],    // Staff dashboard redirects to manager
  view_sales_dashboard: ["sales"],

  // ========== CATEGORY MANAGEMENT ==========
  view_categories: ["admin", "manager", "purchase"],
  create_category: ["admin"],
  update_category: ["admin"],
  delete_category: ["admin"],

  // ========== PRODUCT MANAGEMENT ==========
  view_products: ["admin", "manager", "purchase", "sales"],  // Removed "store"
  create_product: ["admin"],
  view_unpriced_products: ["finance"],
  set_product_price: ["admin", "finance"],
  view_product_price_history: ["admin", "finance", "purchase"],
  delete_product: ["admin"],

  // ========== SUPPLIER MANAGEMENT ==========
  view_suppliers: ["admin", "purchase"],
  create_supplier: ["purchase"],
  update_supplier: ["purchase"],
  delete_supplier: ["admin"],

  // ========== PROCUREMENT (Purchase Orders) ==========
  view_all_procurement: ["admin", "finance"],
  view_own_procurement: ["purchase"],
  view_branch_procurement: ["manager"],  // Manager handles branch procurement
  
  create_procurement: ["admin", "purchase"],
  view_pending_approvals: ["admin", "finance", "purchase", "manager"],
  approve_procurement: ["finance"],
  reject_procurement: ["finance"],
  receive_procurement: ["manager"],  // Manager now receives goods (was "store")

  // ========== INVENTORY ==========
  view_inventory: ["admin", "manager"],  // Manager handles inventory
  manage_inventory: ["admin", "manager"],
  adjust_stock: ["admin", "manager"],
  view_low_stock_alerts: ["admin", "manager"],

  // ========== STOCK TRANSFERS ==========
  view_transfers: ["admin", "manager"],
  create_transfer: ["manager"],
  approve_transfer: ["admin", "manager"],
  ship_transfer: ["manager"],
  receive_transfer: ["manager"],
  reject_transfer: ["admin", "manager"],

  // ========== SALES MANAGEMENT ==========
  view_sales_products: ["admin", "sales"],
  search_product_by_barcode: ["admin", "sales"],
  get_sale_quote: ["admin", "sales"],
  create_sale: ["admin", "sales"],
  view_sales: ["admin", "manager", "sales"],
  view_todays_sales: ["admin", "manager", "sales"],
  cancel_sale: ["admin", "sales"],

  // ========== BRANCH MANAGEMENT ==========
  view_all_branches: ["admin", "finance"],
  view_own_branch: ["manager", "sales"],  // Manager now has own branch view
  create_branch: ["admin"],
  update_branch: ["admin"],
  delete_branch: ["admin"],
  assign_branch_manager: ["admin"],
  view_branch_staff: ["admin", "manager"],
  view_branch_inventory_summary: ["admin", "finance", "manager"],

  // ========== REPORTS ==========
  view_reports: ["admin", "finance"],
  export_reports: ["admin", "finance"],

  // ========== USER MANAGEMENT ==========
  view_users: ["admin"],
  manage_users: ["admin"],
  view_audit_logs: ["admin"],

  // ========== SETTINGS ==========
  view_settings: ["admin"],
  edit_settings: ["admin"],
} as const

export type Permission = keyof typeof PERMISSIONS

export function hasPermission(role: AppRole, permission: Permission): boolean {
  // Backward compatibility: treat "store" role as "manager"
  const effectiveRole = role === "store" ? "manager" : role
  const allowedRoles = PERMISSIONS[permission]
  
  // Type assertion to fix the TypeScript error
  return (allowedRoles as readonly AppRole[])?.includes(effectiveRole as AppRole) ?? false
}