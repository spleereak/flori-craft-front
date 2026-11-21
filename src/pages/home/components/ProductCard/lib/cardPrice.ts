/** Минимальная цена карточки товара; порядок вариантов не гарантирован. */
export function getMinimumCardPrice(
  price?: number | null,
  variants?: ReadonlyArray<{ price: number }>
): number | null {
  const variantPrices = (variants ?? [])
    .map(variant => variant.price)
    .filter(value => Number.isFinite(value));

  if (variantPrices.length > 0) {
    return Math.min(...variantPrices);
  }

  return typeof price === "number" && Number.isFinite(price) ? price : null;
}

/** Экспресс-доставка не должна иметь префикс «от», даже при переименовании в Strapi. */
export function isExpressDeliveryCategory(id: string, name: string): boolean {
  return (
    id === "express-delivery" ||
    name.trim().toLocaleLowerCase("ru-RU") === "экспресс-доставка"
  );
}

/** Префикс «от» нужен только товару с несколькими доступными размерами вне экспресс-доставки. */
export function shouldShowFromPrice(
  categoryId: string,
  categoryName: string,
  variants?: ReadonlyArray<{ size: string; price: number }>
): boolean {
  if (isExpressDeliveryCategory(categoryId, categoryName)) {
    return false;
  }

  const sizes = new Set(
    (variants ?? [])
      .filter(variant => Number.isFinite(variant.price))
      .map(variant => variant.size)
  );
  return sizes.size > 1;
}
