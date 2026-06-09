// src/hooks/usePermissions.ts
import { useAuthStore } from "@/store/useAuthStore"
import { normalizeRole, type AppRole, getDisplayRole } from "@/lib/roleMapper"
import { hasPermission, type Permission } from "@/lib/permissions"

// Define role hierarchy for access levels
const ROLE_HIERARCHY: Record<AppRole, number> = {
  admin: 100,
  manager: 80,
  finance: 70,
  purchase: 60,
  store: 50,
  sales: 40,
  guest: 0,
}

export function usePermissions() {
  const { profile } = useAuthStore()
  const rawRole = profile?.role
  const role = normalizeRole(rawRole)
  const displayRole = getDisplayRole(role)
  const userBranchId = profile?.branchId

  // Base permission check
  const can = (permission: Permission): boolean => {
    return hasPermission(role, permission)
  }

  // Check if user has specific role (or higher in hierarchy)
  const hasRole = (requiredRole: AppRole): boolean => {
    return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[requiredRole]
  }

  // Check if user has exactly this role
  const isExactRole = (requiredRole: AppRole): boolean => {
    return role === requiredRole
  }

  // ========== DASHBOARD ACCESS ==========
  const canViewAdminDashboard = can("view_admin_dashboard")
  const canViewFinanceDashboard = can("view_finance_dashboard")
  const canViewPurchaseDashboard = can("view_purchase_dashboard")
  const canViewStoreManagerDashboard = can("view_store_manager_dashboard")
  const canViewStoreStaffDashboard = can("view_store_staff_dashboard")
  const canViewSalesDashboard = can("view_sales_dashboard")

  // ========== CATEGORY MANAGEMENT ==========
  const canViewCategories = can("view_categories")
  const canCreateCategory = can("create_category")
  const canUpdateCategory = can("update_category")
  const canDeleteCategory = can("delete_category")

  // ========== PRODUCT MANAGEMENT ==========
  const canViewProducts = can("view_products")
  const canCreateProduct = can("create_product")
  const canViewUnpricedProducts = can("view_unpriced_products")
  const canSetProductPrice = can("set_product_price")
  const canViewPriceHistory = can("view_product_price_history")
  const canDeleteProduct = can("delete_product")

  // ========== SUPPLIER MANAGEMENT ==========
  const canViewSuppliers = can("view_suppliers")
  const canCreateSupplier = can("create_supplier")
  const canUpdateSupplier = can("update_supplier")
  const canDeleteSupplier = can("delete_supplier")

  // ========== PROCUREMENT (Purchase Orders) ==========
  const canViewAllProcurement = can("view_all_procurement")
  const canViewOwnProcurement = can("view_own_procurement")
  const canViewBranchProcurement = can("view_branch_procurement")
  const canCreateProcurement = can("create_procurement")
  const canViewPendingApprovals = can("view_pending_approvals")
  const canApproveProcurement = can("approve_procurement")
  const canRejectProcurement = can("reject_procurement")
  const canReceiveProcurement = can("receive_procurement")

  // Check if user can view a specific PO (role-based scoping)
  const canViewPurchaseOrder = (poCreatedBy: string, poBranchId: string): boolean => {
    if (role === "admin" || role === "finance") return true
    if (role === "purchase") return poCreatedBy === profile?.id
    if (role === "manager" || role === "store") return userBranchId === poBranchId
    return false
  }

  // ========== INVENTORY MANAGEMENT ==========
  const canViewInventory = can("view_inventory")
  const canManageInventory = can("manage_inventory")
  const canAdjustStock = can("adjust_stock")
  const canViewLowStockAlerts = can("view_low_stock_alerts")

  // ========== STOCK TRANSFERS ==========
  const canViewTransfers = can("view_transfers")
  const canCreateTransfer = can("create_transfer")
  const canApproveTransfer = can("approve_transfer")
  const canShipTransfer = can("ship_transfer")
  const canReceiveTransfer = can("receive_transfer")
  const canRejectTransfer = can("reject_transfer")

  // ========== SALES MANAGEMENT ==========
  const canViewSalesProducts = can("view_sales_products")
  const canSearchProductByBarcode = can("search_product_by_barcode")
  const canGetSaleQuote = can("get_sale_quote")
  const canCreateSale = can("create_sale")
  const canViewSales = can("view_sales")
  const canViewTodaysSales = can("view_todays_sales")
  const canCancelSale = can("cancel_sale")

  // ========== BRANCH MANAGEMENT ==========
  const canViewAllBranches = can("view_all_branches")
  const canCreateBranch = can("create_branch")
  const canUpdateBranch = can("update_branch")
  const canDeleteBranch = can("delete_branch")
  const canAssignBranchManager = can("assign_branch_manager")
  const canViewBranchStaff = can("view_branch_staff")
  const canViewBranchInventorySummary = can("view_branch_inventory_summary")

  // Check if user can view a specific branch
  const canViewBranch = (branchId: string): boolean => {
    if (role === "admin" || role === "finance") return true
    if (["manager", "store", "sales"].includes(role)) {
      return userBranchId === branchId
    }
    return false
  }

  // Check if user can view staff for a specific branch
  const canViewBranchStaffForBranch = (branchId: string): boolean => {
    if (role === "admin") return true
    if (role === "manager") return userBranchId === branchId
    return false
  }

  // Check if user can view inventory summary for a specific branch
  const canViewBranchInventoryForBranch = (branchId: string): boolean => {
    if (role === "admin" || role === "finance") return true
    if (role === "manager") return userBranchId === branchId
    return false
  }

  // Check if user can see inactive branches
  const canSeeInactiveBranches = (): boolean => {
    return role === "admin" || role === "finance"
  }

  // Get branch visibility level
  const getBranchVisibilityLevel = (): "full" | "summary" | "none" => {
    if (role === "admin" || role === "finance") return "full"
    if (["manager", "store", "sales"].includes(role)) return "summary"
    return "none"
  }

  // ========== REPORTS ==========
  const canViewReports = can("view_reports")
  const canExportReports = can("export_reports")

  // ========== USER MANAGEMENT ==========
  const canViewUsers = can("view_users")
  const canManageUsers = can("manage_users")
  const canViewAuditLogs = can("view_audit_logs")

  // ========== SETTINGS ==========
  const canViewSettings = can("view_settings")
  const canEditSettings = can("edit_settings")

  // ========== ROLE CONVENIENCE GETTERS ==========
  const isAdmin = role === "admin"
  const isManager = role === "manager"
  const isFinance = role === "finance"
  const isPurchase = role === "purchase"
  const isStore = role === "store"
  const isSales = role === "sales"

  // For backward compatibility with Navigation component
  const roleKey = role

  return {
    // Base
    role,
    roleKey,
    displayRole,
    userBranchId,
    
    // Permission checker
    can,
    hasRole,
    isExactRole,
    
    // Dashboard
    canViewAdminDashboard,
    canViewFinanceDashboard,
    canViewPurchaseDashboard,
    canViewStoreManagerDashboard,
    canViewStoreStaffDashboard,
    canViewSalesDashboard,
    
    // Categories
    canViewCategories,
    canCreateCategory,
    canUpdateCategory,
    canDeleteCategory,
    
    // Products
    canViewProducts,
    canCreateProduct,
    canViewUnpricedProducts,
    canSetProductPrice,
    canViewPriceHistory,
    canDeleteProduct,
    
    // Suppliers
    canViewSuppliers,
    canCreateSupplier,
    canUpdateSupplier,
    canDeleteSupplier,
    
    // Procurement
    canViewAllProcurement,
    canViewOwnProcurement,
    canViewBranchProcurement,
    canCreateProcurement,
    canViewPendingApprovals,
    canApproveProcurement,
    canRejectProcurement,
    canReceiveProcurement,
    canViewPurchaseOrder,
    
    // Inventory
    canViewInventory,
    canManageInventory,
    canAdjustStock,
    canViewLowStockAlerts,
    
    // Stock Transfers
    canViewTransfers,
    canCreateTransfer,
    canApproveTransfer,
    canShipTransfer,
    canReceiveTransfer,
    canRejectTransfer,
    
    // Sales
    canViewSalesProducts,
    canSearchProductByBarcode,
    canGetSaleQuote,
    canCreateSale,
    canViewSales,
    canViewTodaysSales,
    canCancelSale,
    
    // Branches
    canViewAllBranches,
    canCreateBranch,
    canUpdateBranch,
    canDeleteBranch,
    canAssignBranchManager,
    canViewBranchStaff: canViewBranchStaffForBranch,
    canViewBranchInventory: canViewBranchInventoryForBranch,
    canViewBranch,
    canSeeInactiveBranches,
    getBranchVisibilityLevel,
    
    // Reports
    canViewReports,
    canExportReports,
    
    // Users
    canViewUsers,
    canManageUsers,
    canViewAuditLogs,
    
    // Settings
    canViewSettings,
    canEditSettings,
    
    // Role convenience
    isAdmin,
    isManager,
    isFinance,
    isPurchase,
    isStore,
    isSales,
  }
}