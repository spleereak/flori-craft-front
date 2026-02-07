import { CartItem } from "@/src/pages/cart/components/CartItem/ui";
import { cn } from "@/src/shared/lib/utils/cn";

import { CartBlockProps } from "../types";

export const CartBlock = ({ items, className, error }: CartBlockProps) => {
  return (
    <div
      className={cn(
        "desktop:gap-30 desktop:max-w-1222 flex w-full flex-col",
        className
      )}
    >
      {error && <p className="caption text-red-500">{error}</p>}
      <div className="desktop:flex pb-26 hidden w-full flex-row border-b border-[#80808080]">
        <p className="caption text-grey-for-text">Наименование</p>
        <p className="caption text-grey-for-text pl-660">Размер</p>
        <p className="caption text-grey-for-text pl-303">Цена</p>
      </div>
      <div className="desktop:gap-30 flex w-full flex-col gap-20">
        {items.map(item => {
          const product = {
            product_id: item.product_id,
            title: item.title,
            image: item.image,
            size: item.size,
            price: item.price,
          };
          return (
            <CartItem
              product={product}
              className="desktop:pb-30 border-b border-[#80808080] pb-20"
              key={item.product_id + item.size}
              type="order"
            />
          );
        })}
      </div>
    </div>
  );
};
