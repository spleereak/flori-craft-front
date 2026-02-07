"use client";

import { IMaskInput } from "react-imask";

import { ChangeEvent, useEffect } from "react";

import { FormInput } from "@/src/pages/auth/components/Form/components";
import { Switch } from "@/src/shared/components/ui/switch";
import { cn } from "@/src/shared/lib/utils/cn";

import { useOrderStore } from "../../../model/order.store";

interface RecipientBlockProps {
  className?: string;
  isAuth: boolean;
  userData?: {
    name: string;
    phone: string;
  };
  errors?: {
    name?: string;
    phone?: string;
  };
  // eslint-disable-next-line no-unused-vars
  onFieldChange?: (field: "name" | "phone") => void;
}

export const RecipientBlock = ({
  className,
  isAuth,
  userData,
  errors,
  onFieldChange,
}: RecipientBlockProps) => {
  const {
    sender,
    recipient,
    isSameAsSource,
    setRecipient,
    setIsSameAsSource,
    fillRecipientFromSender,
    fillRecipientFromUser,
  } = useOrderStore();

  const isSenderFilled = sender.name.trim() !== "" && sender.phone.length >= 11;
  const isUserDataFilled = userData?.name && userData?.phone;

  const isSwitchDisabled = isAuth ? !isUserDataFilled : !isSenderFilled;

  const handleSwitchChange = (checked: boolean) => {
    setIsSameAsSource(checked);

    if (checked) {
      if (isAuth && userData) {
        fillRecipientFromUser(userData);
      } else {
        fillRecipientFromSender();
      }
    } else {
      setRecipient({ name: "", phone: "" });
    }
  };

  useEffect(() => {
    if (isSameAsSource) {
      if (isAuth && userData) {
        fillRecipientFromUser(userData);
      } else {
        fillRecipientFromSender();
      }
    }
  }, [
    sender,
    userData,
    isAuth,
    isSameAsSource,
    fillRecipientFromSender,
    fillRecipientFromUser,
  ]);

  const handlePhoneChange = (value: string) => {
    if (!isSameAsSource) {
      setRecipient({ phone: value });
      onFieldChange?.("phone");
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isSameAsSource) {
      setRecipient({ name: e.target.value });
      onFieldChange?.("name");
    }
  };

  return (
    <div
      className={cn(
        "desktop:gap-18 desktop:max-w-533 flex flex-col gap-12",
        className
      )}
    >
      <p className="caption text-grey-for-text">Данные получателя</p>
      <div className="desktop:gap-13 flex flex-col gap-7">
        {!isSameAsSource && (
          <>
            <div className="flex flex-col gap-2">
              <FormInput
                className="bg-light-grey"
                placeholder="Имя"
                type="text"
                name="recipientName"
                value={recipient.name}
                onChange={handleNameChange}
              />
              {errors?.name && (
                <p className="caption text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <IMaskInput
                mask="+{7} (000) 000-00-00"
                value={recipient.phone}
                onAccept={(value: string) => handlePhoneChange(value)}
                className="desktop:rounded-2xl caption py-13 desktop:py-20 desktop:px-22 ring-none bg-light-grey w-full rounded-md px-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none"
                placeholder="Номер телефона"
              />
              {errors?.phone && (
                <p className="caption text-red-500">{errors.phone}</p>
              )}
            </div>
          </>
        )}
        <div className="gap-19 flex flex-row items-center">
          <Switch
            checked={isSameAsSource}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchDisabled}
            className="desktop:w-52 desktop:h-32 w-33 h-20"
          />
          <p className="caption text-grey-for-text">Получатель - вы</p>
        </div>
      </div>
    </div>
  );
};
