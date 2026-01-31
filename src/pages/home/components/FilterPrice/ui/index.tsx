"use client";

import React from "react";

import { Input } from "@/src/shared/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/components/ui/popover";
import { RangeSlider } from "@/src/shared/components/ui/range-slider";
import { useMedia } from "@/src/shared/hooks/use-media";
import { ArrowDown } from "@/src/shared/icons/ArrowDown";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

interface FilterPriceProps {
  minPrice: number;
  maxPrice: number;
  prices: PriceProps;
  updatePrice: (name: keyof PriceProps, value: number) => void;
  updatePrices: (newPrices: [number, number]) => void;
}

export const FilterPrice: React.FC<FilterPriceProps> = ({
  minPrice,
  maxPrice,
  prices,
  updatePrice,
  updatePrices,
}) => {
  const { isDesktop } = useMedia();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="desktop:p-21 desktop:rounded-2xl bg-light-grey flex cursor-pointer flex-row items-center justify-center gap-11 rounded-md px-20 py-12">
          <p className="text_p desktop:pr-16 max-h-max border-r border-[#80808059] pr-10">
            Цена
          </p>
          <ArrowDown />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={e => e.preventDefault()}
        className="w-full"
        sideOffset={!isDesktop ? 9 : 24}
        alignOffset={0}
        align="start"
      >
        <div className="desktop:gap-46 gap-33 flex flex-col">
          <div className="desktop:gap-16 flex gap-7">
            <Input
              type="number"
              placeholder={`от ${minPrice}`}
              min={minPrice}
              max={maxPrice}
              value={String(prices.priceFrom)}
              onChange={e => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder={`до ${maxPrice}`}
              min={minPrice}
              max={maxPrice}
              value={String(prices.priceTo)}
              onChange={e => updatePrice("priceTo", Number(e.target.value))}
            />
          </div>

          <RangeSlider
            min={minPrice}
            max={maxPrice}
            step={100}
            value={[prices.priceFrom, prices.priceTo]}
            onValueChange={([from, to]) => updatePrices([from, to])}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
