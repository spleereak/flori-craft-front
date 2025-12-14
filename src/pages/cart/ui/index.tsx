"use client";

import { useState } from "react";

import Link from "next/link";

import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/Checkbox";

import { CartItemProps } from "../components/CartItem/types";
import { CartItem } from "../components/CartItem/ui";

const products: CartItemProps["product"][] = [
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
  {
    name: "Пышный букет из ажурных роз. Букет 1 Галерея",
    price: 5999,
    size: "M",
    imageSrc: "",
  },
];

export default function CartPage() {
  const totalPrice = products.reduce((acc, product) => product.price + acc, 0);
  const [checked, setChecked] = useState(false);
  return (
    <div className="desktop:pb-160 desktop:px-90 pb-100 min-h-screen px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-47 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <p className="caption">Корзина</p>
      </div>
      <div className="desktop:flex gap-13 mb-93 hidden flex-row items-start">
        <h1 className="h1 pt-13">Корзина</h1>
        <p className="caption text-grey-for-text">товаров: {products.length}</p>
      </div>
      <div className="desktop:flex-row desktop:gap-43 gap-25 relative flex flex-col">
        <div className="desktop:gap-30 flex w-full flex-col gap-20">
          {products.map((product, i) => (
            <CartItem
              product={product}
              className="desktop:pb-30 border-b border-[#80808080] pb-20"
              key={i}
            />
          ))}
        </div>
        <div className="desktop:max-h-482 max-h-259 desktop:top-200 desktop:py-24 desktop:px-20 p-15 desktop:sticky desktop:max-w-431 bg-light-grey flex flex-col rounded-2xl shadow-[1px_1px_4px_0_rgba(0,0,0,0.1),-1px_-1px_4px_0_rgba(0,0,0,0.1)]">
          <div className="desktop:gap-34 desktop:mb-51 mb-23 flex flex-col gap-14">
            <div className="flex flex-row justify-between">
              <p className="caption text-grey-for-text">Товаров на сумму:</p>
              <p className="p">{formatPrice(totalPrice)} ₽</p>
            </div>
            <div className="flex flex-row justify-between">
              <p className="caption text-grey-for-text">Сумма со скидкой:</p>
              <p className="p">{formatPrice(totalPrice)} ₽</p>
            </div>
          </div>
          <div className="desktop:gap-22 desktop:mb-22 mb-15 flex flex-col gap-10">
            <h3 className="h3">Итого:</h3>
            <h3 className="h3">{formatPrice(totalPrice)} ₽</h3>
          </div>
          <div className="desktop:gap-26 flex flex-col gap-16">
            <Button className="desktop:w-391">Оформить заказ</Button>
            <div className="desktop:gap-13 flex flex-row gap-11">
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <p className="caption text-grey-for-text">
                Нажимая на кнопку «Оформить заказ», вы соглашаетесь на обработку
                персональных данных
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
