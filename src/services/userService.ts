import {api} from "@/lib/api";
import { User } from "@/types/user";

// Fetch authenticated user profile
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>("/users/me");
  return response.data.user; // extract the nested `user` field
};
