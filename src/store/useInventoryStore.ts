// src/store/useInventoryStore.ts
import { create } from "zustand"
import { inventoryService } from "@/services/inventoryService"
import type {
  InventoryItem,
  InventoryListResponse,
  LowStockResponse,
  AdjustmentPayload,
  AdjustmentResponse,
  AdjustmentHistoryItem,
  AllAdjustmentsResponse,
  AllAdjustmentsItem,
} from "@/types/inventory"

interface InventoryState {
  // State
  inventory: InventoryItem[]
  lowStockItems: InventoryItem[]
  adjustmentHistory: AdjustmentHistoryItem[]
  allAdjustments: AllAdjustmentsItem[]
  
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
  
  lowStockPagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
  
  allAdjustmentsPagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
  
  loading: {
    inventory: boolean
    lowStock: boolean
    adjustStock: boolean
    adjustmentHistory: boolean
    allAdjustments: boolean
  }
  
  error: {
    inventory: string | null
    lowStock: string | null
    adjustStock: string | null
    adjustmentHistory: string | null
    allAdjustments: string | null
  }
  
  lastAdjustment: AdjustmentResponse | null
  
  // Filter state for all adjustments
  adjustmentFilters: {
    branch_id: string | undefined
    reason: string | undefined
  }
  
  // Actions
  fetchBranchInventory: (branchId: string, page?: number, limit?: number) => Promise<void>
  fetchLowStockItems: (branchId: string, page?: number, limit?: number) => Promise<void>
  adjustStock: (payload: AdjustmentPayload) => Promise<AdjustmentResponse | null>
  fetchAdjustmentHistory: (branchId: string) => Promise<void>
  fetchAllAdjustments: (page?: number, limit?: number, branch_id?: string, reason?: string) => Promise<void>
  setAdjustmentFilters: (filters: { branch_id?: string; reason?: string }) => void
  clearErrors: () => void
  clearLastAdjustment: () => void
  reset: () => void
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  // Initial State
  inventory: [],
  lowStockItems: [],
  adjustmentHistory: [],
  allAdjustments: [],
  
  pagination: {
    total: 0,
    page: 1,
    limit: 50,
    pages: 0,
  },
  
  lowStockPagination: {
    total: 0,
    page: 1,
    limit: 50,
    pages: 0,
  },
  
  allAdjustmentsPagination: {
    total: 0,
    page: 1,
    limit: 50,
    pages: 0,
  },
  
  loading: {
    inventory: false,
    lowStock: false,
    adjustStock: false,
    adjustmentHistory: false,
    allAdjustments: false,
  },
  
  error: {
    inventory: null,
    lowStock: null,
    adjustStock: null,
    adjustmentHistory: null,
    allAdjustments: null,
  },
  
  lastAdjustment: null,
  
  adjustmentFilters: {
    branch_id: undefined,
    reason: undefined,
  },
  
  // Fetch branch inventory
  fetchBranchInventory: async (branchId, page = 1, limit = 50) => {
    set((state) => ({
      loading: { ...state.loading, inventory: true },
      error: { ...state.error, inventory: null },
    }))
    
    try {
      const data = await inventoryService.getBranchInventory(branchId, page, limit)
      
      set((state) => ({
        inventory: data.data,
        pagination: {
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
        },
        loading: { ...state.loading, inventory: false },
      }))
    } catch (err: any) {
      console.error("Fetch branch inventory failed:", err)
      set((state) => ({
        error: { ...state.error, inventory: err.message || "Failed to fetch inventory" },
        loading: { ...state.loading, inventory: false },
      }))
    }
  },
  
  // Fetch low stock items
  fetchLowStockItems: async (branchId, page = 1, limit = 50) => {
    set((state) => ({
      loading: { ...state.loading, lowStock: true },
      error: { ...state.error, lowStock: null },
    }))
    
    try {
      const data = await inventoryService.getLowStockItems(branchId, page, limit)
      
      set((state) => ({
        lowStockItems: data.data,
        lowStockPagination: {
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
        },
        loading: { ...state.loading, lowStock: false },
      }))
    } catch (err: any) {
      console.error("Fetch low stock items failed:", err)
      set((state) => ({
        error: { ...state.error, lowStock: err.message || "Failed to fetch low stock items" },
        loading: { ...state.loading, lowStock: false },
      }))
    }
  },
  
