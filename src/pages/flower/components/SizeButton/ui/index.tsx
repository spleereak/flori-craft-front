import React from "react";

import { cn } from "@/src/shared/lib/utils/cn";

export const SizeButton = ({
  className,
  active,
  children,
  onClick,
}: {
  className?: string;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className={cn(
        "text-grey-for-text p desktop:w-58 desktop:h-35 w-41 h-25 bg-light-grey flex items-center justify-center rounded-2xl transition-all duration-300 ease-in-out",
        active && "bg-brown text-white",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
