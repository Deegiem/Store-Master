// types/user.ts
export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "manager"  | "store manager" | "sales staff";
  phone_number: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  email_status: "active" | "inactive" | "pending" | "verified" | string;
  created_at: string;
  updated_at: string;
}

export interface UsersResponse {
  count: number;
  users: User[];
}

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  state: string;
  country: string;
}
