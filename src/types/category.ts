// ================= BASE CATEGORY =================
export interface Category {
  id: string
  category_id?: string
  name: string
  slug: string
  description: string
  icon: string
  product_count?: number
  products?: unknown[]
}

// ================= CREATE CATEGORY =================
export interface CreateCategoryPayload {
  name: string
  description: string
  icon: string
}

export interface CreateCategoryResponse {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

// ================= GET ALL CATEGORIES =================
export interface GetCategoriesParams {
  page?: number
  limit?: number
}

export type GetCategoriesResponse = Category[]

// ================= UPDATE CATEGORY =================
export interface UpdateCategoryPayload {
  name?: string
  description?: string
  icon?: string
}

export interface UpdateCategoryResponse {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

// ================= DELETE CATEGORY =================
export interface DeleteCategoryResponse {
  message: string
}
