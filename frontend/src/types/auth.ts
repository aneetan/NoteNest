export interface RegisterProps {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    checkbox: boolean;
}

export interface User {
    userid: number;
    fullName: string;
    email: string;
    password: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    message: string;
    id: number;
}

export interface OTPVerifyData{
    token: string;
    email: string;
    otp: string;
}

export interface ResetPassword {
    newPassword: string;
    confirmPassword: string;
} 

export interface ResetPasswordRequest {
  newPassword: string;
  token: string;
}

