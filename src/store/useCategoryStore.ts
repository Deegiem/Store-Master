import { create } from "zustand"
import { categoryService } from "@/services/categoryService"

import type {
  Category,
  CreateCategoryPayload,
  CreateCategoryResponse,
  UpdateCategoryPayload,
  UpdateCategoryResponse,
  DeleteCategoryResponse,
} from "@/types/category"

const normalizeCategory = (category: Category): Category => ({
  ...category,
  category_id: category.category_id ?? category.id,
})

interface CategoryState {

  // ================= STATE =================
  categories: Category[]

  categoryloading: {
    categories: boolean
    createCategory: boolean
    updateCategory: boolean
    deleteCategory: boolean
  }

  loading: boolean

  error: {
    categories: string | null
    createCategory: string | null
    updateCategory: string | null
    deleteCategory: string | null
  }

  // ================= ACTIONS =================
  fetchCategories: () => Promise<void>

  createCategory: (
    payload: CreateCategoryPayload
  ) => Promise<CreateCategoryResponse | null>

  createCategories: (
    payload: { categories: string[] }
  ) => Promise<CreateCategoryResponse[]>

  updateCategory: (
    categoryId: string,
    payload: UpdateCategoryPayload
  ) => Promise<UpdateCategoryResponse | null>

  deleteCategory: (
    categoryId: string
  ) => Promise<DeleteCategoryResponse | null>
}

export const useCategoryStore = create<CategoryState>((set) => ({

  // ================= INITIAL STATE =================
  categories: [],

  categoryloading: {
    categories: false,
    createCategory: false,
    updateCategory: false,
    deleteCategory: false,
  },

  loading: false,

  error: {
    categories: null,
    createCategory: null,
    updateCategory: null,
    deleteCategory: null,
  },

  // ================= FETCH =================
  fetchCategories: async () => {

    set((state) => ({
        categoryloading: {
          ...state.categoryloading,
          categories: true,
        },
        loading: true,
      }))

    try {

      console.log("📡 Fetching categories...")

      const data = await categoryService.getCategories()

      console.log("✅ Categories fetched:", data)

      set((state) => ({
        categories: data.map(normalizeCategory),

        categoryloading: {
          ...state.categoryloading,
          categories: false,
        },
        loading: false,
      }))

    } catch (err: any) {

      console.error("❌ Fetch categories failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          categories: err.message,
        },

        categoryloading: {
          ...state.categoryloading,
          categories: false,
        },
        loading: false,
      }))
    }
  },

  // ================= CREATE =================
  createCategory: async (payload) => {

    set((state) => ({
        categoryloading: {
          ...state.categoryloading,
          createCategory: true,
        },
        loading: true,
      }))

    try {

      console.log("📡 Creating category:", payload)

      const data =
        await categoryService.createCategory(payload)

      console.log("✅ Category created:", data)

      set((state) => ({
        categories: [normalizeCategory(data), ...state.categories],

        categoryloading: {
          ...state.categoryloading,
          createCategory: false,
        },
        loading: false,
      }))

      return data

    } catch (err: any) {

      console.error("❌ Create category failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          createCategory: err.message,
        },

        categoryloading: {
          ...state.categoryloading,
          createCategory: false,
        },
        loading: false,
      }))

      return null
    }
  },

  createCategories: async ({ categories }) => {
    const created: CreateCategoryResponse[] = []

    for (const name of categories) {
      const category = await useCategoryStore
        .getState()
        .createCategory({
          name,
          description: "",
          icon: "",
        })

      if (category) created.push(category)
    }

    return created
  },

  // ================= UPDATE =================
  updateCategory: async (
    categoryId,
    payload
  ) => {

    set((state) => ({
        categoryloading: {
          ...state.categoryloading,
          updateCategory: true,
        },
        loading: true,
      }))

    try {

      console.log("📡 Updating category:", categoryId)

      const data =
        await categoryService.updateCategory(
          categoryId,
          payload
        )

      console.log("✅ Category updated:", data)

      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? normalizeCategory(data)
            : category
        ),

        categoryloading: {
          ...state.categoryloading,
          updateCategory: false,
        },
        loading: false,
      }))

      return data

    } catch (err: any) {

      console.error("❌ Update category failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          updateCategory: err.message,
        },

        categoryloading: {
          ...state.categoryloading,
          updateCategory: false,
        },
        loading: false,
      }))

      return null
    }
  },

  // ================= DELETE =================
  deleteCategory: async (categoryId) => {

    set((state) => ({
        categoryloading: {
          ...state.categoryloading,
          deleteCategory: true,
        },
        loading: true,
      }))

    try {

      console.log("📡 Deleting category:", categoryId)

      const data =
        await categoryService.deleteCategory(categoryId)

      console.log("✅ Category deleted:", data)

      set((state) => ({
        categories: state.categories.filter(
          (category) => category.id !== categoryId
        ),

        categoryloading: {
          ...state.categoryloading,
          deleteCategory: false,
        },
        loading: false,
      }))

      return data

    } catch (err: any) {

      console.error("❌ Delete category failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          deleteCategory: err.message,
        },

        categoryloading: {
          ...state.categoryloading,
          deleteCategory: false,
        },
        loading: false,
      }))

      return null
    }
  },
}))
