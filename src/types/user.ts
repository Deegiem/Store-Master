// types/user.ts

import { Role } from "./role"
export type { Role } from "./role"

// 1. CREATE USER DOMAIN
export interface CreateUserPayload {
  email: string
  first_name: string
  last_name: string
  role: Role
  branch_id: string
}

export interface CreateUserResponse {
  message: string
  user_id: string
  email_sent: boolean
}


// 2. USER SETUP PASSWORD DOMAIN
export interface SetupPasswordPayload {
  token: string
  new_password: string
  // confirm_password: string
}

// 3. USERS DOMAIN
export interface User {
  user_id: string;
  email: string;
  email_status?: string;
  first_name: string;
  last_name: string;
  role: Role;
  is_active: boolean;
  branch_id: string;
  last_login: string;
  branch_name?: string;
  phone_number?: string;
  address?: string;
  state?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}
export type UsersResponse = User[];



// 4. USER Profile DOMAIN
export interface UserProfile {
  user_id: string;
  email: string;
  email_status?: string;
  first_name: string;
  last_name: string;
  role: Role;
  branch_name: string;
  is_active?: boolean;
  branch_id?: string;
  last_login?: string;
  phone_number?: string;
  address?: string;
  state?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
}


// 5. USER FORGOT PASSWORD DOMAIN
export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

// 6. UPDATE USER DOMAIN

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  state: string;
  country: string;
}

export interface UpdateUserResponse {
  user_id: string
  email: string
  first_name: string
  last_name: string
  role: string
  is_active: boolean
  branch_id: string
}


// 7. CHANGE USER STATUS DOMAIN
export interface UpdateUserStatusParams {
  active: boolean
}

export interface UpdateUserStatusResponse {
  message: string
  user_id: string
  is_active: boolean
}
