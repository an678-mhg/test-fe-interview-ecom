import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials } from "../types";
import { authAPI } from "../services/api";
import { useCartStore } from "./cartStore";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);
          set({
            user: {
              id: response.id,
              username: response.username,
              email: response.email,
              firstName: response.firstName,
              lastName: response.lastName,
              gender: response.gender,
              image: response.image,
            },
            token: response.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        // Clear local cart state only (don't delete from API)
        // Cart deletion only happens on order completion
        useCartStore.getState().clearCart();

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
