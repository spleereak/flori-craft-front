"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import {
  type Dispatch,
  type MouseEvent,
  type SetStateAction,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { cn } from "@/src/shared/lib/utils/cn";

import { ImagesBlockProps, Thumbnail } from ".";
import { SwipeablePhotoRow } from "./SwipeablePhotoRow";

const LIGHTBOX_SCALE_FOR_SWIPE = 1.02;

/** С `desktop:` в вёрстке (см. `--breakpoint-desktop: 1025px`) */
const MOBILE_PREVIEW_SWIPE_MQ = "(max-width: 1024px)";

const LightboxZoomableCenter = memo(function LightboxZoomableCenter({
  src,
  onZoomedChange,
}: {
  src: string;
  // eslint-disable-next-line no-unused-vars -- сигнатура колбэка
  onZoomedChange: (zoomed: boolean) => void;
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <TransformWrapper
        key={src}
        initialScale={1}
        minScale={1}
        maxScale={5}
        centerOnInit
        limitToBounds
        wheel={{ step: 0.12, smoothStep: 0.0025 }}
        pinch={{ step: 5 }}
        panning={{ disabled: !isZoomed, velocityDisabled: true }}
        doubleClick={{ mode: "toggle", step: 0.55 }}
        onTransformed={(_, state) => {
          const z = state.scale > LIGHTBOX_SCALE_FOR_SWIPE;
          setIsZoomed(prev => {
            if (prev !== z) onZoomedChange(z);
            return z;
          });
        }}
      >
        <TransformComponent
          wrapperClass="!h-full !w-full !max-w-full"
          contentClass="!flex !h-full !w-full !max-w-full !items-center !justify-center"
        >
          <Image
            src={src}
            alt="Изображение товара — увеличенный вид"
            width={1600}
            height={1600}
            className="h-auto max-h-full w-auto max-w-full select-none object-contain"
            sizes="100vw"
            priority
            draggable={false}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
});

const LightboxSwipeablePhoto = memo(function LightboxSwipeablePhoto({
  images,
  activeImage,
  setActiveImage,
}: {
  images: string[];
  activeImage: string;
  setActiveImage: Dispatch<SetStateAction<string>>;
}) {
  const [stripDrag, setStripDrag] = useState(true);
  const onZoomedChange = useCallback((isZoomedNow: boolean) => {
    setStripDrag(!isZoomedNow);
  }, []);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- сброс свайпа при смене кадра (миниатюра во время зума)
    setStripDrag(true);
  }, [activeImage]);

  return (
    <SwipeablePhotoRow
      className="aspect-square max-h-[min(65vh,calc(100vh-220px))] w-full max-w-full"
      images={images}
      activeImage={activeImage}
      setActiveImage={setActiveImage}
      dragEnabled={stripDrag && images.length > 1}
      sideImageClassName="h-full w-full object-cover select-none"
      sizes="100vw"
      priority
      renderCenter={src => (
        <LightboxZoomableCenter
          key={src}
          src={src}
          onZoomedChange={onZoomedChange}
        />
      )}
    />
  );
});

export const ImagesBlock = memo(function ImagesBlock({
  images,
  className,
}: ImagesBlockProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMobilePreviewSwipe, setIsMobilePreviewSwipe] = useState(false);

  const suppressMainImageClickRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_PREVIEW_SWIPE_MQ);
    const sync = () => setIsMobilePreviewSwipe(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

  const handleMainImageClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (suppressMainImageClickRef.current) {
        suppressMainImageClickRef.current = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      openLightbox();
    },
    [openLightbox]
  );

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const mainPreviewSwipeHandlersActive =
    isMobilePreviewSwipe && images.length > 1;

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
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isLightboxOpen}
          aria-label="Открыть изображение крупно"
          className="block h-full w-full cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleMainImageClick}
        >
          <SwipeablePhotoRow
            className="h-full w-full"
            images={images}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            dragEnabled={mainPreviewSwipeHandlersActive}
            sideImageClassName="h-full w-full object-cover select-none"
            centerImageClassName={mainImageClassName}
            sizes="(max-width: 768px) 100vw, 539px"
            priority
            onSwipeGesture={() => {
              suppressMainImageClickRef.current = true;
            }}
          />
        </button>
      </div>
      <div className="hide-scrollbar h-100 desktop:px-0 flex w-full min-w-0 items-center overflow-x-auto overscroll-x-contain scroll-smooth">
        <div className="desktop:ml-auto desktop:mr-0 desktop:gap-14 desktop:px-0 h-74 mr-2 flex w-max flex-row flex-nowrap items-center gap-10 px-16">
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
              <LightboxSwipeablePhoto
                images={images}
                activeImage={activeImage}
                setActiveImage={setActiveImage}
              />
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
                      onClick={() => handleThumbnailClick(image)}
                    />
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
