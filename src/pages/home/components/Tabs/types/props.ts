import { CategoriesProducts } from "@/src/entities/products/api";

export interface TabsProps {
  className?: string;
  activeTab: string;
  categories: CategoriesProducts[];
  // eslint-disable-next-line no-unused-vars
  onSelect?: (id: string) => void;
}
