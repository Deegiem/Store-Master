// src/store/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  ForgotPasswordPayload,
  CreatePasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
} from "@/types/auth";
import { authService } from "@/services/authService";

type AuthUser = {
  id: string
  name: string
  email?: string
  role: string
  branchId?: string
} | null;

interface AuthState {
  profile: AuthUser;
  token: string | null;
  tokenExpiry: number | null;
  refreshToken: string | null;
  refreshTokenExpiry: number | null;
  isAuthenticated: boolean
  isLoading: boolean;
  loading: {
    changePassword: boolean
    refreshing: boolean
  }
  successMessage: string | null;
  errorMessage: string | null;
  rememberMe: boolean;
  setRememberMe: (v: boolean) => void;
  login: (payload: LoginPayload, remember?: boolean) => Promise<AuthUser | null>;
  refreshTokenAction: () => Promise<RefreshTokenResponse | null>;
  createPassword: (payload: CreatePasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  changePassword: (payload: ChangePasswordPayload) => Promise<boolean>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  hydrate: () => void
  clearMessages: () => void
  autoClearMessages: () => void;
}

function setCookie(name: string, value: string, maxAgeSeconds?: number) {
  if (typeof document === "undefined") return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; SameSite=Lax;`;
  if (typeof maxAgeSeconds === "number") cookie += ` max-age=${maxAgeSeconds};`;
  document.cookie = cookie;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(name)}=; path=/; Max-Age=0; SameSite=Lax;`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${encodeURIComponent(name)}=`);
  if (parts.length === 2) return decodeURIComponent(parts[1].split(";")[0]);
  return null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      profile: null,
      token: null,
      tokenExpiry: null,
      refreshToken: null,
      refreshTokenExpiry: null,
      isAuthenticated: false,
      isLoading: false,
      loading: {
        changePassword: false,
        refreshing: false,
      },
      successMessage: null,
      errorMessage: null,
      rememberMe: false,
      setRememberMe: (v: boolean) => set({ rememberMe: v }),

      autoClearMessages: () => {
        const timer = setTimeout(() => {
          set({ successMessage: null, errorMessage: null });
        }, 3000);
        return () => clearTimeout(timer);
      },

      clearMessages: () => {
        set({ successMessage: null, errorMessage: null });
      },

      createPassword: async (payload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const access_token = get().token ?? undefined;
          if (!access_token) throw new Error("Missing access token");

          const res = await authService.createPassword(payload, access_token);

          set({ successMessage: res.message, isLoading: false });
          if (res.access_token) localStorage.setItem("token", res.access_token);
        } catch (error: unknown) {
          set({
            errorMessage: error instanceof Error ? error.message : "Failed to create password.",
            isLoading: false,
          });
          get().autoClearMessages();
        }
      },

      login: async (payload: LoginPayload, remember = false): Promise<AuthUser | null> => {
        set({ isLoading: true, errorMessage: null, successMessage: null });

        try {
          const res = await authService.login(payload);

          if (!res?.access_token) {
            throw new Error("Invalid server response");
          }

          const user: AuthUser = {
            id: res.user_id,
            name: res.name,
            role: res.role,
            branchId: res.branch_id,
          };

          const now = Date.now();
          const tokenExpiry = now + res.expires_in * 1000;
          const refreshTokenExpiry = now + res.refresh_expires_in * 1000;

          set({
            profile: user,
            token: res.access_token,
            tokenExpiry,
            refreshToken: res.refresh_token,
            refreshTokenExpiry,
            isAuthenticated: true,
            successMessage: "Login successful!",
            isLoading: false,
            rememberMe: remember,
          });

          setCookie("token", res.access_token, res.expires_in);
          setCookie("refresh_token", res.refresh_token, res.refresh_expires_in);
          return user;

        } catch (err: unknown) {
          set({
            errorMessage: err instanceof Error ? err.message : "Login failed",
            isLoading: false,
          });
          get().autoClearMessages();
          return null;
        }
      },

      refreshTokenAction: async (): Promise<RefreshTokenResponse | null> => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          console.log("No refresh token available");
          return null;
        }

        set((state) => ({
          loading: { ...state.loading, refreshing: true },
        }));

        try {
          const res = await authService.refreshToken({ refresh_token: refreshToken });

          const now = Date.now();
          const tokenExpiry = now + res.expires_in * 1000;
          const refreshTokenExpiry = now + res.refresh_expires_in * 1000;

          set({
            token: res.access_token,
            tokenExpiry,
            refreshToken: res.refresh_token,
            refreshTokenExpiry,
            profile: {
              id: res.user_id,
              name: res.name,
              role: res.role,
              branchId: res.branch_id,
            },
            isAuthenticated: true,
          });

          setCookie("token", res.access_token, res.expires_in);
          setCookie("refresh_token", res.refresh_token, res.refresh_expires_in);

          set((state) => ({
            loading: { ...state.loading, refreshing: false },
          }));

          return res;
        } catch (error: unknown) {
          console.error("Token refresh failed:", error);
          // Clear auth state on refresh failure
          get().logout();
          set((state) => ({
            loading: { ...state.loading, refreshing: false },
          }));
          return null;
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
          get().autoClearMessages();
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
          get().autoClearMessages();
        }
      },

      changePassword: async (payload) => {
        set((state) => ({
          loading: { ...state.loading, changePassword: true },
          errorMessage: null,
          successMessage: null,
        }));

        try {
          const res = await authService.changePassword(payload);
          set((state) => ({
            loading: { ...state.loading, changePassword: false },
            successMessage: res.message,
          }));
          return true;
        } catch (error: unknown) {
          set((state) => ({
            loading: { ...state.loading, changePassword: false },
            errorMessage: error instanceof Error ? error.message : "Password change failed.",
          }));
          get().autoClearMessages();
          return false;
        }
      },

      logout: async () => {
        const { refreshToken } = get();
        
        // Try to revoke the refresh token on the server
        if (refreshToken) {
          try {
            await authService.logout({ refresh_token: refreshToken });
          } catch (error) {
            console.error("Logout API call failed:", error);
            // Continue with local logout even if API fails
          }
        }

        // Clear local state
        set({
          profile: null,
          token: null,
          tokenExpiry: null,
          refreshToken: null,
          refreshTokenExpiry: null,
          successMessage: null,
          errorMessage: null,
          isAuthenticated: false,
        });

        clearCookie("token");
        clearCookie("refresh_token");
        
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("inventory-auth");
        }
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      logoutAll: async () => {
        try {
          await authService.logoutAll();
        } catch (error) {
          console.error("Logout all sessions API call failed:", error);
        }
        
        // Clear local state
        set({
          profile: null,
          token: null,
          tokenExpiry: null,
          refreshToken: null,
          refreshTokenExpiry: null,
          successMessage: null,
          errorMessage: null,
          isAuthenticated: false,
        });

        clearCookie("token");
        clearCookie("refresh_token");
        
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("inventory-auth");
        }
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      },

      hydrate: () => {
        const stored = localStorage.getItem("inventory-auth");
        if (stored) {
          const parsed = JSON.parse(stored);
          const state = parsed.state;
          set({
            profile: state.profile,
            token: state.token,
            tokenExpiry: state.tokenExpiry,
            refreshToken: state.refreshToken,
            refreshTokenExpiry: state.refreshTokenExpiry,
            isAuthenticated: !!state.token && !!state.refreshToken,
          });
          return;
        }

        const cookieToken = getCookie("token");
        const cookieRefreshToken = getCookie("refresh_token");
        if (cookieToken || cookieRefreshToken) {
          set({
            token: cookieToken,
            refreshToken: cookieRefreshToken,
            isAuthenticated: !!cookieToken && !!cookieRefreshToken,
          });
        }
      },
    }),
    {
      name: "inventory-auth",
      partialize: (state) => ({
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        refreshToken: state.refreshToken,
        refreshTokenExpiry: state.refreshTokenExpiry,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
);