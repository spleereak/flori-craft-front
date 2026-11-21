import { Bouquet } from "@/src/entities/products/api";

export interface ProductsListProps {
  className?: string;
  category: string;
  categoryId: string;
  description?: string;
  products: Bouquet[];
  isFirstCategory?: boolean;
}
