"use client";

import { memo } from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

export interface ImagesBlockProps {
  images: string[];
  className?: string;
}

export const Thumbnail = memo(function Thumbnail({
  image,
  isActive,
  onClick,
  variant = "default",
}: {
  image: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "default" | "lightbox";
}) {
  const activeRing =
    variant === "lightbox"
      ? "ring-2 ring-inset ring-white"
      : "ring-2 ring-inset ring-black";

  return (
    <Image
      src={image}
      alt="Миниатюра"
      width={90}
      height={90}
      loading="lazy"
      sizes="(max-width: 768px) 70px, 90px"
      className={cn(
        "desktop:size-90 desktop:rounded-2xl size-70 shrink-0 cursor-pointer rounded-md object-cover transition-opacity",
        isActive ? activeRing : "opacity-70 hover:opacity-100"
      )}
      onClick={onClick}
    />
  );
});
