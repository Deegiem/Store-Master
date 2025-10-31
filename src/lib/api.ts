// lib/api.ts
import axios from "axios"
import { useAuthStore } from "@/store/useAuthStore";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})



api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Optional — auto log or handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — token may have expired")
    }
    return Promise.reject(error)
  }
)
