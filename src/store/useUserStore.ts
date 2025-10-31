// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAllUsers, getCurrentUser, updateProfile } from "@/services/userService";
import { User, UpdateProfilePayload } from "@/types/user";

interface UserState {
  currentUser: User | null;
  users: User[];
  loading: boolean;
  error: string | null;

  fetchCurrentUser: () => Promise<void>;
  fetchAllUsers: () => Promise<void>;
  editProfile: (payload: UpdateProfilePayload) => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      loading: false,
      error: null,

      fetchCurrentUser: async () => {
        set({ loading: true, error: null });
        try {
          const user = await getCurrentUser();
          set({ currentUser: user, loading: false });
        } catch (error: unknown) {
          const err = error instanceof Error ? error.message : "Failed to fetch user";
          set({ error: err, loading: false });
        }
      },

      fetchAllUsers: async () => {
        set({ loading: true, error: null });
        try {
          const res = await getAllUsers();
          set({ users: res.users, loading: false });
        } catch (error: unknown) {
          const err = error instanceof Error ? error.message : "Failed to fetch users";
          set({ error: err, loading: false });
        }
      },

      editProfile: async (payload: UpdateProfilePayload) => {
        set({ loading: true, error: null });
        try {
          const updatedUser = await updateProfile(payload);
          set({ currentUser: updatedUser, loading: false });
        } catch (error: unknown) {
          const err = error instanceof Error ? error.message : "Failed to update profile";
          set({ error: err, loading: false });
        }
      },
    }),
    { name: "user-store" }
  )
);
