import { IMaskInput } from "react-imask";

import React from "react";

import { cn } from "@/src/shared/lib/utils/cn";
import { Button } from "@/src/shared/ui";
import { Checkbox } from "@/src/shared/ui/Checkbox";

import { FormInput, Select } from "../components";
import { useForm } from "../model";
import { FormProps } from "../types";

export const Form: React.FC<FormProps> = ({ mode }) => {
  const {
    handleChangeGender,
    handleCheckboxChange,
    handleNameChange,
    handlePhoneChange,
    handleSubmit,
    formData,
    errors,
  } = useForm({ mode });

  return (
    <form
      className={cn(
        "bg-light-grey desktop:max-w-732 desktop:p-45 w-full rounded-2xl p-16"
      )}
      onSubmit={handleSubmit}
    >
      <h3 className="h3 desktop:mb-44 mb-20">
        {mode === "register" ? "Регистрация" : "Вход"}
      </h3>
      <div className="desktop:gap-20 desktop:mb-24 mb-14 flex flex-col gap-8">
        <p className="caption text-grey-for-text">Введите ваши данные</p>
        <IMaskInput
          mask="+{7} (000) 000-00-00"
          value={formData.phone}
          onAccept={(value: string) => handlePhoneChange(value)}
          className={cn(
            "desktop:rounded-2xl caption py-13 desktop:py-20 desktop:px-22 ring-none w-full rounded-md bg-white px-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none",
            errors.phone && "placeholder:text-red border-red border-2"
          )}
          placeholder="Номер телефона"
        />
      </div>
      {mode === "register" && (
        <div className="gap-26 desktop:gap-40 desktop:mb-40 mb-16 flex flex-col">
          <FormInput
            className={
              errors.name ? "placeholder:text-red border-red border-2" : ""
            }
            placeholder="Имя"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
          />
          <Select value={formData.gender} onChange={handleChangeGender} />
        </div>
      )}
      <div className="desktop:flex-col desktop:gap-25 flex flex-col-reverse gap-20">
        <div className="flex flex-col gap-10">
          <Button type="submit" className="desktop:h-66 !w-full max-w-none">
            Получить смс с кодом
          </Button>
          {errors.agreedToPolicy && (
            <p className="caption text-red">
              Примите согласие с обработкай данных
            </p>
          )}
        </div>
        <div className="desktop:gap-15 gap-18 flex flex-col">
          <p className="caption text-grey-for-text">
            Авторизуясь на сайте, я подтверждаю согласие с политикой
            конфиденциальности
          </p>
          <div className="desktop:gap-12 flex flex-row items-center gap-10">
            <Checkbox
              checked={formData.agreedToPolicy}
              onChange={handleCheckboxChange}
            />
            <p className="caption text-grey-for-text">
              Я даю согласие на обработку персональных данных
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
