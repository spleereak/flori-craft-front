// Запуск (Node.js 22): node --experimental-strip-types --test tests/cardPrice.test.mjs
import assert from "node:assert/strict";
import test from "node:test";

import {
  getMinimumCardPrice,
  isExpressDeliveryCategory,
} from "../src/pages/home/components/ProductCard/lib/cardPrice.ts";

test("цена карточки берётся от самого дешёвого варианта, независимо от порядка", () => {
  assert.equal(
    getMinimumCardPrice(null, [{ price: 5000 }, { price: 3000 }, { price: 4000 }]),
    3000
  );
});

test("карточка товара без размеров использует обычную цену", () => {
  assert.equal(getMinimumCardPrice(3000), 3000);
  assert.equal(getMinimumCardPrice(4000, []), 4000);
});

test("для отсутствующей или некорректной цены не выводится NaN", () => {
  assert.equal(getMinimumCardPrice(null, []), null);
  assert.equal(getMinimumCardPrice(NaN), null);
});

test("Экспресс-доставка определяется по постоянному id после переименования", () => {
  assert.equal(isExpressDeliveryCategory("express-delivery", "Срочные букеты"), true);
});

test("Экспресс-доставка определяется и по имени без учёта регистра", () => {
  assert.equal(isExpressDeliveryCategory("other", " ЭКСПРЕСС-ДОСТАВКА "), true);
});

test("обычные категории, включая День мамы, получают префикс от", () => {
  assert.equal(isExpressDeliveryCategory("cat1", "День мамы"), false);
  assert.equal(isExpressDeliveryCategory("cat2", "Розы"), false);
});
