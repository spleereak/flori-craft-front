export interface ProductProps {
  product_id: string;
  images: string[];
  name: string;
  priceList: {
    size: string;
    price: number;
  }[];
  info: string[];
}
