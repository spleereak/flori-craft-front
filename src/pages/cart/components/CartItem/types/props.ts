type availableSize = "S" | "M" | "L";

export interface CartItemProps {
  className?: string;
  product: {
    name: string;
    size: availableSize;
    price: number;
    imageSrc: string;
  };
}
