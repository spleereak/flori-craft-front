/** Период приёма заказов из категории «День мамы» для кампании 2026 года. */
export const MOTHERS_DAY_ORDER_YEAR = 2026;
export const MOTHERS_DAY_DATE_HINT =
  "Товары из категории «День мамы» можно заказать только на 28, 29 или 30 ноября 2026 года.";

export type DateRestrictions = {
  status: "loading" | "ready" | "error";
  hasMothersDayProducts: boolean;
};

/** Товар может находиться одновременно в нескольких категориях. */
export function getMothersDayProductIds(
  categories: ReadonlyArray<{
    id: string;
    name: string;
    products: ReadonlyArray<{ id: string }>;
  }>,
  displayedCategories: ReadonlyArray<{ id: string; name: string }> = []
): Set<string> {
  // На витрине категория может быть переименована через Strapi.
  const displayedNames = new Map(
    displayedCategories.map(category => [category.id, category.name])
  );
  const isMothersDay = (name: string) =>
    name.trim().toLocaleLowerCase("ru-RU") === "день мамы";

  return new Set(
    categories
      .filter(
        category =>
          isMothersDay(category.name) ||
          isMothersDay(displayedNames.get(category.id) ?? "")
      )
      .flatMap(category => category.products.map(product => product.id))
  );
}

/** Общая проверка для календарей доставки/самовывоза и отправки заказа. */
export function isOrderDateDisabled(
  date: Date,
  today: Date,
  maxDate: Date,
  hasMothersDayProducts: boolean
): boolean {
  if (Number.isNaN(date.getTime()) || date < today || date > maxDate) {
    return true;
  }

  if (!hasMothersDayProducts) {
    // Больше нет специальных праздничных запретов для обычных товаров.
    return false;
  }

  return !(
    date.getFullYear() === MOTHERS_DAY_ORDER_YEAR &&
    date.getMonth() === 10 &&
    date.getDate() >= 28 &&
    date.getDate() <= 30
  );
}
