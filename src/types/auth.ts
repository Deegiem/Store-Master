// types/auth.ts
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshTokenPayload {
  refresh_token: string;
}

export interface LogoutPayload {
  refresh_token: string;
}


export type LoginResponse = {
  access_token: string
  refresh_token: string
  token_type: "bearer"
  expires_in: number
  refresh_expires_in: number
  role: string
  name: string
  user_id: string
  branch_id: string
}

export interface RefreshTokenResponse {
  access_token: string
  refresh_token: string
  token_type: "bearer"
  expires_in: number
  refresh_expires_in: number
  role: string
  name: string
  user_id: string
  branch_id: string
}

export interface LogoutResponse {
  message: string
}

export interface LogoutAllResponse {
  message: string
  sessions_revoked: number
}

export type ValidationError = {
  detail: {
    loc: (string | number)[]
    msg: string
    type: string
  }[]
}

export interface CreatePasswordPayload {
  password: string
  confirmPassword: string
}

export interface CreatePasswordResponse {
  message: string
  access_token?: string
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

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
}

export interface ChangePasswordResponse {
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


