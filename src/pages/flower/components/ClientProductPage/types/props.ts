export interface ProductProps {
  productId: string;
  images: string[];
  name: string;
  priceList: {
    size: string;
    price: number;
  }[];
  info: string[];
}
