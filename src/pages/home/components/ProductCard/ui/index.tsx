import React from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";
import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";

import { ProductCardProps } from "../types";

export const ProductCard: React.FC<ProductCardProps> = ({
  className,
  name,
  priceList,
  images,
}) => {
  return (
    <div
      className={cn(
        "desktop:rounded-2xl flex flex-col rounded-md shadow-[-1px_-1px_4px_rgba(3,3,6,0.1),_1px_1px_4px_rgba(3,3,6,0.1)]",
        className
      )}
    >
      {images[0] ? (
        <Image
          src={images[0]}
          alt=""
          width={490}
          height={490}
          className="desktop:h-490 h-168 desktop:rounded-t-2xl w-full rounded-t-md object-cover"
        />
      ) : (
        <div className="bg-light-grey desktop:size-490 size-168 desktop:rounded-t-2xl rounded-t-md" />
      )}
      <div className="desktop:p-24 desktop:gap-38 desktop:rounded-b-2xl flex flex-col gap-12 rounded-b-md bg-white p-6">
        <p className="text_p--switch line-clamp-2">{name}</p>
        <Button appearance="accent">{formatPrice(priceList[0].price)} ₽</Button>
      </div>
    </div>
  );
};