  // Adjust stock
  adjustStock: async (payload) => {
    set((state) => ({
      loading: { ...state.loading, adjustStock: true },
      error: { ...state.error, adjustStock: null },
    }))
    
    try {
      const data = await inventoryService.adjustStock(payload)
      
      set((state) => ({
        lastAdjustment: data,
        loading: { ...state.loading, adjustStock: false },
      }))
      
      // Refresh inventory if we have branch_id
      if (payload.branch_id) {
        await get().fetchBranchInventory(payload.branch_id)
        await get().fetchLowStockItems(payload.branch_id)
        await get().fetchAdjustmentHistory(payload.branch_id)
      }
      
      return data
    } catch (err: any) {
      console.error("Adjust stock failed:", err)
      set((state) => ({
        error: { ...state.error, adjustStock: err.message || "Failed to adjust stock" },
        loading: { ...state.loading, adjustStock: false },
      }))
      return null
    }
  },
  
  // Fetch adjustment history for a branch
  fetchAdjustmentHistory: async (branchId) => {
    set((state) => ({
      loading: { ...state.loading, adjustmentHistory: true },
      error: { ...state.error, adjustmentHistory: null },
    }))
    
    try {
      const data = await inventoryService.getBranchAdjustmentHistory(branchId)
      
      set((state) => ({
        adjustmentHistory: data,
        loading: { ...state.loading, adjustmentHistory: false },
      }))
    } catch (err: any) {
      console.error("Fetch adjustment history failed:", err)
      set((state) => ({
        error: { ...state.error, adjustmentHistory: err.message || "Failed to fetch adjustment history" },
        loading: { ...state.loading, adjustmentHistory: false },
      }))
    }
  },
  
  // Fetch all adjustments across system
  fetchAllAdjustments: async (page = 1, limit = 50, branch_id, reason) => {
    set((state) => ({
      loading: { ...state.loading, allAdjustments: true },
      error: { ...state.error, allAdjustments: null },
    }))
    
    try {
      const data = await inventoryService.getAllAdjustments(page, limit, branch_id, reason)
      
      set((state) => ({
        allAdjustments: data.data,
        allAdjustmentsPagination: {
          total: data.total,
          page: data.page,
          limit: data.limit,
          pages: data.pages,
        },
        loading: { ...state.loading, allAdjustments: false },
      }))
    } catch (err: any) {
      console.error("Fetch all adjustments failed:", err)
      set((state) => ({
        error: { ...state.error, allAdjustments: err.message || "Failed to fetch adjustments" },
        loading: { ...state.loading, allAdjustments: false },
      }))
    }
  },
  
  setAdjustmentFilters: (filters) => {
    set((state) => ({
      adjustmentFilters: {
        ...state.adjustmentFilters,
        ...filters,
      },
    }))
  },
  
  clearErrors: () => {
    set({
      error: {
        inventory: null,
        lowStock: null,
        adjustStock: null,
        adjustmentHistory: null,
        allAdjustments: null,
      },
    })
  },
  
  clearLastAdjustment: () => {
    set({ lastAdjustment: null })
  },
  
  reset: () => {
    set({
      inventory: [],
      lowStockItems: [],
      adjustmentHistory: [],
      allAdjustments: [],
      pagination: { total: 0, page: 1, limit: 50, pages: 0 },
      lowStockPagination: { total: 0, page: 1, limit: 50, pages: 0 },
      allAdjustmentsPagination: { total: 0, page: 1, limit: 50, pages: 0 },
      loading: {
        inventory: false,
        lowStock: false,
        adjustStock: false,
        adjustmentHistory: false,
        allAdjustments: false,
      },
      error: {
        inventory: null,
        lowStock: null,
        adjustStock: null,
        adjustmentHistory: null,
        allAdjustments: null,
      },
      lastAdjustment: null,
      adjustmentFilters: { branch_id: undefined, reason: undefined },
    })
  },
}))