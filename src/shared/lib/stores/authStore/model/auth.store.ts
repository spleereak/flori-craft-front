import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthStoreProps } from "../types";

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,
      setAuth: (isAuth, user) =>
        set({ isAuthenticated: isAuth, user: user || null }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
