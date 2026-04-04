"use client";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { cn } from "@/src/shared/lib/utils/cn";
import { ImagesBlockProps, Thumbnail } from ".";


export const ImagesBlock = memo(function ImagesBlock({
  images, className,
}: ImagesBlockProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!images.length) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveImage(prev => (images.includes(prev) ? prev : images[0]!));
  }, [images]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen]);

  const handleThumbnailClick = useCallback((image: string) => {
    setActiveImage(image);
  }, []);

  const openLightbox = useCallback(() => {
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const mainImageClassName = "desktop:size-539 desktop:rounded-2xl h-375 w-full object-cover select-none";

  return (
    <div
      className={cn(
        "desktop:items-end desktop:gap-14 flex w-full min-w-0 flex-col items-start gap-12",
        className
      )}
    >
      <div className="h-375 desktop:size-539 desktop:rounded-2xl relative w-full max-w-full overflow-hidden">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isLightboxOpen}
          aria-label="Открыть изображение крупно"
          className="block h-full w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={openLightbox}
        >
          <Image
            src={activeImage}
            alt="Изображение товара"
            width={539}
            height={539}
            priority
            sizes="(max-width: 768px) 100vw, 539px"
            draggable={false}
            className={mainImageClassName} />
        </button>
      </div>
      <div className="hide-scrollbar h-100 desktop:px-0 flex w-full min-w-0 items-center overflow-x-auto overscroll-x-contain scroll-smooth">
        <div className="desktop:ml-auto desktop:mr-0 desktop:gap-14 desktop:px-0 h-74 mr-2 flex w-max flex-row flex-nowrap items-center gap-10 px-16">
          {images.map(image => (
            <Thumbnail
              key={image}
              image={image}
              isActive={image === activeImage}
              onClick={() => handleThumbnailClick(image)} />
          ))}
        </div>
      </div>

      {isLightboxOpen ? (
        <div
          className="z-2500 fixed inset-0 flex cursor-default flex-col bg-black/70 px-16 pb-16 pt-56 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографий товара"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Закрыть"
            className="desktop:right-24 desktop:top-24 absolute right-16 top-16 z-10 flex size-40 cursor-pointer items-center justify-center rounded-full bg-white/90 text-black shadow-md transition-opacity hover:opacity-90 active:opacity-80"
            onClick={e => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <CloseIcon />
          </button>
          <div className="pointer-events-none flex min-h-0 w-full flex-1 flex-col items-center justify-center">
            <div
              className="pointer-events-auto relative flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-square max-h-[min(65vh,calc(100vh-220px))] w-full max-w-full overflow-hidden">
                <TransformWrapper
                  key={activeImage}
                  initialScale={1}
                  minScale={1}
                  maxScale={5}
                  centerOnInit
                  limitToBounds
                  wheel={{ step: 0.12, smoothStep: 0.0025 }}
                  pinch={{ step: 5 }}
                  panning={{ velocityDisabled: true }}
                  doubleClick={{ mode: "toggle", step: 0.55 }}
                >
                  <TransformComponent
                    wrapperClass="!h-full !w-full !max-w-full"
                    contentClass="!flex !h-full !w-full !max-w-full !items-center !justify-center"
                  >
                    <Image
                      src={activeImage}
                      alt="Изображение товара — увеличенный вид"
                      width={1600}
                      height={1600}
                      className="h-auto max-h-full w-auto max-w-full select-none object-contain"
                      sizes="100vw"
                      priority
                      draggable={false} />
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </div>
            <div
              className="hide-scrollbar pointer-events-auto mt-12 w-full max-w-full shrink-0 overflow-x-auto overscroll-x-contain py-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex w-max min-w-full justify-center">
                <div className="flex w-max flex-row flex-nowrap items-center gap-10">
                  {images.map(image => (
                    <Thumbnail
                      key={image}
                      image={image}
                      variant="lightbox"
                      isActive={image === activeImage}
                      onClick={() => handleThumbnailClick(image)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});
