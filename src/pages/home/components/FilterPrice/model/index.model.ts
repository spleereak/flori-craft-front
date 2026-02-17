/* eslint-disable no-unused-vars */
import React, { useCallback, useMemo } from "react";

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export const usePrice = ({
  priceMin = 0,
  priceMax = 100000,
}: {
  priceMin?: number;
  priceMax?: number;
} = {}) => {
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: priceMin,
    priceTo: priceMax,
  });

  const [debouncedPrices, setDebouncedPrices] = React.useState<PriceProps>({
    priceFrom: priceMin,
    priceTo: priceMax,
  });

  const debouncedSetPrices = useMemo(
    () =>
      debounce((newPrices: PriceProps) => {
        setDebouncedPrices(newPrices);
      }, 300),
    []
  );

  const updatePrice = useCallback(
    (name: keyof PriceProps, value: number) => {
      const num = Number.isFinite(value)
        ? value
        : name === "priceFrom"
          ? priceMin
          : priceMax;
      setPrices(prev => {
        let from = prev.priceFrom;
        let to = prev.priceTo;
        if (name === "priceFrom") {
          from = Math.max(
            priceMin,
            Math.min(prev.priceTo, Math.min(priceMax, num))
          );
        } else {
          to = Math.min(
            priceMax,
            Math.max(prev.priceFrom, Math.max(priceMin, num))
          );
        }
        const updated = { priceFrom: from, priceTo: to };
        debouncedSetPrices(updated);
        return updated;
      });
    },
    [debouncedSetPrices, priceMin, priceMax]
  );

  const updatePrices = useCallback(
    (newPrices: [number, number]) => {
      const a = Math.max(priceMin, Math.min(priceMax, newPrices[0]));
      const b = Math.max(priceMin, Math.min(priceMax, newPrices[1]));
      const updated = {
        priceFrom: Math.min(a, b),
        priceTo: Math.max(a, b),
      };
      setPrices(updated);
      debouncedSetPrices(updated);
    },
    [debouncedSetPrices, priceMin, priceMax]
  );

  return {
    prices,
    debouncedPrices,
    updatePrices,
    updatePrice,
  };
};
