import { CategoriesProducts, productsApi } from "@/src/entities/products/api";

export const fetchData = async (): Promise<CategoriesProducts[]> => {
  const [bouquets, specificationsResponse] = await Promise.all([
    productsApi.getAllBouquets(),
    productsApi.getCategories(),
  ]);

  const priorityNames = [
    "8 марта",
    "1 сентября",
    "День мамы",
    "Новый год",
    "14 февраля",
  ];

  const specifications = [...specificationsResponse.categories].sort((a, b) => {
    const indexA = priorityNames.indexOf(a.name);
    const indexB = priorityNames.indexOf(b.name);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const expressDelivery = {
    name: "экспресс-доставка",
    products: bouquets,
  };

  if (specifications.length === 0) {
    return [expressDelivery];
  }

  if (specifications.length === 1) {
    return [specifications[0], expressDelivery];
  }

  return [
    specifications[0],
    specifications[1],
    expressDelivery,
    ...specifications.slice(2),
  ];
};
