"use client";

import { useEffect } from "react";

import { useCartStore } from "@/src/entities/cart/model/cart.store";

export const useCartHydration = () => {
  const hydrate = useCartStore(state => state.hydrate);
  const isHydrated = useCartStore(state => state.isHydrated);

  useEffect(() => {
    if (!isHydrated) {
      hydrate();
    }
  }, [isHydrated, hydrate]);
};
