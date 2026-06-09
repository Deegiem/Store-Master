import { api } from "@/lib/api"
import type {
  ProcurementListResponse,
  ProcurementDetail,
  CreatePOPayload,
  CreatePOResponse,
  PendingApprovalResponse,
  ActionResponse,
  ReceivePOPayload,
} from "@/types/procurement"

export const procurementService = {
  getAll: async (params?: {
    status?: string
    branch_id?: string
    supplier_id?: string
    page?: number
    limit?: number
  }): Promise<ProcurementListResponse> => {
    const res = await api.get("/procurement/", { params })
    return res.data
  },

  getById: async (poId: string): Promise<ProcurementDetail> => {
    const res = await api.get(`/procurement/${poId}`)
    return res.data
  },

  getPendingApprovals: async (): Promise<PendingApprovalResponse> => {
    const res = await api.get("/procurement/pending-approval")
    return res.data
  },

  create: async (
    payload: CreatePOPayload
  ): Promise<CreatePOResponse> => {
    const res = await api.post("/procurement/create", payload)
    return res.data
  },

  approve: async (poId: string): Promise<ActionResponse> => {
    const res = await api.put(`/procurement/${poId}/approve`)
    return res.data
  },

  reject: async (poId: string): Promise<ActionResponse> => {
    const res = await api.put(`/procurement/${poId}/reject`)
    return res.data
  },

  receive: async (
    poId: string,
    payload: ReceivePOPayload
  ): Promise<any> => {
    const res = await api.post(
      `/procurement/${poId}/receive`,
      payload
    )
    return res.data
  },
}