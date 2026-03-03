import { cn } from "@/src/shared/lib/utils/cn";

import type { DeliveryType } from "../../../model/order.store";

interface DeliveryTypeTabsProps {
  className?: string;
  activeType: DeliveryType;
  onDeliveryClick: () => void;
  onPickupClick: () => void;
}

export const DeliveryTypeTabs = ({
  className,
  activeType,
  onDeliveryClick,
  onPickupClick,
}: DeliveryTypeTabsProps) => {
  return (
    <div
      className={cn(
        "max-desktop:mx-auto max-desktop:max-w-max flex w-full flex-row",
        className
      )}
    >
      <div
        className={cn(
          "desktop:h-44 desktop:pb-11 desktop:w-366 h-25 w-130 flex cursor-pointer justify-center border-b border-[#80808080] pb-6 transition-all duration-300 ease-in-out",
          activeType === "delivery" && "border-brown"
        )}
        onClick={onDeliveryClick}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onDeliveryClick();
          }
        }}
        role="tab"
        tabIndex={0}
        aria-selected={activeType === "delivery"}
      >
        <p className="text_p max-w-max">Доставка</p>
      </div>
      <div
        className={cn(
          "desktop:h-44 desktop:pb-11 desktop:w-366 h-25 w-130 flex cursor-pointer justify-center border-b border-[#80808080] pb-6 transition-all duration-300 ease-in-out",
          activeType === "pickup" && "border-brown"
        )}
        onClick={onPickupClick}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPickupClick();
          }
        }}
        role="tab"
        tabIndex={0}
        aria-selected={activeType === "pickup"}
      >
        <p className="text_p max-w-max">Самовывоз</p>
      </div>
    </div>
  );
};
