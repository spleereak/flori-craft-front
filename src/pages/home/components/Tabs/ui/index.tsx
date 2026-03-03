"use client";

import React, { useRef, useState } from "react";

import { cn } from "@/src/shared/lib/utils/cn";
import { TabButton } from "@/src/shared/ui/TabButton";

import { FilterPrice } from "../../FilterPrice/ui";
import { TabsProps } from "../types";

const DRAG_THRESHOLD_PX = 5;

export const Tabs: React.FC<TabsProps> = ({
  className,
  categories,
  activeTab,
  onSelect,
  minPrice,
  maxPrice,
  prices,
  updatePrice,
  updatePrices,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const didDragRef = useRef(false);

  const handleClick = (id: string) => {
    if (didDragRef.current) return;
    onSelect?.(id);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = scrollRef.current;
    if (!el) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) >= DRAG_THRESHOLD_PX) didDragRef.current = true;
    el.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrLeave);
    window.addEventListener("mouseleave", onMouseUpOrLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrLeave);
      window.removeEventListener("mouseleave", onMouseUpOrLeave);
    };
  }, [isDragging]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const onCaptureClick = (e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "desktop:gap-28 desktop:top-142 top-74 z-5 hide-scrollbar desktop:py-30 desktop:px-90 sticky flex w-full flex-row gap-10 overflow-x-auto whitespace-nowrap bg-white px-16 py-20",
        isDragging && "cursor-grabbing select-none",
        !isDragging && "cursor-grab",
        className
      )}
      onMouseDown={onMouseDown}
      onClickCapture={onCaptureClick}
      style={{ scrollBehavior: isDragging ? "auto" : undefined }}
    >
      <FilterPrice
        minPrice={minPrice}
        maxPrice={maxPrice}
        prices={prices}
        updatePrice={updatePrice}
        updatePrices={updatePrices}
      />
      {categories.map(category => (
        <TabButton
          key={category.name}
          tab={category.name}
          active={activeTab === category.name}
          onClick={() => handleClick(category.name)}
        />
      ))}
    </div>
  );
};
