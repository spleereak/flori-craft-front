"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { memo, useCallback, useEffect, useState } from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

const MOBILE_ZOOM_MQ = "(max-width: 1024px)";

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
        "desktop:size-90 desktop:rounded-2xl size-70 shrink-0 cursor-pointer rounded-md object-cover transition-opacity",
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
  const [pinchZoomEnabled, setPinchZoomEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_ZOOM_MQ);
    const sync = () => setPinchZoomEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const handleThumbnailClick = useCallback((image: string) => {
    setActiveImage(image);
  }, []);

  const mainImageClassName =
    "desktop:size-539 desktop:rounded-2xl h-375 w-full object-cover select-none";

  return (
    <div
      className={cn(
        "desktop:items-end desktop:gap-14 flex w-full min-w-0 flex-col items-start gap-12",
        className
      )}
    >
      <div className="h-375 desktop:size-539 desktop:rounded-2xl relative w-full max-w-full overflow-hidden">
        <TransformWrapper
          key={activeImage}
          disabled={!pinchZoomEnabled}
          initialScale={1}
          minScale={1}
          maxScale={4}
          centerOnInit
          wheel={{ disabled: true }}
          doubleClick={{ disabled: true }}
          panning={{ velocityDisabled: true }}
        >
          <TransformComponent
            wrapperClass="!h-full !w-full !max-w-full"
            contentClass="!h-full !w-full !max-w-full"
          >
            <Image
              src={activeImage}
              alt="Изображение товара"
              width={539}
              height={539}
              priority
              sizes="(max-width: 768px) 100vw, 539px"
              draggable={false}
              className={mainImageClassName}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="hide-scrollbar desktop:px-0 w-full min-w-0 overflow-x-auto overscroll-x-contain scroll-smooth px-16">
        <div className="desktop:ml-auto desktop:gap-14 h-74 flex w-max flex-row flex-nowrap items-center gap-10">
          {images.map(image => (
            <Thumbnail
              key={image}
              image={image}
              isActive={image === activeImage}
              onClick={() => handleThumbnailClick(image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
