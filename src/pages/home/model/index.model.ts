import { categoryApi } from "@/src/entities/category/api";
import { CategoriesProducts, productsApi } from "@/src/entities/products/api";

export const fetchData = async (): Promise<CategoriesProducts[]> => {
  const [bouquets, specificationsResponse, editableCategories] =
    await Promise.all([
      productsApi.getAllBouquets(),
      productsApi.getCategories(),
      categoryApi.getEditableCategories(),
    ]);

  const expressDelivery: CategoriesProducts = {
    id: "express-delivery",
    name: "экспресс-доставка",
    description: "",
    products: bouquets,
  };

  const allCategories = [...specificationsResponse.categories, expressDelivery];

  categoryApi
    .syncCategories(
      allCategories.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description ?? "",
      }))
    )
    .catch(() => {});

  const editableCategoriesById = new Map(
    editableCategories.map(category => [category.id, category])
  );

  return allCategories
    .map(category => {
      const editable = editableCategoriesById.get(category.id);

      return {
        ...category,
        name: editable?.name ?? category.name,
        description: editable?.description ?? "",
        position: editable?.position ?? Number.MAX_SAFE_INTEGER,
      };
    })
    .sort((a, b) => a.position - b.position);
};
