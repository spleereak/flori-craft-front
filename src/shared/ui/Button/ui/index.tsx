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
        "desktop:rounded-2xl flex items-center justify-center rounded-md transition-all duration-300 ease-in-out",
        appearance === "primary" &&
          "desktop:w-491 desktop:h-82 bg-brown p w-238 h-41 text-white hover:opacity-80",
        appearance === "outline" &&
          "border-brown desktop:w-491 desktop:h-82 p background-transparent w-238 h-41 border-2 text-black hover:opacity-80",
        appearance === "accent" &&
          "desktop:w-234 desktop:h-66 bg-light-grey h3 hover:bg-brown w-156 h-33 text-black hover:text-white",
        disabled && "pointer-events-none opacity-30",
        className
      )}
    >
      {children}
    </button>
  );
};
