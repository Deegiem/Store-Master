import type { Role } from "@/types/role"


// 1. LIST aLL BRANCHES DOMAINS:
export interface AllBranches {
    id: string
    name: string
    code: string
    address: string
    phone: string
    zones: string[]
    manager_id: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}


// 2. CREATE BRANCH DETAILS DOMAIN
export interface CreateBranchPayload {
    name: string
    code: string
    address: string
    phone: string
    zones: string[]
}

export interface CreateBranchResponse {
    name: string
    code: string
    address: string
    phone: string
    zones: string[]
    id: string
    manager_id: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}


// 3. GET BRANCH DETAILS BY ID DOMAIN
export interface Branch {
  id: string
  name: string
  code: string
  address: string
  phone: string
  zones: string[]
  manager_id: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type BranchListResponse = Branch[]

export type BranchStatusFilter = "all" | "active" | "inactive"


export interface BranchQuery {
  search?: string
  status?: BranchStatusFilter
}

// 3. UPDATE BRANCH DETAILS DOMAIN
export interface UpdateBranchParams {
    name?: string
    address?: string
    phone?: string
    zones?: string[]
}

export interface UpdateBranchResponse {
    name: string
    code: string
    address: string
    phone: string
    zones: string[]
    id: string
    manager_id: string | null
    is_active: boolean
    created_at: string
    updated_at: string
}

// 4. ASSIGN MANAGER TO BRANCH DOMAIN
export interface AssignBranchManagerParams {
    branch_id: string
}

export interface AssignBranchManagerPayload {
    manager_id: string
}

export interface AssignBranchManagerResponse {
    message: string
    branch_id: string
    manager_id: string
    manager_name: string
}


// 5. DEACTIVATE/REACTIVATE BRANCH DOMAIN
export interface ToggleBranchStatusPayload {
    is_active: boolean
}

export interface ToggleBranchStatusResponse {
    message: string
    branch_id: string
    is_active: boolean
}

// 6. BRANCH STAFF DOMAIN
export interface GetBranchStaffParams {
  branch_id: string
}

export interface BranchStaffMember {
  user_id: string
  name: string
  email: string
  role: Role
  is_active: boolean
}

export interface GetBranchStaffResponse {
  branch_id: string
  branch_name: string
  total_staff: number
  staff: BranchStaffMember[]
}


// 7. BRANCH INVENTORY SUMMARY DOMAIN
export interface GetBranchInventorySummaryParams {
  branch_id: string
}

export interface LowStockItem {
  product_id: string
  product_name: string
  quantity: number
  reorder_point: number
}

export interface GetBranchInventorySummaryResponse {
  branch_id: string
  branch_name: string
  total_products: number
  total_units_in_stock: number
  low_stock_count: number
  out_of_stock_count: number
  low_stock_items: LowStockItem[]
}