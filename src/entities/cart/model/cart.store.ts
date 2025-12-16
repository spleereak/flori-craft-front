"use client";

import { create } from "zustand";

import { sessionCart } from "../lib/sessionCart";
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

    const items = sessionCart.get();
    set({ items, isHydrated: true });
  },

  addItem: item => {
    const currentItems = get().items;
    const nextItems = sessionCart.add(currentItems, item);

    if (nextItems === currentItems) return;

    sessionCart.save(nextItems);
    set({ items: nextItems });
  },

  removeItem: id => {
    const currentItems = get().items;
    const nextItems = sessionCart.remove(currentItems, id);

    if (nextItems === currentItems) return;

    sessionCart.save(nextItems);
    set({ items: nextItems });
  },
}));
