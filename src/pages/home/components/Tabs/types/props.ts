import { CategoriesProducts } from "@/src/entities/products/api";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export interface TabsProps {
  className?: string;
  minPrice: number;
  maxPrice: number;
  prices: PriceProps;
  activeTab: string;
  categories: CategoriesProducts[];
  // eslint-disable-next-line no-unused-vars
  onSelect?: (id: string) => void;
  // eslint-disable-next-line no-unused-vars
  updatePrice: (name: keyof PriceProps, value: number) => void;
  // eslint-disable-next-line no-unused-vars
  updatePrices: (newPrices: [number, number]) => void;
}
