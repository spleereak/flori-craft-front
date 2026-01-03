import React, { forwardRef } from "react";

import { cn } from "@/src/shared/lib/utils/cn";

import { FormInputProps } from "../types";

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, placeholder, name, type, value, onChange, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "desktop:rounded-2xl caption py-13 desktop:py-19 desktop:px-22 ring-none w-full rounded-md bg-white px-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none",
          className
        )}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);

FormInput.displayName = "FormInput";
