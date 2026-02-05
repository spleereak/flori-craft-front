import { api } from "@/src/shared/api";

const posifloraBase = "posiflora";

type BouquetBase = {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
};

type BouquetWithPrice = BouquetBase & {
  price: number; // предполагаем > 0
  variants?: never;
};

type BouquetWithVariants = BouquetBase & {
  price?: null;
  variants: {
    size: "S" | "M" | "L";
    price: number;
  }[];
};

export type Bouquet = BouquetWithPrice | BouquetWithVariants;

export interface CategoriesProducts {
  name: string;
  products: Bouquet[];
}

export interface specificationsResponse {
  categories: CategoriesProducts[];
}

export const productsApi = {
  getAllBouquets: () =>
    api.get<Bouquet[]>(`/${posifloraBase}/bouquets/`, { revalidate: 300 }),
  getProductById: (productId: string) =>
    api.get<Bouquet>(`/${posifloraBase}/products/${productId}/`, {
      revalidate: 300,
    }),
  getCategories: () =>
    api.get<specificationsResponse>(`/${posifloraBase}/specifications/`, {
      revalidate: 600,
    }),
};
