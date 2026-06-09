import { api } from "@/lib/api"

import type {
  AllBranches,
  CreateBranchPayload,
  CreateBranchResponse,
  UpdateBranchParams,
  UpdateBranchResponse,
  AssignBranchManagerPayload,
  AssignBranchManagerResponse,
  ToggleBranchStatusPayload,
  ToggleBranchStatusResponse,
  GetBranchStaffResponse,
  GetBranchInventorySummaryResponse,
  Branch,
} from "@/types/branch"

export const branchService = {

  // 1. LIST ALL BRANCHES (FIXED SHAPE HANDLING)
  getAllBranches: async (): Promise<AllBranches[]> => {

    const res = await api.get("/branches")

    // backend returns: { data: [...] }
    return res.data.data ?? res.data ?? []
  },

  // 2. CREATE BRANCH
  createBranch: async (
    payload: CreateBranchPayload
  ): Promise<CreateBranchResponse> => {

    const res = await api.post("/branches", payload)
    return res.data
  },

  // 3. GET BRANCH BY ID
  getBranchById: async (
    branchId: string
  ): Promise<Branch> => {

    const res = await api.get(`/branches/${branchId}`)
    return res.data
  },

  // 4. UPDATE BRANCH (FIXED: PUT not PATCH)
  updateBranch: async (
    branchId: string,
    payload: UpdateBranchParams
  ): Promise<UpdateBranchResponse> => {

    const res = await api.put(
      `/branches/${branchId}`,
      payload
    )

    return res.data
  },

  // 5. ASSIGN MANAGER
  assignManagerToBranch: async (
    branchId: string,
    payload: AssignBranchManagerPayload
  ): Promise<AssignBranchManagerResponse> => {

    const res = await api.patch(
      `/branches/${branchId}/manager`,
      payload
    )

    return res.data
  },

  // 6. TOGGLE STATUS
  toggleBranchStatus: async (
    branchId: string,
    payload: ToggleBranchStatusPayload
  ): Promise<ToggleBranchStatusResponse> => {

    const res = await api.patch<ToggleBranchStatusResponse>(
      `/branches/${branchId}/status`,
      null,
      {
        params: {
          active: payload.is_active,
        },
      }
    )

    return res.data
  },

  // 7. STAFF
  getBranchStaff: async (
    branchId: string
  ): Promise<GetBranchStaffResponse> => {

    const res = await api.get(
      `/branches/${branchId}/staff`
    )

    return res.data
  },

  // 8. INVENTORY SUMMARY
  getBranchInventorySummary: async (
    branchId: string
  ): Promise<GetBranchInventorySummaryResponse> => {

    const res = await api.get(
      `/branches/${branchId}/inventory-summary`
    )

    return res.data
  },
}