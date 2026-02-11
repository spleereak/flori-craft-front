"use client";

import Markdown from "react-markdown";

import React, { memo } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { Bouquet } from "@/src/entities/products/api";
import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";
import { useToastStore } from "@/src/shared/ui/Toast";

import { ImagesBlock } from "../../ImagesBlock/ui";
import { SizeBlock } from "../../SizeBlock/ui";

const ArrowLeftIcon = memo(() => (
  <svg
    width="24"
    height="33"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
));
ArrowLeftIcon.displayName = "ArrowLeftIcon";

const CloseIcon = memo(() => (
  <svg
    className="desktop:size-20 size-12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

export default function ClientProductPage({ product }: { product: Bouquet }) {
  const [activeSize, setActiveSize] = React.useState<string>(
    product.variants?.[0]?.size ?? ""
  );
  const router = useRouter();

  const sizes = product.variants?.map((item: any) => item.size) ?? [];

  const { items, addItem, removeItem, isHydrated, isLoading } = useCartStore();
  const openToast = useToastStore(state => state.open);

  const activePrice = product.variants
    ? product.variants.find(item => item.size === activeSize)!.price
    : product.price;

  const isInCart = items.some(
    item => item.product_id === product.id && item.size === activeSize
  );

  const handleClick = () => {
    if (!isInCart) {
      addItem({
        product_id: product.id,
        title: product.title,
        size: activeSize as "S" | "M" | "L",
        price: activePrice,
        image: product.image_urls[0],
      });

      openToast();
    } else {
      removeItem({
        product_id: product.id,
        title: product.title,
        size: activeSize as "S" | "M" | "L",
        price: activePrice,
        image: product.image_urls[0],
      });
    }
  };

  const handleBuyRightNow = () => {
    if (!isInCart) {
      addItem({
        product_id: product.id,
        title: product.title,
        size: activeSize as "S" | "M" | "L",
        price: activePrice,
        image: product.image_urls[0],
      });
    }
    router.push("/cart");
  };

  return (
    <div className="desktop:flex-row desktop:gap-184 desktop:flex desktop:items-start w-full">
      <Link
        href="/"
        className="desktop:flex hidden max-h-max flex-row items-center gap-12"
      >
        <ArrowLeftIcon />
        <p className="text_p max-h-max">На главную</p>
      </Link>
      <div className="desktop:max-w-1054 desktop:flex-row desktop:gap-24 relative flex w-full flex-col">
        <Link
          href="/"
          className="desktop:hidden fixed left-16 top-16 flex size-28 items-center justify-center rounded-full bg-white transition-all duration-300 active:opacity-80"
        >
          <CloseIcon />
        </Link>
        {product.image_urls && product.image_urls.length > 0 ? (
          <ImagesBlock images={product.image_urls} />
        ) : (
          <div className="desktop:size-539 desktop:rounded-2xl h-440 w-full bg-[#D9D9D9] object-cover" />
        )}
        <div className="desktop:pt-50 desktop:max-w-491 desktop:px-0 flex flex-col px-16 pt-12">
          <h3 className="h3 desktop:mb-46 mb-22">{product.title}</h3>
          <div className="desktop:flex-col desktop:gap-24 desktop:justify-start desktop:mb-51 mb-22 flex flex-row justify-between">
            <h3 className="h3">{formatPrice(activePrice!)} ₽</h3>
            <SizeBlock
              sizes={sizes}
              activeSize={activeSize}
              setActiveSize={setActiveSize}
            />
          </div>
          <div className="desktop:mb-30 desktop:flex-col max-desktop:fixed desktop:p-0 bottom-0 left-0 flex w-full flex-row-reverse gap-10 bg-white p-16">
            <Button onClick={handleClick} disabled={!isHydrated || isLoading}>
              {!isHydrated
                ? "Загрузка..."
                : isInCart
                  ? "Убрать из корзины"
                  : "Добавить в корзину"}
            </Button>
            <Button appearance="outline" onClick={handleBuyRightNow}>
              {!isHydrated ? "Загрузка..." : "Купить сейчас"}
            </Button>
          </div>
          {product.description && (
            <div className="caption text-grey-for-text flex flex-col gap-12">
              <Markdown>{product.description}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
