export interface ProductCardProps {
  className?: string;
  name: string;
  images: string[];
  priceList: {
    size: string;
    price: number;
  }[];
  productId: string;
}
