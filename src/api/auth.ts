import apiClient from './client';
import type {
  SendOtpRequest,
  RegisterRequest,
  LoginRequest,
  ResetPasswordRequest,
  AuthResponse
} from '../types/auth';

export const authApi = {
  sendOtp: (data: SendOtpRequest) => 
    apiClient.post<AuthResponse>('/api/auth/send-otp', data),
    
  sendLoginOtp: (data: SendOtpRequest) => 
    apiClient.post<AuthResponse>('/api/auth/send-login-otp', data),
    
  sendResetOtp: (data: SendOtpRequest) => 
    apiClient.post<AuthResponse>('/api/auth/send-reset-otp', data),
    
  register: (data: RegisterRequest) => 
    apiClient.post<AuthResponse>('/api/auth/register', data),
    
  login: (data: LoginRequest) => 
    apiClient.post<AuthResponse>('/api/auth/login', data),
    
  resetPassword: (data: ResetPasswordRequest) => 
    apiClient.post<AuthResponse>('/api/auth/reset-password', data),
    
  verifyJwt: () => 
    apiClient.post<AuthResponse>('/api/auth/verify-jwt')
};
