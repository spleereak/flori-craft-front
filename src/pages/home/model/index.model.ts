import { CategoriesProducts, productsApi } from "@/src/entities/products/api";

export const fetchData = async (): Promise<CategoriesProducts[]> => {
  const [bouquets, specificationsResponse] = await Promise.all([
    productsApi.getAllBouquets(),
    productsApi.getCategories(),
  ]);

  const specifications = [...specificationsResponse.categories].sort((a, b) => {
    if (a.name === "Авторские букеты") return -1;
    if (b.name === "Авторские букеты") return 1;
    return 0;
  });

  return [
    {
      name: "Готовые букеты",
      products: bouquets,
    },
    ...specifications,
  ];
};
