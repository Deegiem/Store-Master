import { api } from "@/lib/api"; // your axios/fetch wrapper
import type { Admin } from "@/types/admin";
import type { User } from "@/types/user";
export const adminService = {
  getUser: async (user_id: string): Promise<Admin> => {
    const res = await api.get<Admin>(`/admin/users/${user_id}`);
    return res.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const res = await api.get(`/users`);
    return res.data;
  },

  deleteUser: async (user_id: string): Promise<string> => {
    const res = await api.delete<string>(`/admin/users/${user_id}`);
    return res.data;
  },

  updateUserRole: async (user_id: string, role: string): Promise<string> => {
    const res = await api.put<string>(`/admin/update-role`, { user_id, role });
    return res.data;
  },
};
