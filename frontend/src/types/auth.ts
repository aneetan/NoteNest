export interface RegisterProps {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    checkbox: boolean;
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