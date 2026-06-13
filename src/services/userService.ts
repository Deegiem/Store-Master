import { api } from "@/lib/api"
import {
  CreateUserPayload,
  CreateUserResponse,
  SetupPasswordPayload,
  UsersResponse,
  UserProfile,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  UpdateUserResponse,
  UpdateUserStatusParams,
  UpdateUserStatusResponse,
} from "@/types/user"

/* =========================
   USERS
========================= */
export const userService = {
  // GET /users/
  getAllUsers: async (): Promise<UsersResponse> => {
    const res = await api.get<UsersResponse>("/users/")
    return res.data
  },

  // GET /users/me
  getCurrentUser: async (): Promise<UserProfile> => {
    const res = await api.get<UserProfile>("/users/me")
    return res.data
  },


  /* =========================
     CREATE USER (ADMIN)
  ========================= */

  createUser: async (
    payload: CreateUserPayload
  ): Promise<CreateUserResponse> => {
    const res = await api.post<CreateUserResponse>(
      "/users/admin/create-user",
      payload
    )
    return res.data
  },


  /* =========================
     PASSWORD FLOW
  ========================= */

  // POST /users/setup-password
  setupPassword: async (payload: SetupPasswordPayload): Promise<string> => {
    const res = await api.post<string>("/users/setup-password", payload)
    return res.data
  },

  // POST /users/forgot-password
  forgotPassword: async (
    payload: ForgotPasswordPayload
  ): Promise<ForgotPasswordResponse> => {
    const res = await api.post<ForgotPasswordResponse>(
      "/users/forgot-password",
      payload
    )
    return res.data
  },

  // POST /users/reset-password
  resetPassword: async (payload: SetupPasswordPayload): Promise<string> => {
    const res = await api.post<string>("/users/reset-password", payload)
    return res.data
  },


  /* =========================
     UPDATE USER (ADMIN)
  ========================= */



  // PUT /users/{user_id}
  updateUser: async (
    userId: string,
    payload: Partial<CreateUserPayload> & { is_active?: boolean }
  ): Promise<UpdateUserResponse> => {
    const res = await api.put<UpdateUserResponse>(
      `/users/${userId}`,
      payload
    )
    return res.data
  },


  /* =========================
     CHANGE STATUS
  ========================= */

  // PATCH /users/{user_id}/status?active=true
  updateUserStatus: async (
    userId: string,
    params: UpdateUserStatusParams
  ): Promise<UpdateUserStatusResponse> => {
    const res = await api.patch<UpdateUserStatusResponse>(
      `/users/${userId}/status`,
      null,
      { params }
    )

    return res.data
  },
}
