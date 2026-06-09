// types/actions.ts

export type AuthAction = 
  | "LOGIN"
  | "LOGIN_FAILED"
  | "PASSWORD_RESET"
  | "PASSWORD_SETUP"
  | "LOGOUT";

export type UserAction =
  | "USER_INVITED"
  | "USER_ACTIVATED"
  | "USER_DEACTIVATED"
  | "USER_ROLE_CHANGED"
  | "USER_BRANCH_CHANGED"
  | "USER_UPDATED";

export type BranchAction =
  | "BRANCH_CREATED"
  | "BRANCH_UPDATED"
  | "BRANCH_DEACTIVATED"
  | "BRANCH_ACTIVATED"
  | "MANAGER_ASSIGNED";

export type CatalogAction =
  | "PRODUCT_CREATED"
  | "PRODUCT_UPDATED"
  | "PRODUCT_DELETED"
  | "PRICE_UPDATED"
  | "CATEGORY_CREATED"
  | "CATEGORY_UPDATED"
  | "CATEGORY_DELETED";

export type SupplyChainAction =
  | "SUPPLIER_CREATED"
  | "SUPPLIER_UPDATED"
  | "SUPPLIER_DELETED"
  | "PO_CREATED"
  | "PO_APPROVED"
  | "PO_REJECTED"
  | "PO_RECEIVED";

export type TransactionAction =
  | "SALE_COMPLETED"
  | "SALE_CANCELLED"
  | "TRANSFER_REQUESTED"
  | "TRANSFER_APPROVED"
  | "TRANSFER_REJECTED"
  | "TRANSFER_SHIPPED"
  | "TRANSFER_RECEIVED"
  | "STOCK_ADJUSTED";

export type SystemAction = "SETTINGS_UPDATED";

/**
 * A master type combining all possible actions
**/
export type AppAction =
  | AuthAction
  | UserAction
  | BranchAction
  | CatalogAction
  | SupplyChainAction
  | TransactionAction
  | SystemAction;