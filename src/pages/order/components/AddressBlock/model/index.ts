import { useEffect, useRef, useState } from "react";

import {
  Coordinates,
  getCoordsByAddress,
} from "@/src/shared/lib/utils/geocoder";

import { useOrderStore } from "../../../model/order.store";

export const useAddressBlock = () => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { delivery, deliveryZone, setDelivery, setDeliveryZone } =
    useOrderStore();
  // eslint-disable-next-line no-undef
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const address = delivery.fullAddress;

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!address.trim()) {
      setCoords(null);
      setError(null);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCoordsByAddress(address);
        setCoords(result);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setCoords(null);
        setError("Не удалось найти адрес");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [address]);

  // eslint-disable-next-line no-undef
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelivery({ fullAddress: e.target.value });
  };

  return {
    address,
    coords,
    error,
    deliveryZone,
    isLoading,
    handleAddressChange,
    setDeliveryZone,
  };
};
