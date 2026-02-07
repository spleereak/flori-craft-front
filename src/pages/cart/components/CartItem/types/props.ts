export interface CartItemProps {
  className?: string;
  product: {
    product_id: string;
    title: string;
    size: "S" | "M" | "L" | "";
    price: number;
    image: string;
  };
  type?: "order" | "cart";
}
