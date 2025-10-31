/* eslint-disable @typescript-eslint/no-unused-vars */


import { create } from "zustand";
import { Admin, UserRole } from "@/types/admin";
import { adminService } from "@/services/adminService";


interface AdminStore {
  users: Admin[];
  searchResults: Admin[];
  loading: boolean;
  error: string | null;
  fetchAllUsers: () => Promise<void>;
  searchUsers: (query: string) => void;
  deleteUser: (user_id: string) => Promise<void>;
  updateUserRole: (user_id: string, role: UserRole) => Promise<void>;
}

// Helper to cast string to valid UserRole
const normalizeRole = (role: string): UserRole => {
  const validRoles: UserRole[] = ["admin", "store manager", "sales staff"];
  return validRoles.includes(role as UserRole) ? (role as UserRole) : "sales staff";
};

export const useAdminStore = create<AdminStore>((set, get) => ({
  users: [],
  searchResults: [],
  loading: false,
  error: null,

fetchAllUsers: async () => {
  set({ loading: true, error: null });
  try {
type UserResponse = { users: Admin[] } | Admin[];

const data = (await adminService.getAllUsers()) as UserResponse;

const usersArray = Array.isArray(data)
  ? data
  : Array.isArray(data.users)
  ? data.users
  : [];


    const users: Admin[] = usersArray.map((u) => ({
      ...u,
      role: normalizeRole(u.role),
    }));

    set({ users, searchResults: users, loading: false });
  } catch (error: any) {
    set({ error: error.message || "Failed to fetch users", loading: false });
  }
},


  searchUsers: (query: string) => {
    const { users } = get();
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      set({ searchResults: users });
      return;
    }

    const results = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(trimmed) ||
      user.email.toLowerCase().includes(trimmed) ||
      user.role.toLowerCase().includes(trimmed)
    );

    set({ searchResults: results });
  },

  deleteUser: async (user_id: string) => {
    try {
      await adminService.deleteUser(user_id);
      set(state => ({
        users: state.users.filter(u => u.user_id !== user_id),
        searchResults: state.searchResults.filter(u => u.user_id !== user_id),
      }));
    } catch (error: any) {
      set({ error: error.message || "Failed to delete user" });
    }
  },

  updateUserRole: async (user_id: string, role: UserRole) => {
    try {
      await adminService.updateUserRole(user_id, role);
      set(state => ({
        users: state.users.map(u =>
          u.user_id === user_id ? { ...u, role } : u
        ),
        searchResults: state.searchResults.map(u =>
          u.user_id === user_id ? { ...u, role } : u
        ),
      }));
    } catch (error: any) {
      set({ error: error.message || "Failed to update role" });
    }
  },
}));
