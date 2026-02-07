import { CartItemProps } from "@/src/pages/cart/components/CartItem/types";

export interface CartBlockProps {
  className?: string;
  items: CartItemProps["product"][];
  error?: string;
}
