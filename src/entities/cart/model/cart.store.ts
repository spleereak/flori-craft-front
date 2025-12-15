"use client";

import { create } from "zustand";

import { localCart } from "../lib/localCart";
import { CartItem } from "./cart.types";

type CartState = {
  items: CartItem[];
  isHydrated: boolean;

  hydrate: () => void;
  /* eslint-disable no-unused-vars */
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isHydrated: false,

  hydrate: () => {
    if (get().isHydrated) return;

    const items = localCart.get();
    set({ items, isHydrated: true });
  },

  addItem: item => {
    const currentItems = get().items;
    const nextItems = localCart.add(currentItems, item);

    if (nextItems === currentItems) return;

    localCart.save(nextItems);
    set({ items: nextItems });
  },

  removeItem: id => {
    const currentItems = get().items;
    const nextItems = localCart.remove(currentItems, id);

    if (nextItems === currentItems) return;

    localCart.save(nextItems);
    set({ items: nextItems });
  },
}));
