import { create } from "zustand"
import { branchService } from "@/services/branchService"

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
} from "@/types/branch"

interface BranchState {
  // ================= STATE =================
  branches: AllBranches[]
  selectedBranch: AllBranches | null

  branchStaff: GetBranchStaffResponse | null
  inventorySummary: GetBranchInventorySummaryResponse | null

  branchloading: {
    branches: boolean
    selectedBranch: boolean
    createBranch: boolean
    updateBranch: boolean
    assignManager: boolean
    toggleStatus: boolean
    branchStaff: boolean
    inventorySummary: boolean
  }

  error: {
    branches: string | null
    selectedBranch: string | null
    createBranch: string | null
    updateBranch: string | null
    assignManager: string | null
    toggleStatus: string | null
    branchStaff: string | null
    inventorySummary: string | null
  }

  // ================= ACTIONS =================
  fetchBranches: () => Promise<void>

  fetchBranchById: (
    branchId: string
  ) => Promise<void>

  createBranch: (
    payload: CreateBranchPayload
  ) => Promise<CreateBranchResponse | null>

  updateBranch: (
    branchId: string,
    payload: UpdateBranchParams
  ) => Promise<UpdateBranchResponse | null>

  assignManagerToBranch: (
    branchId: string,
    payload: AssignBranchManagerPayload
  ) => Promise<AssignBranchManagerResponse | null>

  toggleBranchStatus: (
    branchId: string,
    payload: ToggleBranchStatusPayload
  ) => Promise<ToggleBranchStatusResponse | null>

  fetchBranchStaff: (
    branchId: string
  ) => Promise<void>

  fetchBranchInventorySummary: (
    branchId: string
  ) => Promise<void>
}

