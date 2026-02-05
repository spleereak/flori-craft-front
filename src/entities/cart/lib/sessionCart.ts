import { CartItem } from "../model/cart.types";

const STORAGE_KEY = "cart";

function isBrowser() {
  return typeof window !== "undefined";
}

export const sessionCart = {
  get(): CartItem[] {
    if (!isBrowser()) return [];

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  },
  save(items: CartItem[]) {
    if (!isBrowser()) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  add(items: CartItem[], item: CartItem): CartItem[] {
    const exists = items.some(
      i => i.product_id === item.product_id && i.size === item.size
    );
    if (exists) return items;
    return [...items, item];
  },

  remove({
    items,
    id,
    size,
  }: {
    items: CartItem[];
    id: string;
    size: string;
  }): CartItem[] {
    return items.filter(
      item => !(item.product_id === id && item.size === size)
    );
  },

  clear(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
