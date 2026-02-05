"use client";

import { memo, useCallback, useState } from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

interface ImagesBlockProps {
  images: string[];
  className?: string;
}

const Thumbnail = memo(function Thumbnail({
  image,
  isActive,
  onClick,
}: {
  image: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <Image
      src={image}
      alt="Миниатюра"
      width={90}
      height={90}
      loading="lazy"
      sizes="(max-width: 768px) 70px, 90px"
      className={cn(
        "desktop:size-90 desktop:rounded-2xl size-70 cursor-pointer rounded-md object-cover transition-opacity",
        isActive ? "ring-2 ring-black" : "opacity-70 hover:opacity-100"
      )}
      onClick={onClick}
    />
  );
});

export const ImagesBlock = memo(function ImagesBlock({
  images,
  className,
}: ImagesBlockProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleThumbnailClick = useCallback((image: string) => {
    setActiveImage(image);
  }, []);

  return (
    <div
      className={cn(
        "desktop:items-end desktop:gap-14 flex flex-col items-start gap-12",
        className
      )}
    >
      <Image
        src={activeImage}
        alt="Изображение товара"
        width={539}
        height={539}
        priority
        sizes="(max-width: 768px) 100vw, 539px"
        className="desktop:size-539 desktop:rounded-2xl h-440 w-full object-cover"
      />
      <div className="desktop:gap-14 desktop:px-0 flex flex-row gap-10 px-16">
        {images.map((image) => (
          <Thumbnail
            key={image}
            image={image}
            isActive={image === activeImage}
            onClick={() => handleThumbnailClick(image)}
          />
        ))}
      </div>
    </div>
  );
});
