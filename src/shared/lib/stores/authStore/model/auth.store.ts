import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthStoreProps } from "../types";

const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof window === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0`;
};

export const useAuthStore = create<AuthStoreProps>()(
  persist(
    set => ({
      isAuthenticated: false,
      user: null,

      setAuth: (isAuth, user) => {
        if (isAuth && user) {
          setCookie("isAuthenticated", "true");

          if (user.token) {
            setCookie("auth_token", user.token);
          }

          setCookie("user_phone", user.phone);
        } else {
          deleteCookie("isAuthenticated");
          deleteCookie("auth_token");
          deleteCookie("user_phone");
        }

        set({ isAuthenticated: isAuth, user: user || null });
      },

      logout: () => {
        deleteCookie("isAuthenticated");
        deleteCookie("auth_token");
        deleteCookie("user_phone");

        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
