// /types/category.ts
export interface Category {
  category_id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateCategoryPayload {
  categories: string[];
}
