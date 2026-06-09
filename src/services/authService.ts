// src/services/authService.ts
import { api } from "@/lib/api";
import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenPayload,
  RefreshTokenResponse,
  LogoutPayload,
  LogoutResponse,
  LogoutAllResponse,
  CreatePasswordPayload,
  CreatePasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "@/types/auth";
import type { AxiosError } from "axios";

// ✅ Centralized Axios error type guard
function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

// ✅ Standardized error normalizer
function handleAxiosError<T>(error: unknown, fallbackMessage: string): never {
  if (isAxiosError<T>(error)) {
    const data = error.response?.data as { message?: string; detail?: string }
    throw new Error(data?.message || data?.detail || fallbackMessage)
  }
  throw new Error("Unexpected error. Please check your network connection.")
}

// ✅ Unified Auth Service
export const authService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const body = new URLSearchParams({
      grant_type: "password",
      username: payload.email,
      password: payload.password,
    });

    const res = await api.post<LoginResponse>(
      "/auth/login",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  },

  refreshToken: async (payload: RefreshTokenPayload): Promise<RefreshTokenResponse> => {
    try {
      const res = await api.post<RefreshTokenResponse>("/auth/refresh", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<RefreshTokenResponse>(error, "Failed to refresh token. Please log in again.");
    }
  },

  logout: async (payload: LogoutPayload): Promise<LogoutResponse> => {
    console.trace('🔴 Logout called from:');

    try {
      const res = await api.post<LogoutResponse>("/auth/logout", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<LogoutResponse>(error, "Logout failed.");
    }
  },

  logoutAll: async (): Promise<LogoutAllResponse> => {
    try {
      const res = await api.post<LogoutAllResponse>("/auth/logout-all");
      return res.data;
    } catch (error) {
      handleAxiosError<LogoutAllResponse>(error, "Failed to logout from all sessions.");
    }
  },

  createPassword: async (
    payload: CreatePasswordPayload,
    token?: string
  ): Promise<CreatePasswordResponse> => {
    try {
      const res = await api.post<CreatePasswordResponse>(
        "/auth/create-password",
        payload,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      return res.data;
    } catch (error) {
      handleAxiosError<CreatePasswordResponse>(
        error,
        "Failed to create password. Try again."
      );
    }
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> => {
    try {
      const res = await api.post<ForgotPasswordResponse>("/auth/forgot-password", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<ForgotPasswordResponse>(error, "Failed to send reset email.");
    }
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ResetPasswordResponse> => {
    try {
      const res = await api.post<ResetPasswordResponse>("/auth/reset-password", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<ResetPasswordResponse>(error, "Password reset failed. Try again.");
    }
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
    try {
      const res = await api.post<ChangePasswordResponse>("/auth/change-password", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<ChangePasswordResponse>(error, "Password change failed. Try again.");
    }
  },
};

export const readRoot = () => api.get("/");