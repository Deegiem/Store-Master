
export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "admin" | "employee" | "manager" | string; // flexible for future roles
  phone_number: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  email_status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;
}