import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

/**
 * Authentication State Store
 *
 * This is the main Zustand store for managing global authentication state.
 * It includes middleware for development tools and persistence.
 *
 * Example usage:
 * const { user, setUser, isLoading } = useAuthStore();
 */

interface User {
  id: string;
  email: string;
  // Add more user properties as needed
}

interface AuthState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        isLoading: false,

        // Actions
        setUser: (user) => set({ user }, false, "setUser"),
        setIsAuthenticated: (isAuthenticated) =>
          set({ isAuthenticated }, false, "setIsAuthenticated"),
        setIsLoading: (isLoading) => set({ isLoading }, false, "setIsLoading"),

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            "logout",
          ),
      }),
      {
        name: "auth-store", // name of the storage
      },
    ),
  ),
);

export default useAuthStore;
