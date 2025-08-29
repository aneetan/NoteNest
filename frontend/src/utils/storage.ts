import type { User } from "../types/auth";

// src/utils/storage.ts
export const storage = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  },
  
  setToken: (token: string): void => {
    try {
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error setting token in storage:', error);
    }
  },
  
  clearToken: (): void => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error clearing token from storage:', error);
    }
  },
  
  getUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  },
  
  setUser: (user: User): void => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user in storage:', error);
    }
  },
  
  clearUser: (): void => {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing user from storage:', error);
    }
  },
  
  clearAll: (): void => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing auth data from storage:', error);
    }
  }
};