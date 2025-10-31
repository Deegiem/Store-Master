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

type AuthUser = VerifyOtpResponse["user"] | LoginResponse["profile"] | null;

interface AuthState {
  profile: AuthUser;
  token: string | null;
  isAuthenticated: boolean
  isLoading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  rememberMe: boolean;
  setRememberMe: (v: boolean) => void;
  register: (payload: RegisterPayload) => Promise<RegisterResponse | string | undefined>
  verifyOtp: (payload: OtpPayload) => Promise<VerifyOtpResponse | null>;
  login: (payload: LoginPayload, remember?: boolean) => Promise<AuthUser | null>;
  createPassword: (payload: CreatePasswordPayload) => Promise<void>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<void>;
  forgotPassword: (payload: ForgotPasswordPayload) => Promise<void>;
  logout: () => void;
  hydrate: () => void
  clearMessages: () => void
  autoClearMessages: () => void;

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
      profile: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      successMessage: null,
      errorMessage: null,
      rememberMe: false,
      setRememberMe: (v: boolean) => set({ rememberMe: v }),
      
      // Clears messages automatically after some seconds (optional)
// Clears messages automatically after some seconds
  autoClearMessages: () => {
    const timer = setTimeout(() => {
      set({ successMessage: null, errorMessage: null });
    }, 3000);

    // Return cleanup function in case you ever need to cancel it
    return () => clearTimeout(timer);
  },

  // Clears messages immediately (manual)
  clearMessages: () => {
    set({ successMessage: null, errorMessage: null });
  },

      register: async (payload): Promise<RegisterResponse | string | undefined> => {
        set({ isLoading: true, successMessage: null, errorMessage: null });
        try {
          const res: RegisterResponse | string = await authService.register(payload);
          const message = typeof res === "string" ? res : res?.message || "Registration successful!";
          set({ successMessage: message, isLoading: false });
          get().autoClearMessages();
          return res; // ✅ allows the page to route after success
        } catch (err: unknown) {
          set({
            errorMessage: err instanceof Error ? err.message : "Unknown error",
            isLoading: false,
          });
          get().autoClearMessages();
        }
      },


      verifyOtp: async (payload: OtpPayload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const res = await authService.verifyOtp(payload);

      if (res.access_token) {
        set({
          profile: res.user || null,
          token: res.access_token,
          successMessage: res.message,
          isLoading: false,
        });

        // ✅ Persist token to cookies
        setCookie("token", res.access_token, get().rememberMe ? 30 : undefined);
      } else {
        set({
          successMessage: res.message,
          isLoading: false,
        });
      }
          return res;

        } catch (err: unknown) {
          set({ errorMessage: err instanceof Error ? err.message : "OTP verification failed", isLoading: false });
          get().autoClearMessages();
          return null;
        }
      },

      createPassword: async (payload) => {
        set({ isLoading: true, errorMessage: null, successMessage: null });
        try {
          const access_token = get().token?? undefined; // get the token stored from verifyOtp
          if (!access_token) throw new Error("Missing access token");

          const res = await authService.createPassword(payload,access_token );
        
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
          if (!res?.profile || !res?.token) throw new Error("Invalid server response");
        
          set({
            profile: res.profile,
            token: res.token,
            isAuthenticated: true,
            successMessage: res.message || "Login successful!",
            isLoading: false,
            rememberMe: remember,
          });
        
          if (res.token) setCookie("token", res.token, remember ? 30 : undefined);
        
          return res.profile;
        } catch (err: unknown) {
          set({
            errorMessage: err instanceof Error ? err.message : "Login failed",
            isLoading: false,
          });
          get().autoClearMessages();
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

      logout: () => {
        set({ 
          profile: null, 
          token: null, 
          successMessage: null, 
          errorMessage: null,
          isAuthenticated: false,

         });
        try {
          clearCookie("token");
          if (typeof localStorage !== "undefined") localStorage.removeItem("inventory-auth");
        } catch {}
        if (typeof window !== "undefined") window.location.href = "/login";
      },

      hydrate: () => {
        const stored = localStorage.getItem("inventory-auth")
        if (stored) {
          const state = JSON.parse(stored).state
          set({
            profile: state.profile,
            token: state.token,
            isAuthenticated: !!state.token,
          })
        }
      },


    }),
    {
      name: "inventory-auth",
      partialize: (state) => ({
        token: state.token,
        profile: state.profile,
        isAuthenticated: state.isAuthenticated,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
