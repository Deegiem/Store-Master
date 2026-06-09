import { create } from "zustand"
import { adminService } from "@/services/adminService"

import type {
  AdminDashboard,
  AuditLog,
  UserAuditTrails,
  FailedLoginReport,
  SystemSettings,
} from "@/types/admin"

import type { Role } from "@/types/role"

import type {
  AuditLogQueryParams,
  FailedLoginQueryParams,
  AuditTrailsParams,
} from "@/types/auditLog"

interface AdminState {
  dashboard: AdminDashboard | null
  auditLogs: AuditLog[]
  userAuditTrails: UserAuditTrails | null
  failedLogins: FailedLoginReport | null
  systemSettings: SystemSettings | null
  roles: Role[]

  adminloading: {
    dashboard: boolean
    auditLogs: boolean
    userAuditTrails: boolean
    failedLogins: boolean
    systemSettings: boolean
    roles: boolean
  }

  error: {
    dashboard: string | null
    auditLogs: string | null
    userAuditTrails: string | null
    failedLogins: string | null
    systemSettings: string | null
    roles: string | null
  }

  fetchDashboard: () => Promise<void>
  fetchAuditLogs: (params?: AuditLogQueryParams) => Promise<void>
  fetchUserAuditTrail: (
    userId: string,
    params?: { page?: number; limit?: number }
  ) => Promise<void>
  fetchFailedLogins: (params?: FailedLoginQueryParams) => Promise<void>
  fetchRoles: () => Promise<void>
  fetchSystemSettings: () => Promise<void>
 updateSystemSettings: (payload: SystemSettings) => Promise<SystemSettings>}

export const useAdminStore = create<AdminState>((set) => ({
  dashboard: null,
  auditLogs: [],
  userAuditTrails: null,
  failedLogins: null,
  systemSettings: null,
  roles: [],

  adminloading: {
    dashboard: false,
    auditLogs: false,
    userAuditTrails: false,
    failedLogins: false,
    systemSettings: false,
    roles: false,
  },

  error: {
    dashboard: null,
    auditLogs: null,
    userAuditTrails: null,
    failedLogins: null,
    systemSettings: null,
    roles: null,
  },

  // ================= DASHBOARD =================
  fetchDashboard: async () => {
    set((state) => ({
      adminloading: { ...state.adminloading, dashboard: true },
    }))

    try {
      const data = await adminService.getDashboard()

      set((state) => ({
        dashboard: data,
        adminloading: { ...state.adminloading, dashboard: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, dashboard: err.message },
        adminloading: { ...state.adminloading, dashboard: false },
      }))
    }
  },

  // ================= AUDIT LOGS =================
  fetchAuditLogs: async (params) => {
    set((state) => ({
      adminloading: { ...state.adminloading, auditLogs: true },
    }))

    try {
      const data = await adminService.getAuditLogs(params)

      set((state) => ({
        auditLogs: data,
        adminloading: { ...state.adminloading, auditLogs: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, auditLogs: err.message },
        adminloading: { ...state.adminloading, auditLogs: false },
      }))
    }
  },

  // ================= USER AUDIT TRAIL =================
  fetchUserAuditTrail: async (userId, params) => {
    set((state) => ({
      adminloading: { ...state.adminloading, userAuditTrails: true },
      error: { ...state.error, userAuditTrails: null },
    }))

    try {
      console.log("REQUEST PAYLOAD:", { userId, params })
      const data = await adminService.getUserAuditTrail(userId, params)

      console.log("AUDIT API RESPONSE:", data)

      set((state) => ({
        userAuditTrails: data,
        adminloading: { ...state.adminloading, userAuditTrails: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, userAuditTrails: err.message },
        adminloading: { ...state.adminloading, userAuditTrails: false },
      }))
    }
  },


  // ================= FAILED LOGINS =================
  fetchFailedLogins: async (params) => {
    set((state) => ({
      adminloading: { ...state.adminloading, failedLogins: true },
    }))

    try {
      const data = await adminService.getFailedLogins(params)

      set((state) => ({
        failedLogins: data,
        adminloading: { ...state.adminloading, failedLogins: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, failedLogins: err.message },
        adminloading: { ...state.adminloading, failedLogins: false },
      }))
    }
  },

  // ================= SYSTEM SETTINGS =================
  fetchSystemSettings: async () => {
    set((state) => ({
      adminloading: { ...state.adminloading, systemSettings: true },
    }))

    try {
      const data = await adminService.getSystemSettings()

      set((state) => ({
        systemSettings: data,
        adminloading: { ...state.adminloading, systemSettings: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, systemSettings: err.message },
        adminloading: { ...state.adminloading, systemSettings: false },
      }))
    }
  },

  // src/store/useAdminStore.ts - Fixed updateSystemSettings

  updateSystemSettings: async (payload: SystemSettings) => {
    set((state) => ({
      adminloading: { ...state.adminloading, systemSettings: true },
      error: { ...state.error, systemSettings: null },
    }))

    try {
      // Send update to API
      await adminService.updateSystemSettings(payload)

      // IMPORTANT: Fetch fresh settings because the update endpoint doesn't return full settings
      const freshSettings = await adminService.getSystemSettings()

      set((state) => ({
        systemSettings: freshSettings,
        adminloading: { ...state.adminloading, systemSettings: false },
      }))

      return freshSettings
    } catch (err: any) {
      console.error('Update settings error:', err.response?.data || err.message)
      set((state) => ({
        error: { ...state.error, systemSettings: err.response?.data?.message || err.message || "Failed to update system settings" },
        adminloading: { ...state.adminloading, systemSettings: false },
      }))
      throw err
    }
  },

  // ================= ROLES =================
  fetchRoles: async () => {
    set((state) => ({
      adminloading: { ...state.adminloading, roles: true },
    }))

    try {
      const data = await adminService.getRoles()

      set((state) => ({
        roles: data,
        adminloading: { ...state.adminloading, roles: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, roles: err.message },
        adminloading: { ...state.adminloading, roles: false },
      }))
    }
  },
}))