import { api } from "@/src/shared/api";

import { CartItem } from "../model/cart.types";

const cartBase = "cart";

export interface CartResponse {
  items: CartItem[];
}

export const cartApi = {
  getCart: (userId: string) =>
    api.get<CartResponse>(`/${cartBase}/`, { params: { user_id: userId } }),

  addItem: (userId: string, item: CartItem) => {
    return api.post<CartResponse>(`/${cartBase}/item/`, item, {
      params: { user_id: userId },
    });
  },

  removeItem: (userId: string, item: CartItem) =>
    api.delete<CartResponse>(`/${cartBase}/item/`, item, {
      params: { user_id: userId },
    }),
};
