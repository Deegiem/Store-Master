import { api } from "@/lib/api"

import type {
  Category,
  CreateCategoryPayload,
  CreateCategoryResponse,
  GetCategoriesParams,
  GetCategoriesResponse,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
  DeleteCategoryResponse,
} from "@/types/category"

export const categoryService = {

  // ================= GET ALL =================
  getCategories: async (
    params?: GetCategoriesParams
  ): Promise<GetCategoriesResponse> => {

    const res = await api.get<GetCategoriesResponse>(
      "/categories/",
      { params }
    )

    return res.data
  },

  // ================= CREATE =================
  createCategory: async (
    payload: CreateCategoryPayload
  ): Promise<CreateCategoryResponse> => {

    const res = await api.post<CreateCategoryResponse>(
      "/categories/",
      payload
    )

    return res.data
  },

  // ================= UPDATE =================
  updateCategory: async (
    categoryId: string,
    payload: UpdateCategoryPayload
  ): Promise<UpdateCategoryResponse> => {

    const res = await api.put<UpdateCategoryResponse>(
      `/categories/${categoryId}`,
      payload
    )

    return res.data
  },

  // ================= DELETE =================
  deleteCategory: async (
    categoryId: string
  ): Promise<DeleteCategoryResponse> => {

    const res = await api.delete<DeleteCategoryResponse>(
      `/categories/${categoryId}`
    )

    return res.data
  },
}