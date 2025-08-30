import { jwtDecode } from 'jwt-decode';
import type { User } from '../types/auth';

export interface DecodedToken {
  user?: User;
  email?: string;
  exp?: number;
  iat?: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

export const getUserIdFromToken = (token: string): number | null => {
  if (!token) return null;
  
  const decoded = decodeToken(token);
  return decoded?.user?.id || null;
};

export const getUserFromToken = (token: string): User | null => {
  if (!token) return null;
  
  const decoded = decodeToken(token);
  return decoded?.user || null;
};