"use client";

import React from "react";

import { cn } from "@/src/shared/lib/utils/cn";

import { TabButtonProps } from "../types/props";

export const TabButton: React.FC<TabButtonProps> = ({
  className,
  tab,
  onClick,
  active,
}) => {
  const [isActive, setIsActive] = React.useState(active);

  const handleChange = () => {
    setIsActive(!isActive);
    onClick?.(tab);
  };

  return (
    <button
      className={cn(
        "desktop:p-21 bg-light-grey flex cursor-pointer items-center justify-center rounded-2xl rounded-md px-20 py-12 transition-all duration-300 ease-in-out",
        isActive && "bg-brown text-white",
        !isActive && "hover:opacity-65",
        className
      )}
      onClick={handleChange}
    >
      {tab}
    </button>
  );
};
