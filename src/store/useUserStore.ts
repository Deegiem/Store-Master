// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllUsers } from "@/services/userService";
import { User } from "@/types/user";

interface UserState {
  user: string | null;
  role: string | null;
  users: User[];
  loading: boolean;
  error: string | null;
  clearUser: () => void;
  setUser: (user: string, role: string) => void;
  fetchAllUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      users: [],
      loading: false,
      error: null,
      user: null,
      role: null,

      setUser: (user, role) => set({ user, role }),
      clearUser: () => set({ user: null, role: null }),

      fetchAllUsers: async () => {
        try {
          set({ loading: true, error: null });
          const res = await getAllUsers();
          set({ users: res.data, loading: false });
        } catch (error: unknown) {
          const err =
            error instanceof Error ? error.message : "An error occurred";
          set({ loading: false, error: err });
        }
      },
    }),
    { name: "user-store" }
  )
);
