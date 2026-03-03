import { api } from "@/src/shared/api";

const orderBase = "orders";

interface OrderCartItem {
  productId: string;
  title: string;
  size: string;
  price: string;
  image: string;
}

interface OrderSender {
  name: string;
  phoneNumber: string;
}

interface OrderDelivery {
  fullAddress: string;
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
  date: string;
  time: string;
  district: string;
}

interface OrderPickup {
  recipientName: string;
  recipientPhone: string;
  date: string;
  time: string;
}

export interface OrderBodyDelivery {
  cartItems: OrderCartItem[];
  deliveryType: "delivery";
  delivery: OrderDelivery;
  recipient: { name: string; phoneNumber: string };
  sender: OrderSender;
  postcard?: string;
  deliveryPrice: string;
  cartPrice: string;
  fullPrice: string;
}

export interface OrderBodyPickup {
  cartItems: OrderCartItem[];
  deliveryType: "pickup";
  pickup: OrderPickup;
  sender: OrderSender;
  postcard?: string;
  deliveryPrice: string;
  cartPrice: string;
  fullPrice: string;
}

export type OrderBody = OrderBodyDelivery | OrderBodyPickup;

export interface OrderResponse {
  payment_url: string;
}

export const orderApi = {
  createOrder: (userId: string, body: OrderBody) =>
    api.post<OrderResponse>(`/${orderBase}/create/`, body, {
      params: { user_id: userId },
    }),
};
