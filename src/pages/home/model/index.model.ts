import { categoryApi } from "@/src/entities/category/api";
import { CategoriesProducts, productsApi } from "@/src/entities/products/api";

export const fetchData = async (): Promise<CategoriesProducts[]> => {
  const [bouquets, specificationsResponse, editableCategories] =
    await Promise.all([
      productsApi.getAllBouquets(),
      productsApi.getCategories(),
      categoryApi.getEditableCategories(),
    ]);

  categoryApi
    .syncCategories(
      specificationsResponse.categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description ?? "",
      }))
    )
    .catch(() => {});

  const editableCategoriesById = new Map(
    editableCategories.map(category => [category.id, category])
  );

  const priorityNames = [
    "8 марта",
    "1 сентября",
    "День мамы",
    "Новый год",
    "14 февраля",
  ];

  const specifications = specificationsResponse.categories
    .map(category => {
      const editableCategory = editableCategoriesById.get(category.id);

      return {
        ...category,
        name: editableCategory?.name ?? category.name,
        description: editableCategory?.description ?? "",
      };
    })
    .sort((a, b) => {
      const indexA = priorityNames.indexOf(a.name);
      const indexB = priorityNames.indexOf(b.name);

      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const expressDelivery = {
    name: "экспресс-доставка",
    id: "express-delivery",
    description: "",
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
