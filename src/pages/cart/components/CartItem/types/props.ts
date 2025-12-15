export interface CartItemProps {
  className?: string;
  product: {
    id: string;
    name: string;
    size: string;
    price: number;
    imageSrc: string;
  };
}
