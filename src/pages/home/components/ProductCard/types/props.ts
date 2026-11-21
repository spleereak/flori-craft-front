export interface ProductCardProps {
  id: string;
  title: string;
  image_urls: string[];
  description: string;
  price?: number | null;
  showFromPrice: boolean;
  variants?: {
    size: "S" | "M" | "L";
    price: number;
  }[];
}
