import React from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";
import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";

import { getMinimumCardPrice } from "../lib/cardPrice";
import { ProductCardProps } from "../types";

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  variants,
  image_urls,
  showFromPrice,
}) => {
  const visiblePrice = getMinimumCardPrice(price, variants);

  return (
    <div
      className={cn(
        "desktop:rounded-2xl flex flex-col rounded-md shadow-[-1px_-1px_4px_rgba(3,3,6,0.1),1px_1px_4px_rgba(3,3,6,0.1)]"
      )}
    >
      {image_urls[0] ? (
        <Image
          src={image_urls[0]}
          alt={title}
          width={490}
          height={490}
          loading="lazy"
          sizes="(max-width: 768px) 168px, 490px"
          className="desktop:h-490 h-168 desktop:rounded-t-2xl w-full rounded-t-md object-cover"
        />
      ) : (
        <div className="desktop:size-490 size-168 desktop:rounded-t-2xl rounded-t-md bg-[#D9D9D9]" />
      )}
      <div className="desktop:p-24 desktop:h-218 desktop:rounded-b-2xl h-78 flex flex-col justify-between rounded-b-md bg-white p-6">
        <p className="text_p--switch line-clamp-2">{title}</p>
        <Button appearance="accent">
          {visiblePrice !== null
            ? `${showFromPrice ? "от " : ""}${formatPrice(visiblePrice)} ₽`
            : "Уточнить цену"}
        </Button>
      </div>
    </div>
  );
};
