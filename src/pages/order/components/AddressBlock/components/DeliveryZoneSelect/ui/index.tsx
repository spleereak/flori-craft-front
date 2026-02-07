import React, { ChangeEvent } from "react";

import { DeliveryZoneType } from "@/src/pages/order/model/order.store";
import { cn } from "@/src/shared/lib/utils/cn";

import { DeliveryZoneSelectProps } from "../types";

const DELIVERY_ZONES: { value: DeliveryZoneType; label: string; price?: string }[] = [
  { value: "JK", label: "ЖК ФилиГрад, ЖК Онли, ЖК Береговой ", price: "350 ₽" },
  { value: "FILI", label: "Район Фили ", price: "750 ₽" },
  { value: "MKAD", label: "В пределах МКАД ", price: "1200 ₽" },
  {
    value: "NMKAD",
    label:
      "За МКАД - индивидульно (с вами свяжется менеджер и пришлет дополнительную ссылку для оплаты доставки)",
  },
];

export const DeliveryZoneSelect: React.FC<DeliveryZoneSelectProps> = ({
  className,
  value,
  onChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value as DeliveryZoneType);

  return (
    <div
      className={cn(
        "desktop:gap-25 gap-15 desktop:pt-15 flex flex-col pt-5",
        className
      )}
    >
      {DELIVERY_ZONES.map(zone => (
        <label
          key={zone.value}
          className="desktop:gap-15 flex cursor-pointer flex-row items-center gap-10"
        >
          <input
            type="radio"
            name="deliveryZone"
            value={zone.value}
            checked={value === zone.value}
            onChange={handleChange}
            className="peer hidden"
          />
          <div className="desktop:min-w-28! desktop:max-w-28! desktop:min-h-28! desktop:max-h-28! min-w-20! max-w-20! min-h-20! max-h-20! border-brown peer-checked:bg-brown flex items-center justify-center rounded-full border text-white transition-all peer-checked:[&>svg]:opacity-100">
            <svg
              viewBox="0 0 14 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="desktop:h-10 desktop:w-14 h-7 w-10 text-white opacity-0 transition-opacity"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.6543 0.388672C14.1322 0.888973 14.1121 1.68017 13.6096 2.15587L5.68628 9.65588C5.4446 9.88465 5.12142 10.0083 4.78804 9.99957C4.45466 9.99083 4.13847 9.85041 3.90921 9.60929L0.343726 5.8593C-0.132974 5.35793 -0.111153 4.56678 0.392465 4.09221C0.896083 3.61763 1.69079 3.63936 2.16749 4.14073L4.86789 6.98087L11.8792 0.344125C12.3817 -0.131573 13.1765 -0.111628 13.6543 0.388672Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="text-grey-for-text flex flex-row items-center">
            <p className="caption">
              {zone.label}
              {""}
            </p>
            {zone.price && <span className="caption"> — {zone.price}</span>}
          </div>
        </label>
      ))}
    </div>
  );
};
