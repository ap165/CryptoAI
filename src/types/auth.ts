export interface LoginRequest {
  email: string;
  username: string;
  password: string;
  otp: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  otp: string;
}

export interface SendOtpRequest {
  username: string;
  email: string;
}

export interface ResetPasswordRequest {
  username: string;
  email: string;
  otp: string;
  newPass: string;
}

export interface AuthResponse {
  access_token?: string;
  token?: string;
  message?: string;
  [key: string]: unknown;
}

export interface User {
  name?: string;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface ApiError {
  detail?: string | ValidationError[];
  message?: string;
}
