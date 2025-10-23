// store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  RegisterPayload,
  RegisterResponse,
  OtpPayload,
  VerifyOtpResponse,
  LoginPayload,
  LoginResponse,
  ForgotPasswordPayload,
  CreatePasswordPayload,
  ResetPasswordPayload,
} from "@/types/auth";
import { authService } from "@/services/authService";

type AuthUser = VerifyOtpResponse["user"] | LoginResponse["user"] | null;

interface AuthState {
  user: AuthUser;
  token: string | null;
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  rememberMe: boolean;
  setRememberMe: (v: boolean) => void;
  register: (payload: RegisterPayload) => Promise<void>;
  verifyOtp: (payload: OtpPayload) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  createPassword: (payload: CreatePasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  logout: () => void;
}

function setCookie(name: string, value: string, days?: number) {
  if (typeof document === "undefined") return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; SameSite=Lax;`;
  if (typeof days === "number") cookie += ` max-age=${days * 24 * 60 * 60};`;
  document.cookie = cookie;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; path=/; Max-Age=0; SameSite=Lax;`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      successMessage: null,
      errorMessage: null,
      rememberMe: false,
      setRememberMe: (v: boolean) => set({ rememberMe: v }),

      register: async (payload) => {
        set({ isLoading: true, successMessage: null, errorMessage: null });
        try {
          const res: RegisterResponse | string = await authService.register(payload);
          const message = typeof res === "string" ? res : res?.message || "Registration successful!";
          set({ successMessage: message, isLoading: false });
        } catch (err: unknown) {
          set({ errorMessage: err instanceof Error ? err.message : "Unknown error", isLoading: false });
        }
      },

      verifyOtp: async (payload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const res = await authService.verifyOtp(payload);
          set({
            user: res.user || null,
            successMessage: res.message,
            isLoading: false,
          });
          if (res.token) {
            set({ token: res.token });
            setCookie("token", res.token, get().rememberMe ? 30 : undefined);
          }
        } catch (err: unknown) {
          set({ errorMessage: err instanceof Error ? err.message : "OTP verification failed", isLoading: false });
        }
      },

      createPassword: async (payload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const res = await authService.createPassword(payload);
          set({ successMessage: res.message, isLoading: false });
          if (res.token) localStorage.setItem("token", res.token);
        } catch (error: unknown) {
          set({
            errorMessage: error instanceof Error ? error.message : "Failed to create password.",
            isLoading: false,
          });
        }
      },

      login: async (payload, remember = false) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const res = await authService.login(payload);
          set({
            user: res.user,
            token: res.token ?? null,
            successMessage: res.message,
            isLoading: false,
            rememberMe: remember,
          });
          if (res.token) setCookie("token", res.token, remember ? 30 : undefined);
        } catch (err: unknown) {
          set({ errorMessage: err instanceof Error ? err.message : "Login failed", isLoading: false });
        }
      },

      forgotPassword: async (payload) => {
        set({ isLoading: true, successMessage: null, errorMessage: null });
        try {
          const res = await authService.forgotPassword(payload);
          set({ successMessage: res.message, isLoading: false });
        } catch (error: unknown) {
          set({
            errorMessage: error instanceof Error ? error.message : "Failed to send reset email.",
            isLoading: false,
          });
        }
      },

      resetPassword: async (payload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const res = await authService.resetPassword(payload);
          set({ successMessage: res.message, isLoading: false });
        } catch (error: unknown) {
          set({
            errorMessage: error instanceof Error ? error.message : "Password reset failed.",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, token: null, successMessage: null, errorMessage: null });
        try {
          clearCookie("token");
          if (typeof localStorage !== "undefined") localStorage.removeItem("inventory-auth");
        } catch {}
        if (typeof window !== "undefined") window.location.href = "/login";
      },
    }),
    {
      name: "inventory-auth",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
