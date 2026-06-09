export type AuditAction =
  | "LOGIN"
  | "LOGIN_FAILED"
  | "PASSWORD_RESET"
  | "PASSWORD_SETUP"
  | "LOGOUT"
  | "USER_INVITED"
  | "USER_ACTIVATED"
  | "USER_DEACTIVATED"
  | "USER_ROLE_CHANGED"
  | "USER_BRANCH_CHANGED"
  | "USER_UPDATED"
  | "BRANCH_CREATED"
  | "BRANCH_UPDATED"
  | "BRANCH_DEACTIVATED"
  | "BRANCH_ACTIVATED"
  | "MANAGER_ASSIGNED"
  | "PRODUCT_CREATED"
  | "PRODUCT_UPDATED"
  | "PRODUCT_DELETED"
  | "PRICE_UPDATED"
  | "CATEGORY_CREATED"
  | "CATEGORY_UPDATED"
  | "CATEGORY_DELETED"
  | "SUPPLIER_CREATED"
  | "SUPPLIER_UPDATED"
  | "SUPPLIER_DELETED"
  | "PO_CREATED"
  | "PO_APPROVED"
  | "PO_REJECTED"
  | "PO_RECEIVED"
  | "SALE_COMPLETED"
  | "SALE_CANCELLED"
  | "TRANSFER_REQUESTED"
  | "TRANSFER_APPROVED"
  | "TRANSFER_REJECTED"
  | "TRANSFER_SHIPPED"
  | "TRANSFER_RECEIVED"
  | "STOCK_ADJUSTED"
  | "SETTINGS_UPDATED"

export type AuditModule =
  | "auth"
  | "users"
  | "branches"
  | "products"
  | "categories"
  | "suppliers"
  | "procurement"
  | "sales"
  | "transfers"
  | "inventory"
  | "system"

export interface AuditLogQueryParams {
  user_id?: string
  module?: AuditModule
  action?: AuditAction
  branch_id?: string
  start_date?: string
  end_date?: string
  page?: number
  limit?: number
}

export interface AuditTrailsParams {
  page?: number
  limit?: number
}

export interface FailedLoginQueryParams {
  hours?: number
}