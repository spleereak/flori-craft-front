import { CategoriesProducts, productsApi } from "@/src/entities/products/api";

export const fetchData = async (): Promise<CategoriesProducts[]> => {
  const [bouquets, specificationsResponse] = await Promise.all([
    productsApi.getAllBouquets(),
    productsApi.getCategories(),
  ]);

  const specifications = specificationsResponse.categories;

  console.log(specifications);

  return [
    {
      name: "Готовые букеты",
      products: bouquets,
    },
    ...specifications,
  ];
};
