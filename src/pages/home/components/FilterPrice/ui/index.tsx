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
  priceFrom?: number;
  priceTo?: number;
}

export const FilterPrice = () => {
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: undefined,
    priceTo: undefined,
  });

  const { isDesktop } = useMedia();

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePrices = (prices: [number, number]) => {
    updatePrice("priceFrom", prices[0]);
    updatePrice("priceTo", prices[1]);
  };

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
              placeholder="от 0"
              min={0}
              max={60000}
              value={String(prices.priceFrom) || 0}
              onChange={e => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              placeholder="до 60000"
              min={1000}
              max={60000}
              value={String(prices.priceTo) || 60000}
              onChange={e => updatePrice("priceTo", Number(e.target.value))}
            />
          </div>

          <RangeSlider
            min={0}
            max={60000}
            step={100}
            value={[prices.priceFrom || 0, prices.priceTo || 60000]}
            onValueChange={([from, to]) => updatePrices([from, to])}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
