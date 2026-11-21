// Запуск (Node.js 22): node --experimental-strip-types --test tests/deliveryDateRules.test.mjs
import assert from "node:assert/strict";
import test from "node:test";

import {
  getMothersDayProductIds,
  isOrderDateDisabled,
} from "../src/pages/order/lib/deliveryDateRules.ts";

const today = new Date(2026, 10, 21);
const maxDate = new Date(2027, 10, 21);
const day = (year, month, date) => new Date(year, month - 1, date);

test("обычные товары: праздничные даты доступны", () => {
  for (const selected of [
    day(2026, 11, 28),
    day(2026, 11, 29),
    day(2026, 11, 30),
    day(2027, 2, 13),
    day(2027, 2, 14),
    day(2027, 3, 7),
    day(2027, 3, 8),
  ]) {
    assert.equal(isOrderDateDisabled(selected, today, maxDate, false), false);
  }
});

test("обычные товары: прошлые даты и даты за пределами года недоступны", () => {
  assert.equal(isOrderDateDisabled(day(2026, 11, 20), today, maxDate, false), true);
  assert.equal(isOrderDateDisabled(day(2027, 11, 22), today, maxDate, false), true);
});

test("День мамы: доступны только 28–30 ноября 2026", () => {
  for (const date of [28, 29, 30]) {
    assert.equal(isOrderDateDisabled(day(2026, 11, date), today, maxDate, true), false);
  }
  for (const selected of [
    day(2026, 11, 27),
    day(2026, 12, 1),
    day(2027, 3, 8),
    day(2027, 11, 20),
  ]) {
    assert.equal(isOrderDateDisabled(selected, today, maxDate, true), true);
  }
});

test("категория определяется по каталогу, независимо от пересечения с другими", () => {
  const categories = [
    { id: "1", name: "ДЕНЬ МАМЫ ", products: [{ id: "rose" }, { id: "daisy" }] },
    { id: "2", name: "Обычные", products: [{ id: "rose" }, { id: "tulip" }] },
  ];
  const ids = getMothersDayProductIds(categories);
  assert.deepEqual([...ids], ["rose", "daisy"]);
});

test("учитывается переименование категории на витрине через Strapi", () => {
  const categories = [
    { id: "category-1", name: "Праздничные букеты", products: [{ id: "gift" }] },
  ];
  const displayed = [{ id: "category-1", name: "День мамы" }];
  assert.deepEqual([...getMothersDayProductIds(categories, displayed)], ["gift"]);
});
