import { CartItem } from "../model/cart.types";

const STORAGE_KEY = "cart";

function isBrowser() {
  return typeof window !== "undefined";
}

export const localCart = {
  get(): CartItem[] {
    if (!isBrowser) return [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  },
  save(items: CartItem[]) {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  add(items: CartItem[], item: CartItem): CartItem[] {
    const exists = items.some(i => i.id === item.id);
    if (exists) return items;
    return [...items, item];
  },

  remove(items: CartItem[], id: string): CartItem[] {
    return items.filter(item => item.id !== id);
  },
};
