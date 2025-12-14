export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU").format(price);
}

export function formatProduct(count: number) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${count} товаров`;
  }

  if (lastDigit === 1) {
    return `${count} товар`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} товара`;
  } else {
    return `${count} товаров`;
  }
}
