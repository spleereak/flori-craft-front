export interface CartItemProps {
  className?: string;
  product: {
    id: string;
    title: string;
    size: string;
    price: number;
    imageSrc: string;
  };
}
