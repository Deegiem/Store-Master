// src/store/useProcurementStore.ts
import { create } from "zustand"
import { procurementService } from "@/services/procurementService"
import type {
  ProcurementListItem,
  ProcurementDetail,
  PendingApprovalItem,
  ProcurementFilters,
  CreatePOPayload,
  ReceivePOPayload,
  CreatePOResponse,
  ActionResponse,
  ReceivePOItem,
} from "@/types/procurement"

interface ProcurementState {
  /* =========================
      STATE
  ========================= */
  list: ProcurementListItem[]
  selectedPO: ProcurementDetail | null
  pendingApprovals: PendingApprovalItem[]

  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }

  filters: ProcurementFilters

  loading: {
    list: boolean
    detail: boolean
    approvals: boolean
    create: boolean
    approve: boolean
    reject: boolean
    receive: boolean
    action: boolean
  }

  error: string | null
  successMessage: string | null

  /* =========================
      FETCHERS
  ========================= */
  fetchAll: (params?: ProcurementFilters) => Promise<void>
  fetchById: (id: string) => Promise<void>
  fetchPending: () => Promise<void>

  /* =========================
      ACTIONS
  ========================= */
  createPurchaseOrder: (payload: CreatePOPayload) => Promise<CreatePOResponse | null>
  approvePO: (id: string) => Promise<ActionResponse | null>
  rejectPO: (id: string) => Promise<ActionResponse | null>
  receiveGoods: (id: string, payload: ReceivePOPayload) => Promise<any>

  /* =========================
      HELPERS
  ========================= */
  setFilters: (filters: Partial<ProcurementFilters>) => void
  resetFilters: () => void  // ← Add this
  clearSelectedPO: () => void
  resetProcurementState: () => void
  clearMessages: () => void
}

const initialLoading = {
  list: false,
  detail: false,
  approvals: false,
  create: false,
  approve: false,
  reject: false,
  receive: false,
  action: false,
}

const initialFilters: ProcurementFilters = {
  status: "",
  branch_id: "",
  supplier_id: "",
  page: 1,
  limit: 50,
}

