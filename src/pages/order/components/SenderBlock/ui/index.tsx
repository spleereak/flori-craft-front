"use client";

import { IMaskInput } from "react-imask";

import { ChangeEvent } from "react";

import { FormInput } from "@/src/pages/auth/components/Form/components";
import { cn } from "@/src/shared/lib/utils/cn";

import { useOrderStore } from "../../../model/order.store";

interface SenderBlockProps {
  className?: string;
  errors?: {
    name?: string;
    phone?: string;
  };
  // eslint-disable-next-line no-unused-vars
  onFieldChange?: (field: "name" | "phone") => void;
}

export const SenderBlock = ({
  className,
  errors,
  onFieldChange,
}: SenderBlockProps) => {
  const { sender, setSender } = useOrderStore();

  const handlePhoneChange = (value: string) => {
    setSender({ phone: value });
    onFieldChange?.("phone");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSender({ name: e.target.value });
    onFieldChange?.("name");
  };

  return (
    <div
      className={cn(
        "desktop:gap-18 desktop:max-w-533 flex flex-col gap-12",
        className
      )}
    >
      <p className="caption text-grey-for-text">Ваши данные</p>
      <div className="desktop:gap-13 flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <FormInput
            className="bg-light-grey"
            placeholder="Имя"
            type="text"
            name="name"
            value={sender.name}
            onChange={handleNameChange}
          />
          {errors?.name && (
            <p className="caption text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <IMaskInput
            mask="+{7} (000) 000-00-00"
            value={sender.phone}
            onAccept={(value: string) => handlePhoneChange(value)}
            className={cn(
              "desktop:rounded-2xl caption py-13 desktop:py-20 desktop:px-22 ring-none bg-light-grey w-full rounded-md px-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none"
            )}
            placeholder="Номер телефона"
          />
          {errors?.phone && (
            <p className="caption text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
