import { api } from "@/lib/api"
import type {
  AdminDashboard,
  AuditLog,
  FailedLoginReport,
  SystemSettings,
  InventoryOverview,
  ProductInventoryAllBranches,
  BranchPerformanceOverTime,
  InactiveUser,
  UserAuditTrails,

} from "@/types/admin"
import { AuditLogQueryParams, AuditTrailsParams, FailedLoginQueryParams } from "@/types/auditLog"
import type { Role } from "@/types/role"

export const adminService = {
  getDashboard: async (): Promise<AdminDashboard> => {
    const res = await api.get<AdminDashboard>("/admin/admin/dashboard")
    return res.data
  },

  getAuditLogs: async (params?: AuditLogQueryParams): Promise<AuditLog[]> => {
    const res = await api.get<AuditLog[]>("/admin/admin/audit-logs", { params })
    return res.data
  },

  getUserAuditTrail: async (
    userId: string,
    params?: { page?: number; limit?: number }
  ): Promise<UserAuditTrails> => {
    const res = await api.get<UserAuditTrails>(`/admin/admin/audit-logs/user/${userId}`, { params })
    return res.data
  },

  getFailedLogins: async (params?: FailedLoginQueryParams): Promise<FailedLoginReport> => {
    const res = await api.get<FailedLoginReport>(
      "/admin/admin/audit-logs/security/failed-logins",
      { params }
    )
    return res.data
  },


  getSystemSettings: async (): Promise<SystemSettings> => {
    const res = await api.get<SystemSettings>("/admin/admin/settings")
    return res.data
  },

  // In src/services/adminService.ts
  updateSystemSettings: async (payload: SystemSettings): Promise<SystemSettings> => {
    console.log('Updating settings with payload:', payload) // Debug log
    const res = await api.put<SystemSettings>("/admin/admin/settings", payload)
    console.log('Update response:', res.data) // Debug log
    return res.data
  },

  getInventoryOverview: async (): Promise<InventoryOverview> => {
    const res = await api.get<InventoryOverview>("/admin/admin/inventory/overview")
    return res.data
  },

  getProductAcrossBranches: async (productId: string): Promise<ProductInventoryAllBranches> => {
    const res = await api.get<ProductInventoryAllBranches>(
      `/admin/admin/inventory/product/${productId}/all-branches`
    )
    return res.data
  },

  getBranchPerformance: async (): Promise<BranchPerformanceOverTime> => {
    const res = await api.get<BranchPerformanceOverTime>(
      "/admin/admin/branches/performance"
    )
    return res.data
  },

  getInactiveUsers: async (): Promise<InactiveUser[]> => {
    const res = await api.get<InactiveUser[]>("/admin/admin/users/inactive")
    return res.data
  },

  getRoles: async (): Promise<Role[]> => {
    const res = await api.get<Role[]>("/admin/admin/roles")
    return res.data
  },
}