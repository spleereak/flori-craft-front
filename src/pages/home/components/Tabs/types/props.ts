export interface TabsProps {
  className?: string;
  minPrice?: number;
  maxPrice?: number;
  activeTab: string;
  categories: {
    id: string;
    name: string;
  }[];
  // eslint-disable-next-line no-unused-vars
  onSelect?: (id: string) => void;
}
