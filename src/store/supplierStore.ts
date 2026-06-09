import { create } from "zustand"

import { supplierService } from "@/services/supplierService"

import type {
  Supplier,
  CreateSupplierPayload,
  UpdateSupplierPayload,
  DeleteSupplierResponse,
} from "@/types/supplier"

const normalizeSupplier = (supplier: Supplier): Supplier => ({
  ...supplier,
  supplier_id: supplier.supplier_id ?? supplier.id,
  supplier_name: supplier.supplier_name ?? supplier.name,
  company_name: supplier.company_name ?? supplier.name,
})

interface SupplierState {
  suppliers: Supplier[]

  selectedSupplier: Supplier | null

  total: number
  page: number
  limit: number
  pages: number

  loading: {
    suppliers: boolean
    selectedSupplier: boolean
    createSupplier: boolean
    updateSupplier: boolean
    deleteSupplier: boolean
  }

  error: {
    suppliers: string | null
    selectedSupplier: string | null
    createSupplier: string | null
    updateSupplier: string | null
    deleteSupplier: string | null
  }

  fetchSuppliers: (
    page?: number,
    limit?: number
  ) => Promise<void>

  fetchSupplierById: (
    supplierId: string
  ) => Promise<void>

  createSupplier: (
    payload: CreateSupplierPayload
  ) => Promise<boolean>

  updateSupplier: (
    supplierId: string,
    payload: UpdateSupplierPayload
  ) => Promise<boolean>

  deleteSupplier: (
    supplierId: string
  ) => Promise<DeleteSupplierResponse | null>
}

export const useSupplierStore =
  create<SupplierState>((set) => ({
    suppliers: [],

    selectedSupplier: null,

    total: 0,
    page: 1,
    limit: 50,
    pages: 1,

    loading: {
      suppliers: false,
      selectedSupplier: false,
      createSupplier: false,
      updateSupplier: false,
      deleteSupplier: false,
    },

    error: {
      suppliers: null,
      selectedSupplier: null,
      createSupplier: null,
      updateSupplier: null,
      deleteSupplier: null,
    },

    fetchSuppliers: async (
      page = 1,
      limit = 50
    ) => {
      set((state) => ({
        loading: {
          ...state.loading,
          suppliers: true,
        },
      }))

      try {
        const data =
          await supplierService.getSuppliers(
            page,
            limit
          )

        set((state) => ({
          suppliers: data.data.map(normalizeSupplier),

          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,

          loading: {
            ...state.loading,
            suppliers: false,
          },
        }))
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            suppliers:
              err.response?.data?.detail ||
              err.message,
          },

          loading: {
            ...state.loading,
            suppliers: false,
          },
        }))
      }
    },

    fetchSupplierById: async (
      supplierId: string
    ) => {
      set((state) => ({
        loading: {
          ...state.loading,
          selectedSupplier: true,
        },
      }))

      try {
        const data =
          await supplierService.getSupplierById(
            supplierId
          )

        set((state) => ({
          selectedSupplier: normalizeSupplier(data),

          loading: {
            ...state.loading,
            selectedSupplier: false,
          },
        }))
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            selectedSupplier:
              err.response?.data?.detail ||
              err.message,
          },

          loading: {
            ...state.loading,
            selectedSupplier: false,
          },
        }))
      }
    },

    createSupplier: async (payload) => {
      set((state) => ({
        loading: {
          ...state.loading,
          createSupplier: true,
        },

        error: {
          ...state.error,
          createSupplier: null,
        },
      }))

      try {
        const supplier =
          await supplierService.createSupplier(
            payload
          )

        set((state) => ({
          suppliers: [
            normalizeSupplier(supplier),
            ...state.suppliers,
          ],

          loading: {
            ...state.loading,
            createSupplier: false,
          },
        }))

        return true
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            createSupplier:
              err.response?.data?.detail ||
              err.message,
          },

          loading: {
            ...state.loading,
            createSupplier: false,
          },
        }))

        return false
      }
    },

    updateSupplier: async (
      supplierId,
      payload
    ) => {
      set((state) => ({
        loading: {
          ...state.loading,
          updateSupplier: true,
        },
      }))

      try {
        const updated =
          await supplierService.updateSupplier(
            supplierId,
            payload
          )

        set((state) => ({
          suppliers: state.suppliers.map(
            (supplier) =>
              supplier.id === supplierId
                ? normalizeSupplier(updated)
                : supplier
          ),

          selectedSupplier: normalizeSupplier(updated),

          loading: {
            ...state.loading,
            updateSupplier: false,
          },
        }))

        return true
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            updateSupplier:
              err.response?.data?.detail ||
              err.message,
          },

          loading: {
            ...state.loading,
            updateSupplier: false,
          },
        }))

        return false
      }
    },

    deleteSupplier: async (
      supplierId
    ) => {
      set((state) => ({
        loading: {
          ...state.loading,
          deleteSupplier: true,
        },
      }))

      try {
        const data =
          await supplierService.deleteSupplier(
            supplierId
          )

        set((state) => ({
          suppliers: state.suppliers.filter(
            (supplier) =>
              supplier.id !== supplierId
          ),

          loading: {
            ...state.loading,
            deleteSupplier: false,
          },
        }))

        return data
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            deleteSupplier:
              err.response?.data?.detail ||
              err.message,
          },

          loading: {
            ...state.loading,
            deleteSupplier: false,
          },
        }))

        return null
      }
    },
  }))