export const useProcurementStore = create<ProcurementState>((set, get) => ({
  /* =========================
      INITIAL STATE
  ========================= */
  list: [],
  selectedPO: null,
  pendingApprovals: [],

  pagination: {
    total: 0,
    page: 1,
    limit: 50,
    pages: 1,
  },

  filters: initialFilters,

  loading: initialLoading,
  error: null,
  successMessage: null,

  /* =========================
      FETCH ALL PROCUREMENTS
  ========================= */
  fetchAll: async (params) => {
    set((s) => ({
      loading: { ...s.loading, list: true, action: true },
      error: null
    }))

    try {
      // Merge existing filters with new params
      const mergedFilters = { ...get().filters, ...params }

      // Clean up filters - remove empty values
      const cleanedFilters: any = {}
      Object.keys(mergedFilters).forEach(key => {
        const value = mergedFilters[key as keyof ProcurementFilters]
        if (value !== "" && value !== null && value !== undefined && value !== "all") {
          cleanedFilters[key] = value
        }
      })

      console.log("📡 Fetching procurements with filters:", cleanedFilters)
      const res = await procurementService.getAll(cleanedFilters)

      set({
        list: res.items || [],
        pagination: {
          total: res.total || 0,
          page: res.page || 1,
          limit: res.limit || 50,
          pages: res.pages || 1,
        },
        // Update filters state with the merged filters
        filters: mergedFilters,
      })
    } catch (error: any) {
      console.error("Fetch all error:", error)
      set({
        error: error?.response?.data?.detail || error?.message || "Failed to fetch procurements"
      })
    } finally {
      set((s) => ({
        loading: { ...s.loading, list: false, action: false }
      }))
    }
  },

  /* =========================
      FETCH SINGLE PO
  ========================= */
  fetchById: async (id) => {
    set((s) => ({
      loading: { ...s.loading, detail: true, action: true },
      error: null
    }))

    try {
      const res = await procurementService.getById(id)
      set({ selectedPO: res })
    } catch (error: any) {
      console.error("Fetch by ID error:", error)
      set({
        error: error?.response?.data?.detail || "Failed to fetch purchase order"
      })
    } finally {
      set((s) => ({
        loading: { ...s.loading, detail: false, action: false }
      }))
    }
  },

  /* =========================
      FETCH PENDING APPROVALS
  ========================= */
  fetchPending: async () => {
    set((s) => ({
      loading: { ...s.loading, approvals: true, action: true },
      error: null
    }))

    try {
      const res = await procurementService.getPendingApprovals()
      set({ pendingApprovals: res.orders || [] })
    } catch (error: any) {
      // Silent fail for 403 - don't log error
      if (error?.response?.status !== 403) {
        console.error("Fetch pending error:", error)
        set({
          error: error?.response?.data?.detail || "Failed to fetch approvals"
        })
      }
      // Set empty array on error
      set({ pendingApprovals: [] })
    } finally {
      set((s) => ({
        loading: { ...s.loading, approvals: false, action: false }
      }))
    }
  },

  /* =========================
      CREATE PURCHASE ORDER
  ========================= */
  createPurchaseOrder: async (payload) => {
    set((s) => ({
      loading: { ...s.loading, create: true, action: true },
      error: null,
      successMessage: null
    }))

    try {
      const res = await procurementService.create(payload)

      // Refresh the list after successful creation
      await get().fetchAll()

      set({ successMessage: "Purchase order created successfully" })
      return res
    } catch (error: any) {
      console.error("Create PO error:", error)
      const errorMsg = error?.response?.data?.detail || "Failed to create purchase order"
      set({ error: errorMsg })
      return null
    } finally {
      set((s) => ({
        loading: { ...s.loading, create: false, action: false }
      }))
    }
  },

  /* =========================
      APPROVE PO
  ========================= */
  approvePO: async (id) => {
    set((s) => ({
      loading: { ...s.loading, approve: true, action: true },
      error: null,
      successMessage: null
    }))

    try {
      const res = await procurementService.approve(id)

      // Refresh pending approvals and the list
      await Promise.all([
        get().fetchPending(),
        get().fetchAll()
      ])

      // Refresh detail if this is the currently selected PO
      if (get().selectedPO?.po_id === id) {
        await get().fetchById(id)
      }

      set({ successMessage: "Purchase order approved successfully" })
      return res
    } catch (error: any) {
      console.error("Approve PO error:", error)
      const errorMsg = error?.response?.data?.detail || "Failed to approve PO"
      set({ error: errorMsg })
      return null
    } finally {
      set((s) => ({
        loading: { ...s.loading, approve: false, action: false }
      }))
    }
  },

  /* =========================
      REJECT PO
  ========================= */
  rejectPO: async (id) => {
    set((s) => ({
      loading: { ...s.loading, reject: true, action: true },
      error: null,
      successMessage: null
    }))

    try {
      const res = await procurementService.reject(id)

      // Refresh pending approvals and the list
      await Promise.all([
        get().fetchPending(),
        get().fetchAll()
      ])

      // Refresh detail if this is the currently selected PO
      if (get().selectedPO?.po_id === id) {
        await get().fetchById(id)
      }

      set({ successMessage: "Purchase order rejected successfully" })
      return res
    } catch (error: any) {
      console.error("Reject PO error:", error)
      const errorMsg = error?.response?.data?.detail || "Failed to reject PO"
      set({ error: errorMsg })
      return null
    } finally {
      set((s) => ({
        loading: { ...s.loading, reject: false, action: false }
      }))
    }
  },

  /* =========================
      RECEIVE GOODS
  ========================= */
  receiveGoods: async (poId, payload) => {
    set((s) => ({
      loading: { ...s.loading, receive: true, action: true },
      error: null,
      successMessage: null
    }))

    try {
      const res = await procurementService.receive(poId, payload)
      console.log("✅ Receive goods response:", res)

      // Refresh the detail view and list
      await Promise.all([
        get().fetchById(poId),
        get().fetchAll()
      ])

      set({ successMessage: "Goods received successfully" })
      return res
    } catch (error: any) {
      console.error("Receive goods error:", error)
      const errorMsg = error?.response?.data?.detail || "Failed to receive goods"
      set({ error: errorMsg })
      return null
    } finally {
      set((s) => ({
        loading: { ...s.loading, receive: false, action: false }
      }))
    }
  },

  /* =========================
      SET FILTERS
  ========================= */
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }))
    // Auto-refetch when filters change
    get().fetchAll()
  },

  /* =========================
      RESET FILTERS (ADD THIS)
  ========================= */
  resetFilters: () => {
    set({ filters: initialFilters })
    // Fetch with reset filters
    get().fetchAll()
  },

  /* =========================
      CLEAR SELECTED PO
  ========================= */
  clearSelectedPO: () => {
    set({ selectedPO: null })
  },

  /* =========================
      CLEAR MESSAGES
  ========================= */
  clearMessages: () => {
    set({ error: null, successMessage: null })
  },

  /* =========================
      RESET STORE
  ========================= */
  resetProcurementState: () => {
    set({
      list: [],
      selectedPO: null,
      pendingApprovals: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 50,
        pages: 1,
      },
      filters: initialFilters,
      loading: initialLoading,
      error: null,
      successMessage: null,
    })
  },
}))