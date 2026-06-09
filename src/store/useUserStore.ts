import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userService } from "@/services/userService"

import type {
  UsersResponse,
  UserProfile,
  CreateUserPayload,
  CreateUserResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  UpdateUserResponse,
  UpdateUserStatusParams,
  UpdateUserStatusResponse,
  SetupPasswordPayload,
} from "@/types/user"

interface UserState {
  // DATA
  users: UsersResponse
  currentUser: UserProfile | null

  // LOADING
  loading: {
    users: boolean
    currentUser: boolean
    createUser: boolean
    passwordFlow: boolean
    updateUser: boolean
    updateStatus: boolean
  }

  // ERROR
  error: {
    users: string | null
    currentUser: string | null
    createUser: string | null
    passwordFlow: string | null
    updateUser: string | null
    updateStatus: string | null
  }

  // ACTIONS
  fetchUsers: () => Promise<void>
  fetchCurrentUser: () => Promise<void>

  createUser: (payload: CreateUserPayload) => Promise<CreateUserResponse | null>

  setupPassword: (payload: SetupPasswordPayload) => Promise<string>
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<ForgotPasswordResponse>
  resetPassword: (payload: SetupPasswordPayload) => Promise<string>

  updateUser: (
    userId: string,
    payload: Partial<CreateUserPayload> & { is_active?: boolean }
  ) => Promise<UpdateUserResponse>

  updateUserStatus: (
    userId: string,
    params: UpdateUserStatusParams
  ) => Promise<UpdateUserStatusResponse>
}


export const useUserStore = create<UserState>((set, get) => ({

  // INITIAL STATE
  users: [],
  currentUser: null,

  loading: {
    users: false,
    currentUser: false,
    createUser: false,
    passwordFlow: false,
    updateUser: false,
    updateStatus: false,
  },

  error: {
    users: null,
    currentUser: null,
    createUser: null,
    passwordFlow: null,
    updateUser: null,
    updateStatus: null,
  },

  /* =========================
     FETCH ALL USERS
  ========================= */
  fetchUsers: async () => {
    set((state) => ({
      loading: { ...state.loading, users: true },
      error: { ...state.error, users: null },
    }))

    try {
      const data = await userService.getAllUsers()

      set((state) => ({
        users: data,
        loading: { ...state.loading, users: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, users: err.message },
        loading: { ...state.loading, users: false },
      }))
    }
  },

  /* =========================
     FETCH CURRENT USER
  ========================= */
  fetchCurrentUser: async () => {
    set((state) => ({
      loading: { ...state.loading, currentUser: true },
      error: { ...state.error, currentUser: null },
    }))

    try {
      const data = await userService.getCurrentUser()

      set((state) => ({
        currentUser: data,
        loading: { ...state.loading, currentUser: false },
      }))
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, currentUser: err.message },
        loading: { ...state.loading, currentUser: false },
      }))
    }
  },

  /* =========================
     CREATE USER
  ========================= */
  createUser: async (payload) => {
    set((state) => ({
      loading: { ...state.loading, createUser: true },
      error: { ...state.error, createUser: null },
    }))

    try {
      const data = await userService.createUser(payload)

      set((state) => ({
        loading: { ...state.loading, createUser: false },
      }))

      return data
    } catch (err: any) {
      console.error("❌ Create user failed:", err)

      set((state) => ({
        error: {
          ...state.error,
          createUser:
            err.response?.data?.detail ||
            err.message ||
            "Failed to create user",
        },

        loading: {
          ...state.loading,
          createUser: false,
        },
      }))

      return null
    }
  },

  /* =========================
     PASSWORD FLOW (TRANSIENT OPS)
  ========================= */
  setupPassword: async (payload) => {
    set((state) => ({
      loading: { ...state.loading, passwordFlow: true },
      error: { ...state.error, passwordFlow: null },
    }))

    try {
      const res = await userService.setupPassword(payload)

      set((state) => ({
        loading: { ...state.loading, passwordFlow: false },
      }))

      return res
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, passwordFlow: err.message },
        loading: { ...state.loading, passwordFlow: false },
      }))

      throw err
    }
  },


  forgotPassword: async (payload) => {
    set((state) => ({
      loading: { ...state.loading, passwordFlow: true },
      error: { ...state.error, passwordFlow: null },
    }))

    try {
      const res = await userService.forgotPassword(payload)

      set((state) => ({
        loading: { ...state.loading, passwordFlow: false },
      }))

      return res
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, passwordFlow: err.message },
        loading: { ...state.loading, passwordFlow: false },
      }))

      throw err
    }
  },

  resetPassword: async (payload) => {
    set((state) => ({
      loading: { ...state.loading, passwordFlow: true },
      error: { ...state.error, passwordFlow: null },
    }))

    try {
      const res = await userService.resetPassword(payload)

      set((state) => ({
        loading: { ...state.loading, passwordFlow: false },
      }))

      return res
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, passwordFlow: err.message },
        loading: { ...state.loading, passwordFlow: false },
      }))

      throw err
    }
  },

  /* =========================
     UPDATE USER
  ========================= */
  updateUser: async (userId, payload) => {
    set((state) => ({
      loading: { ...state.loading, updateUser: true },
      error: { ...state.error, updateUser: null },
    }))

    try {
      const data = await userService.updateUser(userId, payload)

      set((state) => ({
        loading: { ...state.loading, updateUser: false },
      }))

      return data
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, updateUser: err.message },
        loading: { ...state.loading, updateUser: false },
      }))

      throw err
    }
  },

  /* =========================
     UPDATE USER STATUS
  ========================= */
  updateUserStatus: async (userId, params) => {
    set((state) => ({
      loading: { ...state.loading, updateStatus: true },
      error: { ...state.error, updateStatus: null },
    }))

    try {
      const data = await userService.updateUserStatus(userId, params)

      set((state) => ({
        loading: { ...state.loading, updateStatus: false },
      }))

      return data
    } catch (err: any) {
      set((state) => ({
        error: { ...state.error, updateStatus: err.message },
        loading: { ...state.loading, updateStatus: false },
      }))

      throw err
    }
  },
}))
