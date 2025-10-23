// services/authService.ts
import { api } from "@/lib/api";
import type {
  RegisterPayload,
  RegisterResponse,
  OtpPayload,
  VerifyOtpResponse,
  LoginPayload,
  LoginResponse,
  CreatePasswordPayload,
  CreatePasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
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
    const data = error.response?.data as { message?: string }
    throw new Error(data?.message || fallbackMessage)
  }
  throw new Error("Unexpected error. Please check your network connection.")
}

// ✅ Unified Auth Service
export const authService = {
  register: async (payload: RegisterPayload): Promise<RegisterResponse | string> => {
    try {
      const res = await api.post<RegisterResponse | string>("/auth/register", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<RegisterResponse>(error, "Registration failed. Please try again.");
    }
  },

  verifyOtp: async (payload: OtpPayload): Promise<VerifyOtpResponse> => {
    try {
      const res = await api.post<VerifyOtpResponse>("/auth/verify-otp", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<VerifyOtpResponse>(error, "OTP verification failed. Try again.");
    }
  },

  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
      const res = await api.post<LoginResponse>("/auth/login", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<LoginResponse>(error, "Login failed. Please try again.");
    }
  },

  createPassword: async (payload: CreatePasswordPayload): Promise<CreatePasswordResponse> => {
    try {
      const res = await api.post<CreatePasswordResponse>("/auth/create-password", payload);
      return res.data;
    } catch (error) {
      handleAxiosError<CreatePasswordResponse>(error, "Failed to create password. Try again.");
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
};
