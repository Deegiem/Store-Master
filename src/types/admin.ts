export type UserRole = "admin" |"store manager" | "sales staff";
export type EmailStatus = "active" | "inactive" | "pending" | "verified" | string;

export interface Admin {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone_number: string | null;
  address: string | null;
  state: string | null;
  country: string | null;
  email_status: EmailStatus;
  created_at: string;
  updated_at: string;
}
