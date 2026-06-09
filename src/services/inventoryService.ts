// // src/services/inventoryService.ts
// import { api } from "@/lib/api"
// import type {
//   InventoryItem,
//   LowStockItem,
//   AdjustmentLog,
//   AdjustStockRequest,
//   PaginatedResponse,
// } from "@/types/inventory"

// class InventoryService {
//   // Get branch inventory with pagination
//   async getBranchInventory(
//     branchId: string,
//     page: number = 1,
//     limit: number = 50
//   ): Promise<PaginatedResponse<InventoryItem>> {
//     const response = await api.get(`/inventory/${branchId}`, {
//       params: { page, limit },
//     })
//     return response.data
//   }

//   // Get low stock items
//   async getLowStockItems(
//     branchId: string,
//     page: number = 1,
//     limit: number = 50
//   ): Promise<PaginatedResponse<LowStockItem>> {
//     const response = await api.get(`/inventory/${branchId}/low-stock`, {
//       params: { page, limit },
//     })
//     return response.data
//   }

//   // Adjust stock (remove stock)
//   async adjustStock(data: AdjustStockRequest): Promise<{ message: string }> {
//     const response = await api.post("/inventory/adjust", data)
//     return response.data
//   }

//   // Get adjustment history for a branch
//   async getAdjustmentHistory(branchId: string): Promise<AdjustmentLog[]> {
//     const response = await api.get(`/inventory/history/${branchId}`)
//     return response.data
//   }

//   // Get all adjustment logs (admin & finance only)
//   async getAllAdjustmentLogs(
//     branchId?: string,
//     reason?: string,
//     page: number = 1,
//     limit: number = 50
//   ): Promise<PaginatedResponse<AdjustmentLog>> {
//     const response = await api.get("/inventory/adjustments/all", {
//       params: { branch_id: branchId, reason, page, limit },
//     })
//     return response.data
//   }
// }

// export const inventoryService = new InventoryService()


// src/services/inventoryService.ts
import { api } from "@/lib/api"
import type {
  InventoryListResponse,
  LowStockResponse,
  AdjustmentPayload,
  AdjustmentResponse,
  AdjustmentHistoryItem,
  AllAdjustmentsResponse,
} from "@/types/inventory"

export const inventoryService = {
  // Get all inventory items for a branch
  getBranchInventory: async (
    branchId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<InventoryListResponse> => {
    const res = await api.get(`/inventory/${branchId}`, {
      params: { page, limit },
    })
    return res.data
  },

  // Get low-stock items for a branch
  getLowStockItems: async (
    branchId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<LowStockResponse> => {
    const res = await api.get(`/inventory/${branchId}/low-stock`, {
      params: { page, limit },
    })
    return res.data
  },

  // Adjust stock (reduce for non-sale reasons)
  adjustStock: async (payload: AdjustmentPayload): Promise<AdjustmentResponse> => {
    const res = await api.post("/inventory/adjust", payload)
    return res.data
  },

  // Get adjustment history for a specific branch
  getBranchAdjustmentHistory: async (branchId: string): Promise<AdjustmentHistoryItem[]> => {
    const res = await api.get(`/inventory/history/${branchId}`)
    return res.data
  },

  // Get all adjustments across all branches (Admin/Finance only)
  getAllAdjustments: async (
    page: number = 1,
    limit: number = 50,
    branch_id?: string,
    reason?: string
  ): Promise<AllAdjustmentsResponse> => {
    const res = await api.get("/inventory/adjustments/all", {
      params: { page, limit, branch_id, reason },
    })
    return res.data
  },
}