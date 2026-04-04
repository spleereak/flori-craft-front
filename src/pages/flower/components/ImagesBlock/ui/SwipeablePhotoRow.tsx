"use client";

import { type PanInfo, animate, motion, useMotionValue } from "framer-motion";

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

const COMMIT_FRACTION = 0.18;
const VELOCITY_COMMIT = 300;
const SLIDE_DURATION = 0.32;
const EASE_SLIDE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING_RETURN = {
  type: "spring" as const,
  stiffness: 360,
  damping: 36,
  mass: 0.82,
};

type SwipeablePhotoRowProps = {
  images: string[];
  activeImage: string;
  setActiveImage: Dispatch<SetStateAction<string>>;
  dragEnabled: boolean;
  className?: string;
  sideImageClassName: string;
  centerImageClassName?: string;
  sizes: string;
  // eslint-disable-next-line no-unused-vars -- сигнатура колбэка
  renderCenter?: (centerSrc: string) => ReactNode;
  priority?: boolean;
  onSwipeGesture?: () => void;
};

export function SwipeablePhotoRow({
  images,
  activeImage,
  setActiveImage,
  dragEnabled,
  className,
  sideImageClassName,
  centerImageClassName,
  sizes,
  renderCenter,
  priority,
  onSwipeGesture,
}: SwipeablePhotoRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const stripX = useMotionValue(0);
  const activeIndex = images.indexOf(activeImage);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = Math.round(el.getBoundingClientRect().width);
      setCw(prev => (prev !== w ? w : prev));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (cw > 0) stripX.set(-cw);
  }, [activeImage, cw, stripX]);

  const prevSrc = activeIndex > 0 ? images[activeIndex - 1] : null;
  const nextSrc =
    activeIndex >= 0 && activeIndex < images.length - 1
      ? images[activeIndex + 1]
      : null;

  const handleDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      if (!cw || activeIndex < 0 || images.length < 2) return;

      if (Math.abs(info.offset.x) > 10 || Math.abs(info.velocity.x) > 120) {
        onSwipeGesture?.();
      }

      const rest = -cw;
      const xNow = stripX.get();
      const threshold = cw * COMMIT_FRACTION;

      let commit: "next" | "prev" | null = null;
      if (
        activeIndex < images.length - 1 &&
        (xNow < rest - threshold || info.velocity.x < -VELOCITY_COMMIT)
      ) {
        commit = "next";
      } else if (
        activeIndex > 0 &&
        (xNow > rest + threshold || info.velocity.x > VELOCITY_COMMIT)
      ) {
        commit = "prev";
      }

      if (commit === "next") {
        animate(stripX, -2 * cw, {
          duration: SLIDE_DURATION,
          ease: EASE_SLIDE,
          onComplete: () => {
            setActiveImage(images[activeIndex + 1]!);
            stripX.set(-cw);
          },
        });
      } else if (commit === "prev") {
        animate(stripX, 0, {
          duration: SLIDE_DURATION,
          ease: EASE_SLIDE,
          onComplete: () => {
            setActiveImage(images[activeIndex - 1]!);
            stripX.set(-cw);
          },
        });
      } else {
        animate(stripX, rest, SPRING_RETURN);
      }
    },
    [activeIndex, cw, images, onSwipeGesture, setActiveImage, stripX]
  );

  const canDrag =
    dragEnabled && cw > 0 && images.length > 1 && activeIndex >= 0;

  if (images.length <= 1) {
    return (
      <div
        ref={containerRef}
        className={cn("relative w-full overflow-hidden", className)}
      >
        <div className="h-full w-full">
          {renderCenter ? (
            renderCenter(activeImage)
          ) : (
            <Image
              src={activeImage}
              alt="Изображение товара"
              width={539}
              height={539}
              priority={priority}
              sizes={sizes}
              draggable={false}
              className={cn(
                "h-full w-full select-none object-cover",
                centerImageClassName
              )}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden", className)}
    >
      {cw === 0 ? (
        <div className="h-full w-full">
          {renderCenter ? (
            renderCenter(activeImage)
          ) : (
            <Image
              src={activeImage}
              alt="Изображение товара"
              width={539}
              height={539}
              priority={priority}
              sizes={sizes}
              draggable={false}
              className={cn(
                "h-full w-full select-none object-cover",
                centerImageClassName
              )}
            />
          )}
        </div>
      ) : (
        <motion.div
          className="flex h-full"
          style={{ width: cw * 3, x: stripX }}
          drag={canDrag ? "x" : false}
          dragConstraints={containerRef}
          dragElastic={0.07}
          dragTransition={{ bounceStiffness: 280, bounceDamping: 24 }}
          onDragEnd={handleDragEnd}
        >
          <div
            className="relative h-full shrink-0 overflow-hidden bg-neutral-200"
            style={{ width: cw }}
          >
            {prevSrc ? (
              <Image
                src={prevSrc}
                alt=""
                fill
                className={sideImageClassName}
                sizes={sizes}
                draggable={false}
              />
            ) : null}
          </div>
          <div
            className="relative h-full shrink-0 overflow-hidden"
            style={{ width: cw }}
          >
            {renderCenter ? (
              renderCenter(activeImage)
            ) : (
              <Image
                src={activeImage}
                alt="Изображение товара"
                width={539}
                height={539}
                priority={priority}
                sizes={sizes}
                draggable={false}
                className={cn(
                  "h-full w-full select-none object-cover",
                  centerImageClassName
                )}
              />
            )}
          </div>
          <div
            className="relative h-full shrink-0 overflow-hidden bg-neutral-200"
            style={{ width: cw }}
          >
            {nextSrc ? (
              <Image
                src={nextSrc}
                alt=""
                fill
                className={sideImageClassName}
                sizes={sizes}
                draggable={false}
              />
            ) : null}
          </div>
        </motion.div>
      )}
    </div>
  );
}
