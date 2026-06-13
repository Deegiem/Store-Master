import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

// ✅ Request interceptor with pre-emptive refresh
api.interceptors.request.use(async (config) => {
  const authState = useAuthStore.getState();
  let token = authState.token;
  const tokenExpiry = authState.tokenExpiry;
  const refreshToken = authState.refreshToken;
  const now = Date.now();

  // If token is expired or about to expire (within 2 minutes), refresh it
  const refreshThreshold = 2 * 60 * 1000; // 2 minutes before expiry
  const needsRefresh = tokenExpiry && (now >= tokenExpiry - refreshThreshold) && refreshToken;

  if (needsRefresh && !isRefreshing) {
    console.log('🔄 Token expiring soon, refreshing pre-emptively...');
    isRefreshing = true;

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
      const newAccessToken = res.data.access_token;
      const newRefreshToken = res.data.refresh_token;
      const expiresIn = res.data.expires_in;
      const refreshExpiresIn = res.data.refresh_expires_in;

      const updatedState = {
        token: newAccessToken,
        tokenExpiry: now + expiresIn * 1000,
        refreshToken: newRefreshToken,
        refreshTokenExpiry: now + refreshExpiresIn * 1000,
      };

      useAuthStore.setState(updatedState);
      token = newAccessToken;

      document.cookie = `token=${encodeURIComponent(newAccessToken)}; path=/; SameSite=Lax; max-age=${expiresIn};`;
      document.cookie = `refresh_token=${encodeURIComponent(newRefreshToken)}; path=/; SameSite=Lax; max-age=${refreshExpiresIn};`;

      console.log('✅ Pre-emptive token refresh successful');
      onRefreshed(newAccessToken);
    } catch (err) {
      console.log('❌ Pre-emptive refresh failed');
      // DON'T logout here - let the request fail and response interceptor handle it
      // useAuthStore.getState().logout(); // REMOVED - this was causing issues
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  // If token is expired, don't logout - just let it go without token
  // The API will return 401 and response interceptor will refresh
  if (tokenExpiry && now >= tokenExpiry) {
    console.log('⚠️ Token expired, will refresh on 401 response');
    token = null;
  }

  // Also check cookies as fallback
  if (!token && typeof document !== "undefined") {
    const cookieMatch = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
    if (cookieMatch) {
      token = decodeURIComponent(cookieMatch[1]);
      useAuthStore.setState({ token });
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Response interceptor for 401 handling
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // Don't retry if it's already a retry or no response
    if (originalRequest._retry || !error.response) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('🔐 401 detected! Current token:', useAuthStore.getState().token?.slice(0, 50))
      console.log('🔐 Refresh token exists:', !!useAuthStore.getState().refreshToken)

    }
    if (error.response?.status === 401) {
      console.log('🔐 401 detected! Attempting refresh...');
      originalRequest._retry = true;

      let refreshToken = useAuthStore.getState().refreshToken;

      // Try to get refresh token from cookies if not in state
      if (!refreshToken && typeof document !== "undefined") {
        const cookieMatch = document.cookie.match(/(?:^|;\s*)refresh_token=([^;]*)/);
        if (cookieMatch) {
          refreshToken = decodeURIComponent(cookieMatch[1]);
          useAuthStore.setState({ refreshToken });
        }
      }

      if (!refreshToken) {
        console.log('❌ No refresh token available, logging out');
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(`${API_BASE_URL}/auth/refresh`, { refresh_token: refreshToken });
        const newAccessToken = res.data.access_token;
        const newRefreshToken = res.data.refresh_token;
        const expiresIn = res.data.expires_in;
        const refreshExpiresIn = res.data.refresh_expires_in;
        const now = Date.now();

        const updatedState = {
          token: newAccessToken,
          tokenExpiry: now + expiresIn * 1000,
          refreshToken: newRefreshToken,
          refreshTokenExpiry: now + refreshExpiresIn * 1000,
        };

        useAuthStore.setState(updatedState);

        document.cookie = `token=${encodeURIComponent(newAccessToken)}; path=/; SameSite=Lax; max-age=${expiresIn};`;
        document.cookie = `refresh_token=${encodeURIComponent(newRefreshToken)}; path=/; SameSite=Lax; max-age=${refreshExpiresIn};`;

        console.log('✅ Token refresh successful');

        // Retry all queued requests
        onRefreshed(newAccessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log('❌ Token refresh failed');
        useAuthStore.getState().logout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);