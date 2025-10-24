// types/auth.ts
export interface RegisterPayload {
  first_name: string
  last_name: string
  email: string
  role: string
  phone_number: string
  address: string
  state: string
  country: string
}

export interface RegisterResponse {
  message: string
  userId?: string
  success?: boolean
}

export interface OtpPayload {
  otp: string;
}

export interface VerifyOtpResponse {
  message: string;
  token?: string; // optional if the backend returns a session token
  user?: {
    id: string;
    name: string;
    role: "admin" | "manager" | "staff";
  };
  success?: boolean;
  errorMessage?: string; // optional for client-side error handling
}


export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "manager" | "staff";
  };
}

export interface CreatePasswordPayload {
  password: string
  confirmPassword: string
}

export interface CreatePasswordResponse {
  message: string
  token?: string
  user?: {
    id: string
    name: string
    email: string
    role: string
  }
}

export interface ResetPasswordPayload {
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string
  success?: boolean
}

// FORGOT PASSWORD
export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  success: boolean
}


