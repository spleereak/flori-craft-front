"use client";

import { useState } from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

export const ImagesBlock = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div
      className={cn(
        "desktop:items-end desktop:gap-14 flex flex-col items-start gap-12",
        className
      )}
    >
      <Image
        src={activeImage}
        alt=""
        width={539}
        height={539}
        className="desktop:size-539 desktop:rounded-2xl h-440 w-full object-cover"
      />
      <div className="desktop:gap-14 desktop:px-0 flex flex-row gap-10 px-16">
        {images.map((image, i) => (
          <Image
            src={image}
            key={i}
            alt=""
            width={90}
            height={90}
            className="desktop:size-90 desktop:rounded-2xl size-70 rounded-md object-cover"
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>
    </div>
  );
};
