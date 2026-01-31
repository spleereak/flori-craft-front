"use client";

import React from "react";

import Image from "next/image";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { TrashIcon } from "@/src/shared/icons/TrashIcon";
import { cn } from "@/src/shared/lib/utils/cn";
import { formatPrice } from "@/src/shared/lib/utils/helpers";

import { CartItemProps } from "../types";

export const CartItem: React.FC<CartItemProps> = ({ className, product }) => {
  const { removeItem } = useCartStore();
  console.log(product);

  return (
    <div
      className={cn(
        "desktop:justify-between desktop:h-274 h-145 flex w-full flex-row gap-12",
        className
      )}
    >
      {product.imageSrc ? (
        <Image
          src={product.imageSrc}
          alt=""
          width={213}
          height={244}
          className="desktop:w-213 desktop:h-244 w-109 h-125 desktop:rounded-2xl rounded-md object-cover"
        />
      ) : (
        <div className="desktop:w-213 desktop:h-244 w-109 h-125 bg-light-grey desktop:rounded-2xl rounded-md" />
      )}
      <div className="desktop:flex-col flex w-full flex-row justify-between">
        <div className="desktop:flex-row desktop:gap-188 flex w-full flex-col justify-between">
          <p className="text_p desktop:w-381 w-222 max-desktop:leading-[1.32]">
            {product.title}
          </p>
          <div className="desktop:contents max-desktop:flex-row max-desktop:w-full max-desktop:justify-between max-desktop:items-end flex">
            <div className="desktop:gap-238 max-desktop:gap-51 flex flex-row">
              {product.size && (
                <p className="text_p text-grey-for-text">
                  Размер {product.size}
                </p>
              )}
              <p className="text_p desktop:text-black text-grey-for-text">
                {formatPrice(product.price)} ₽
              </p>
            </div>
            <div
              className="desktop:hidden"
              onClick={() => removeItem(product.id)}
            >
              <TrashIcon />
            </div>
          </div>
        </div>
        <div
          className="max-desktop:hidden"
          onClick={() => removeItem(product.id)}
        >
          <TrashIcon />
        </div>
      </div>
    </div>
  );
};