export const useBranchStore = create<BranchState>((set) => ({
  // ================= INITIAL STATE =================
  branches: [],
  selectedBranch: null,

  branchStaff: null,
  inventorySummary: null,

  branchloading: {
    branches: false,
    selectedBranch: false,
    createBranch: false,
    updateBranch: false,
    assignManager: false,
    toggleStatus: false,
    branchStaff: false,
    inventorySummary: false,
  },

  error: {
    branches: null,
    selectedBranch: null,
    createBranch: null,
    updateBranch: null,
    assignManager: null,
    toggleStatus: null,
    branchStaff: null,
    inventorySummary: null,
  },

  // ================= FETCH ALL BRANCHES =================
  fetchBranches: async () => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        branches: true,
      },
      error: {
        ...state.error,
        branches: null,
      },
    }))

    try {
      console.log("📡 Fetching branches...")

      const data = await branchService.getAllBranches()

      console.log("✅ Branches fetched:", data)

      set((state) => ({
        branches: data,
        branchloading: {
          ...state.branchloading,
          branches: false,
        },
      }))
    } catch (err: any) {
      console.error("❌ Fetch branches failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          branches: err.message,
        },
        branchloading: {
          ...state.branchloading,
          branches: false,
        },
      }))
    }
  },

  // ================= FETCH BRANCH BY ID =================
  fetchBranchById: async (branchId) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        selectedBranch: true,
      },
      error: {
        ...state.error,
        selectedBranch: null,
      },
    }))

    try {
      console.log("📡 Fetching branch:", branchId)

      const data = await branchService.getBranchById(branchId)

      console.log("✅ Branch fetched:", data)

      set((state) => ({
        selectedBranch: data,
        branchloading: {
          ...state.branchloading,
          selectedBranch: false,
        },
      }))
    } catch (err: any) {
      console.error("❌ Fetch branch failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          selectedBranch: err.message,
        },
        branchloading: {
          ...state.branchloading,
          selectedBranch: false,
        },
      }))
    }
  },

  // ================= CREATE BRANCH =================
  createBranch: async (payload) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        createBranch: true,
      },
      error: {
        ...state.error,
        createBranch: null,
      },
    }))

    try {
      console.log("📡 Creating branch:", payload)

      const data = await branchService.createBranch(payload)

      console.log("✅ Branch created:", data)

      set((state) => ({
        branches: [...state.branches, data],
        branchloading: {
          ...state.branchloading,
          createBranch: false,
        },
      }))

      return data
    } catch (err: any) {
      console.error("❌ Create branch failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          createBranch: err.message,
        },
        branchloading: {
          ...state.branchloading,
          createBranch: false,
        },
      }))

      return null
    }
  },

  // ================= UPDATE BRANCH =================
  updateBranch: async (branchId, payload) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        updateBranch: true,
      },
      error: {
        ...state.error,
        updateBranch: null,
      },
    }))

    try {
      console.log("📡 Updating branch:", branchId)

      const data = await branchService.updateBranch(
        branchId,
        payload
      )

      console.log("✅ Branch updated:", data)

      set((state) => ({
        branches: state.branches.map((branch) =>
          branch.id === branchId
            ? { ...branch, ...data }
            : branch
        ),

        selectedBranch:
          state.selectedBranch?.id === branchId
            ? { ...state.selectedBranch, ...data }
            : state.selectedBranch,

        branchloading: {
          ...state.branchloading,
          updateBranch: false,
        },
      }))

      return data
    } catch (err: any) {
      console.error("❌ Update branch failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          updateBranch: err.message,
        },
        branchloading: {
          ...state.branchloading,
          updateBranch: false,
        },
      }))

      return null
    }
  },

  // ================= ASSIGN MANAGER =================
  assignManagerToBranch: async (
    branchId,
    payload
  ) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        assignManager: true,
      },
      error: {
        ...state.error,
        assignManager: null,
      },
    }))

    try {
      console.log(
        "📡 Assigning manager to branch:",
        branchId
      )

      const data =
        await branchService.assignManagerToBranch(
          branchId,
          payload
        )

      console.log("✅ Manager assigned:", data)

      set((state) => ({
        branchloading: {
          ...state.branchloading,
          assignManager: false,
        },
      }))

      return data
    } catch (err: any) {
      console.error("❌ Assign manager failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          assignManager: err.message,
        },
        branchloading: {
          ...state.branchloading,
          assignManager: false,
        },
      }))

      return null
    }
  },

  // ================= TOGGLE STATUS =================
  toggleBranchStatus: async (branchId, payload) => {
    try {
      set((state) => ({
        branchloading: {
          ...state.branchloading,
          toggleStatus: true,
        },
      }))

      const response =
        await branchService.toggleBranchStatus(
          branchId,
          payload
        )

      set((state) => ({
        // UPDATE SELECTED BRANCH
        selectedBranch: state.selectedBranch
          ? {
            ...state.selectedBranch,
            is_active: response.is_active,
          }
          : null,

        // UPDATE BRANCHES LIST
        branches: state.branches.map((branch) =>
          branch.id === branchId
            ? {
              ...branch,
              is_active: response.is_active,
            }
            : branch
        ),

        branchloading: {
          ...state.branchloading,
          toggleStatus: false,
        },
      }))

      return response
    } catch (error) {
      console.error(
        "❌ Toggle status failed:",
        error
      )

      set((state) => ({
        branchloading: {
          ...state.branchloading,
          toggleStatus: false,
        },
      }))

      return null
    }
  },

  // ================= FETCH BRANCH STAFF =================
  fetchBranchStaff: async (branchId) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        branchStaff: true,
      },
      error: {
        ...state.error,
        branchStaff: null,
      },
    }))

    try {
      console.log(
        "📡 Fetching branch staff:",
        branchId
      )

      const data =
        await branchService.getBranchStaff(branchId)

      console.log("✅ Branch staff fetched:", data)

      set((state) => ({
        branchStaff: data,
        branchloading: {
          ...state.branchloading,
          branchStaff: false,
        },
      }))
    } catch (err: any) {
      console.error("❌ Fetch branch staff failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          branchStaff: err.message,
        },
        branchloading: {
          ...state.branchloading,
          branchStaff: false,
        },
      }))
    }
  },

  // ================= FETCH INVENTORY SUMMARY =================
  fetchBranchInventorySummary: async (
    branchId
  ) => {
    set((state) => ({
      branchloading: {
        ...state.branchloading,
        inventorySummary: true,
      },
      error: {
        ...state.error,
        inventorySummary: null,
      },
    }))

    try {
      console.log(
        "📡 Fetching inventory summary:",
        branchId
      )

      const data =
        await branchService.getBranchInventorySummary(
          branchId
        )

      console.log(
        "✅ Inventory summary fetched:",
        data
      )

      set((state) => ({
        inventorySummary: data,
        branchloading: {
          ...state.branchloading,
          inventorySummary: false,
        },
      }))
    } catch (err: any) {
      console.error(
        "❌ Fetch inventory summary failed:",
        err
      )

      set((state) => ({
        error: {
          ...state.error,
          inventorySummary: err.message,
        },
        branchloading: {
          ...state.branchloading,
          inventorySummary: false,
        },
      }))
    }
  },
}))