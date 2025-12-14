import React from "react";

import Image from "next/image";

import { TrashIcon } from "@/src/shared/icons/TrashIcon";
import { cn } from "@/src/shared/lib/utils/cn";
import { formatPrice } from "@/src/shared/lib/utils/helpers";

import { CartItemProps } from "../types";

export const CartItem: React.FC<CartItemProps> = ({ className, product }) => {
  return (
    <div
      className={cn(
        "desktop:gap-44 desktop:h-274 h-145 flex w-full flex-row gap-12",
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
      <div className="desktop:flex-col flex flex-row justify-between">
        <div className="desktop:flex-row desktop:gap-188 desktop:justify-start desktop:w-max flex w-full flex-col justify-between">
          <p className="p desktop:max-w-381 max-w-222 max-desktop:leading-[1.32]">
            {product.name}
          </p>
          <div className="desktop:contents max-desktop:flex-row max-desktop:w-full max-desktop:items-end flex">
            <div className="desktop:gap-238 max-desktop:justify-between max-desktop:w-full max-desktop:mr-25 flex flex-row">
              <p className="p text-grey-for-text">Размер {product.size}</p>
              <p className="p desktop:text-black text-grey-for-text">
                {formatPrice(product.price)} ₽
              </p>
            </div>
            <TrashIcon className="desktop:hidden" />
          </div>
        </div>
        <TrashIcon className="max-desktop:hidden" />
      </div>
    </div>
  );
};
