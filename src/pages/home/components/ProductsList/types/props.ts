import { ProductCardProps } from "../../ProductCard/types";

export interface ProductsListProps {
  className?: string;
  category: string;
  products: Omit<ProductCardProps, "className">[];
}
