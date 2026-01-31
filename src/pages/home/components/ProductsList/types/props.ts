import { Bouquet } from "@/src/entities/products/api";

export interface ProductsListProps {
  className?: string;
  category: string;
  products: Bouquet[];
}
