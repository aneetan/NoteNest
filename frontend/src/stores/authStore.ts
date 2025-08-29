import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logoutUser } from '../api/user.api';

interface AuthStore {
  userId: number | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userId: number) => Promise<void>;
  logout: (userId: number) => Promise<void>;
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
      logout: async(userId: number): Promise<void> => {
        await logoutUser(userId);
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