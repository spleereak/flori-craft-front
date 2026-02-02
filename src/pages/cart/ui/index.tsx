"use client";

import { useState } from "react";

import Link from "next/link";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { formatPrice, formatProduct } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/Checkbox";

import { CartItem } from "../components/CartItem/ui";

export default function CartPage() {
  const { items, isHydrated } = useCartStore();

  const totalPrice = items.reduce((acc, product) => product.price + acc, 0);
  const [checked, setChecked] = useState(false);
  return (
    <div className="desktop:pb-160 desktop:px-90 pb-100 px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-47 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <p className="caption">Корзина</p>
      </div>
      <div className="desktop:flex gap-13 mb-93 hidden flex-row items-start">
        <h1 className="h1 pt-13">Корзина</h1>
        <p className="caption text-grey-for-text">
          {formatProduct(items.length)}
        </p>
      </div>
      {!isHydrated ? (
        <h1 className="h1">Загрузка</h1>
      ) : items.length > 0 ? (
        <div className="desktop:flex-row desktop:gap-43 gap-25 relative flex flex-col">
          <div className="desktop:gap-30 flex w-full flex-col gap-20">
            {items.map(item => {
              const product = {
                id: item.id,
                title: item.title,
                imageSrc: item.image_urls[0],
                size: item.size,
                price: item.price,
              };
              return (
                <CartItem
                  product={product}
                  className="desktop:pb-30 border-b border-[#80808080] pb-20"
                  key={item.id}
                />
              );
            })}
          </div>
          <div className="desktop:max-h-482 max-h-259 desktop:top-200 desktop:py-24 desktop:px-20 p-15 desktop:sticky desktop:max-w-431 bg-light-grey flex flex-col rounded-2xl shadow-[1px_1px_4px_0_rgba(0,0,0,0.1),-1px_-1px_4px_0_rgba(0,0,0,0.1)]">
            <div className="desktop:gap-34 desktop:mb-51 mb-23 flex flex-col gap-14">
              <div className="flex flex-row justify-between">
                <p className="caption text-grey-for-text">
                  {formatProduct(items.length)} на сумму:
                </p>
                <p className="text_p">{formatPrice(totalPrice)} ₽</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="caption text-grey-for-text">Сумма со скидкой:</p>
                <p className="text_p">{formatPrice(totalPrice)} ₽</p>
              </div>
            </div>
            <div className="desktop:gap-22 desktop:mb-22 mb-15 flex flex-col gap-10">
              <h3 className="h3">Итого:</h3>
              <h3 className="h3">{formatPrice(totalPrice)} ₽</h3>
            </div>
            <div className="desktop:gap-26 flex flex-col gap-16">
              <Button className="desktop:w-391 max-desktop:w-full">
                Оформить заказ
              </Button>
              <div className="desktop:gap-13 flex flex-row gap-11">
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                <p className="caption text-grey-for-text">
                  Нажимая на кнопку «Оформить заказ», вы соглашаетесь на
                  обработку персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="desktop:pt-81 pt-146 flex h-full w-full flex-col items-center justify-center">
          <h1 className="empty desktop:pb-5 pb-6">Нет товаров в корзине</h1>
          <p className="caption desktop:pb-41 pb-29">
            Но вы можете их сюда добавить на главной странице
          </p>
          <Link className="desktop:pb-285 pb-235" href="/">
            <Button
              appearance="outline"
              className="desktop:w-235 desktop:h-65 w-98 h-34"
            >
              Главная
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
