"use client";

import { ArrowLeft } from "lucide-react";

import React from "react";

import Link from "next/link";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { generateId } from "@/src/shared/lib/utils/generate-id";
import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";

import { ImagesBlock } from "../../ImagesBlock/ui";
import { SizeBlock } from "../../SizeBlock/ui";
import { ProductProps } from "../types/props";

export default function ClientProductPage({
  product,
}: {
  product: ProductProps;
}) {
  const [activeSize, setActiveSize] = React.useState<string>(
    product.priceList[0].size
  );

  const sizes = product.priceList.map(item => item.size);

  const { items, addItem, removeItem } = useCartStore();

  const activePrice = product.priceList.find(
    item => item.size === activeSize
  )?.price;

  const isInCart = items.some(
    item =>
      item.id ===
      generateId({
        productId: product.productId,
        size: activeSize,
      })
  );

  const handleClick = () => {
    const cartItemId = generateId({
      productId: product.productId,
      size: activeSize,
    });
    if (!isInCart) {
      addItem({
        id: cartItemId,
        productId: product.productId,
        name: product.name,
        size: activeSize,
        price: activePrice!,
        images: product.images,
      });
    } else {
      removeItem(cartItemId);
    }
  };

  return (
    <div className="desktop:flex-row desktop:gap-184 desktop:flex w-full">
      <Link
        href="/"
        className="desktop:flex hidden max-h-max flex-row items-center gap-12"
      >
        <ArrowLeft className="h-33 w-24" />
        <p className="text_p max-h-max">На главную</p>
      </Link>
      <div className="desktop:max-w-1054 desktop:flex-row desktop:gap-24 relative flex w-full flex-col">
        <Link
          href="/"
          className="desktop:hidden fixed left-16 top-16 flex size-28 items-center justify-center rounded-full bg-white transition-all duration-300 active:opacity-80"
        >
          <CloseIcon />
        </Link>
        <ImagesBlock images={product.images} />
        <div className="desktop:pt-50 desktop:max-w-491 desktop:px-0 flex flex-col px-16 pt-12">
          <h3 className="h3 desktop:mb-46 mb-22">{product.name}</h3>
          <div className="desktop:flex-col desktop:gap-24 desktop:justify-start desktop:mb-51 mb-22 flex flex-row-reverse justify-between">
            <h3 className="h3">{formatPrice(activePrice!)} ₽</h3>
            <SizeBlock
              sizes={sizes}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          </div>
          <div className="desktop:mb-30 desktop:flex-col max-desktop:fixed desktop:p-0 bottom-0 left-0 flex w-full flex-row gap-10 bg-white p-16">
            <Button onClick={handleClick}>
              {isInCart ? "Убрать из корзины" : "Добавить в корзину"}
            </Button>
            <Button appearance="outline">Купить сейчас</Button>
          </div>
          <div className="text-grey-for-text flex flex-col gap-24">
            {product.info.map((text, i) => (
              <p key={i} className="caption">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
