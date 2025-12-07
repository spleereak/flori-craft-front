import React, { PropsWithChildren } from "react";

import { cn } from "@/src/utils/cn";

import { ButtonProps } from "../types/types";

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  className,
  appearance = "primary",
  disabled = false,
  children,
}) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-2xl transition-all duration-300 ease-in-out",
        appearance === "primary" &&
          "w-491 h-82 bg-brown p text-white hover:opacity-80",
        appearance === "outline" &&
          "border-brown w-491 h-82 p background-transparent border-2 text-black hover:opacity-80",
        appearance === "accent" &&
          "w-234 h-66 bg-light-grey h3 hover:bg-brown text-black hover:text-white",
        disabled && "pointer-events-none opacity-30",
        className
      )}
    >
      {children}
    </button>
  );
};
