// services/userService.ts
import { api } from "@/lib/api";
import { User, UsersResponse, UpdateProfilePayload } from "@/types/user";

// Fetch current logged-in user
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<{ user: User }>("/users/me");
  return response.data.user;
};

// Fetch all users (admin only)
export const getAllUsers = async (): Promise<UsersResponse> => {
  const response = await api.get("/users");
  return response.data;
};

// Update logged-in user profile
export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
  const response = await api.put<{ user: User }>("/users/update-profile", payload);
  return response.data.user;
};
