"use client";

import { create } from "zustand";

import { cookies } from "@/src/shared/lib/utils/cookies";

import { cartApi } from "../api/cartApi";
import { sessionCart } from "../lib/sessionCart";
import { CartItem } from "./cart.types";

function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  return cookies.get("user_id");
}

type CartState = {
  items: CartItem[];
  isHydrated: boolean;
  isLoading: boolean;

  hydrate: () => Promise<void>;
  /* eslint-disable no-unused-vars */
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (item: CartItem) => Promise<void>;
  syncWithServer: () => Promise<void>;
  clearLocalCart: () => void;
  reset: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,
  isLoading: false,

  hydrate: async () => {
    if (get().isHydrated) return;

    const userId = getUserId();

    if (userId) {
      set({ isLoading: true });
      try {
        const response = await cartApi.getCart(userId);
        const items = response?.items ?? [];
        set({ items, isHydrated: true, isLoading: false });
      } catch (error) {
        console.error("Ошибка загрузки корзины с сервера:", error);
        set({ items: [], isHydrated: true, isLoading: false });
      }
    } else {
      const items = sessionCart.get();
      set({ items, isHydrated: true });
    }
  },

  addItem: async item => {
    const userId = getUserId();
    const currentItems = get().items;

    const exists = currentItems.some(
      i => i.product_id === item.product_id && i.size === item.size
    );
    if (exists) return;

    const optimisticItems = [...currentItems, item];
    set({ items: optimisticItems, isLoading: true });

    if (userId) {
      try {
        const response = await cartApi.addItem(userId, item);
        if (response?.items) {
          set({ items: response.items, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        console.error("Ошибка добавления товара:", error);
        set({ items: currentItems, isLoading: false });
      }
    } else {
      sessionCart.save(optimisticItems);
      set({ isLoading: false });
    }
  },

  removeItem: async (item: CartItem) => {
    const userId = getUserId();
    const currentItems = get().items;

    const optimisticItems = currentItems.filter(
      i => !(i.product_id === item.product_id && i.size === item.size)
    );

    if (optimisticItems.length === currentItems.length) return;

    set({ items: optimisticItems, isLoading: true });

    if (userId) {
      try {
        const response = await cartApi.removeItem(userId, item);
        if (response?.items) {
          set({ items: response.items, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      } catch (error) {
        console.error("Ошибка удаления товара:", error);
        set({ items: currentItems, isLoading: false });
      }
    } else {
      sessionCart.save(optimisticItems);
      set({ isLoading: false });
    }
  },

  syncWithServer: async () => {
    const userId = getUserId();
    if (!userId) return;

    const localItems = sessionCart.get();
    if (localItems.length === 0) {
      set({ isLoading: true });
      try {
        const response = await cartApi.getCart(userId);
        const items = response?.items ?? [];
        set({ items, isLoading: false });
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error);
        set({ isLoading: false });
      }
      return;
    }

    set({ isLoading: true });
    try {
      await Promise.all(localItems.map(item => cartApi.addItem(userId, item)));

      sessionCart.clear();

      const response = await cartApi.getCart(userId);
      const items = response?.items ?? [];
      set({ items, isLoading: false });
    } catch (error) {
      console.error("Ошибка синхронизации корзины:", error);
      set({ isLoading: false });
    }
  },

  clearLocalCart: () => {
    sessionCart.clear();
    set({ items: [] });
  },

  reset: () => {
    sessionCart.clear();
    set({ items: [], isHydrated: false, isLoading: false });
  },
}));
