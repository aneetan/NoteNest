import type { User } from "../types/auth";
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  userId: number | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: number) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userId: null,
      token: null,
      isAuthenticated: !!localStorage.getItem("token"),

      login: async (newToken: string, userId: number): Promise<void> => {
        localStorage.setItem("token", newToken);
        set({ 
          token: newToken, 
          userId: userId, 
          isAuthenticated: true 
        });
      },
      logout: (): Promise<void> => {
        localStorage.removeItem("token");
        set({ 
          token: null, 
          userId: null, 
          isAuthenticated: false
        });
        return Promise.resolve();
      },
    }),
    {
      name: 'auth-storage', 
      partialize: (state) => ({ 
        token: state.token,
        userId: state.userId,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);