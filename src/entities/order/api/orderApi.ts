import { api } from "@/src/shared/api";

const orderBase = "orders";

interface OrderCartItem {
  productId: string;
  title: string;
  size: string;
  price: string;
  image: string;
}

export interface OrderBody {
  cartItems: OrderCartItem[];
  delivery: {
    fullAddress: string;
    apartment: string;
    entrance: string;
    floor: string;
    intercom: string;
    date: string;
    time: string;
    district: string;
  };
  recipient: {
    name: string;
    phoneNumber: string;
  };
  sender: {
    name: string;
    phoneNumber: string;
  };
  postcard?: string;
  deliveryPrice: string;
  cartPrice: string;
  fullPrice: string;
}

export interface OrderResponse {
  payment_url: string;
}

export const orderApi = {
  createOrder: (userId: string, body: OrderBody) =>
    api.post<OrderResponse>(`/${orderBase}/create/`, body, {
      params: { user_id: userId },
    }),
};
