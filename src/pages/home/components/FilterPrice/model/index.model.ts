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

  // Debounced версия обновления цен
  const debouncedSetPrices = useMemo(
    () =>
      debounce((newPrices: PriceProps) => {
        setDebouncedPrices(newPrices);
      }, 300), // 300ms задержка
    []
  );

  const updatePrice = useCallback(
    (name: keyof PriceProps, value: number) => {
      setPrices(prev => {
        const updated = {
          ...prev,
          [name]: value,
        };
        debouncedSetPrices(updated);
        return updated;
      });
    },
    [debouncedSetPrices]
  );

  const updatePrices = useCallback(
    (newPrices: [number, number]) => {
      const updated = {
        priceFrom: newPrices[0],
        priceTo: newPrices[1],
      };
      setPrices(updated);
      debouncedSetPrices(updated);
    },
    [debouncedSetPrices]
  );

  return {
    prices, // Мгновенные значения для UI (слайдер)
    debouncedPrices, // Debounced значения для фильтрации
    updatePrices,
    updatePrice,
  };
};
