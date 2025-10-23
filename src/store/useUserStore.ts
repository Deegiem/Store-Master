// store/useUserStore.ts
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserState {
  user: string | null
  role: string | null
  setUser: (user: string, role: string) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      setUser: (user, role) => set({ user, role }),
      clearUser: () => set({ user: null, role: null }),
    }),
    { name: "user-store" }
  )
)
