"use client";

import { SearchIcon } from "@/src/shared/icons/SearchIcon";
import { cn } from "@/src/shared/lib/utils/cn";
import YandexMap from "@/src/shared/ui/YandexMap/ui";

import type { DeliveryType } from "../../../model/order.store";
import { AddressGrid } from "../components/AddressGrid/ui";
import { DeliveryZoneSelect } from "../components/DeliveryZoneSelect";
import { PickupFields } from "../components/PickupFields";
import { useAddressBlock } from "../model";

// Береговой проезд 5Ак1
const DEFAULT_COORDS = {
  coordX: 55.755023,
  coordY: 37.509245,
};

export type AddressBlockField = "address" | "date" | "time" | "name" | "phone";

interface AddressBlockErrors {
  address?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
}

interface AddressBlockProps {
  mode?: DeliveryType;
  errors?: AddressBlockErrors;
  // eslint-disable-next-line no-unused-vars
  onFieldChange?: (field: AddressBlockField) => void;
}

export const AddressBlock = ({
  mode = "delivery",
  errors,
  onFieldChange,
}: AddressBlockProps) => {
  const {
    address,
    coords,
    error,
    deliveryZone,
    handleAddressChange,
    setDeliveryZone,
  } = useAddressBlock();

  const mapCoords = coords ?? DEFAULT_COORDS;

  if (mode === "pickup") {
    return (
      <div className="gap-18 flex w-full flex-col">
        <div className="desktop:flex-row desktop:gap-65 pb-30 flex w-full flex-col gap-16 border-b border-[#80808080]">
          <div className="desktop:flex desktop:flex-col desktop:min-w-553 desktop:max-w-553 desktop:justify-between contents w-full">
            <p className="caption desktop:max-w-533 max-desktop:order-1">
              Самовывоз по адресу: г. Москва, Береговой проезд, д.5А, к.1 ТЦ
              Фили Град, -1 этаж
            </p>
            <div className="desktop:gap-18 desktop:flex desktop:flex-col contents">
              <p className="caption desktop:max-w-533 max-desktop:hidden text-grey-for-text">
                Данные получателя
              </p>
              <PickupFields
                className="max-desktop:order-3"
                errors={{
                  name: errors?.name,
                  phone: errors?.phone,
                  date: errors?.date,
                  time: errors?.time,
                }}
                onFieldChange={onFieldChange}
              />
            </div>
          </div>
          <YandexMap
            coordsX={mapCoords.coordX}
            coordsY={mapCoords.coordY}
            zoomLvl={16}
            className="max-desktop:order-2"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="gap-18 flex w-full flex-col">
      <p className="caption text-grey-for-text max-desktop:hidden">
        Выберите адрес доставки
      </p>
      <div className="desktop:flex-row desktop:gap-65 pb-30 flex w-full flex-col gap-16 border-b border-[#80808080]">
        <div className="desktop:flex desktop:flex-col desktop:min-w-553 desktop:max-w-553 desktop:gap-13 contents w-full">
          <div className="max-desktop:order-1 flex w-full flex-col gap-6">
            <div className="relative w-full">
              <SearchIcon className="desktop:left-22 absolute left-16 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={address}
                onChange={e => {
                  handleAddressChange(e);
                  onFieldChange?.("address");
                }}
                placeholder="Введите адрес"
                className={cn(
                  "desktop:rounded-2xl caption py-13 desktop:py-20 desktop:pl-59 desktop:pr-22 ring-none pl-45 bg-light-grey w-full rounded-md pr-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none"
                )}
              />
            </div>
            {error && <p className="caption text-red-500">{error}</p>}
            {errors?.address && (
              <p className="caption text-red-500">{errors.address}</p>
            )}
          </div>
          <AddressGrid
            className="max-desktop:order-3"
            errors={{ date: errors?.date, time: errors?.time }}
            onFieldChange={onFieldChange}
          />
          <DeliveryZoneSelect
            value={deliveryZone}
            onChange={setDeliveryZone}
            className="max-desktop:order-4"
          />
        </div>
        <YandexMap
          coordsX={mapCoords.coordX}
          coordsY={mapCoords.coordY}
          zoomLvl={16}
          className="max-desktop:order-2"
        />
      </div>
    </div>
  );
};
