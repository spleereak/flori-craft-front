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
  return (
    <button
      className={cn(
        "desktop:p-21 bg-light-grey desktop:rounded-2xl text_p flex cursor-pointer items-center justify-center rounded-md px-20 py-12 transition-all duration-300 ease-in-out",
        active && "bg-brown text-white",
        !active && "hover:opacity-65",
        className
      )}
      onClick={onClick}
    >
      {tab}
    </button>
  );
};
