export interface UserAttributes {
    id: number;
    fullName: string;
    email: string;
    password: string;
}

export interface UserAttributesDto {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}