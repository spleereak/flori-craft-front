"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/src/shared/lib/utils/cn";
import { TabButton } from "@/src/shared/ui/TabButton";

import { TabsProps } from "../types";

const DRAG_THRESHOLD_PX = 5;
const TAB_SCROLL_VIEWPORT_INSET_LEFT_PX = 16;
const MOBILE_ACTIVE_TAB_INSET_LEFT_PX = 18;
const MOBILE_STICKY_APPEAR_TOP_PX = 110;

export type TabsRef = {
  // eslint-disable-next-line no-unused-vars
  scrollCategoryTabIntoView: (categoryName: string) => void;
};

export const Tabs = forwardRef<TabsRef, TabsProps>(function Tabs(
  { className, categories, activeTab, onSelect },
  ref
) {
  const desktopStickyRowRef = useRef<HTMLDivElement>(null);
  const mobileStickyRowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isStickyRowVisibleOnMobile, setIsStickyRowVisibleOnMobile] =
    useState(false);
  const pendingMobileAlignTabRef = useRef<string | null>(null);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const didDragRef = useRef(false);

  const scrollTabIntoView = useCallback(
    (
      root: HTMLDivElement | null,
      categoryName: string,
      insetLeftPx: number
    ) => {
      if (!root || !categoryName) return;
      const el = root.querySelector(
        `[data-floricraft-tab="${CSS.escape(categoryName)}"]`
      );
      if (!(el instanceof HTMLElement)) return;

      const tabLeft = el.getBoundingClientRect().left;
      const delta = tabLeft - insetLeftPx;
      const maxScroll = Math.max(0, root.scrollWidth - root.clientWidth);
      const nextScrollLeft = Math.min(
        maxScroll,
        Math.max(0, root.scrollLeft + delta)
      );
      root.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollCategoryTabIntoView: (categoryName: string) => {
        const root =
          window.innerWidth >= 1280
            ? desktopStickyRowRef.current
            : mobileStickyRowRef.current;
        scrollTabIntoView(
          root,
          categoryName,
          window.innerWidth >= 1280
            ? TAB_SCROLL_VIEWPORT_INSET_LEFT_PX
            : MOBILE_ACTIVE_TAB_INSET_LEFT_PX
        );
      },
    }),
    [scrollTabIntoView]
  );

  const handleClick = (id: string) => {
    if (didDragRef.current) return;

    if (window.innerWidth < 1280) {
      pendingMobileAlignTabRef.current = id;

      if (isStickyRowVisibleOnMobile) {
        scrollTabIntoView(
          mobileStickyRowRef.current,
          id,
          MOBILE_ACTIVE_TAB_INSET_LEFT_PX
        );
      }
    }

    onSelect?.(id);
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const el = desktopStickyRowRef.current;
      if (!el) return;
      const dx = e.clientX - dragStart.current.x;
      if (Math.abs(dx) >= DRAG_THRESHOLD_PX) didDragRef.current = true;
      el.scrollLeft = dragStart.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const onMouseUpOrLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth < 1280) return;
    if (e.button !== 0) return;
    const el = desktopStickyRowRef.current;
    if (!el) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
  };

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrLeave);
    window.addEventListener("mouseleave", onMouseUpOrLeave);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrLeave);
      window.removeEventListener("mouseleave", onMouseUpOrLeave);
    };
  }, [isDragging, onMouseMove, onMouseUpOrLeave]);

  useEffect(() => {
    const el = desktopStickyRowRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1280) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const checkStickyVisibility = () => {
      if (window.innerWidth >= 1280) {
        setIsStickyRowVisibleOnMobile(false);
        return;
      }

      const firstCategoryTitle = document.querySelector<HTMLElement>(
        '[data-first-category-title="true"]'
      );
      if (!firstCategoryTitle) {
        setIsStickyRowVisibleOnMobile(false);
        return;
      }

      setIsStickyRowVisibleOnMobile(
        firstCategoryTitle.getBoundingClientRect().top <=
          MOBILE_STICKY_APPEAR_TOP_PX
      );
    };

    checkStickyVisibility();
    window.addEventListener("scroll", checkStickyVisibility, { passive: true });
    window.addEventListener("resize", checkStickyVisibility);

    return () => {
      window.removeEventListener("scroll", checkStickyVisibility);
      window.removeEventListener("resize", checkStickyVisibility);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1280) return;
    if (!isStickyRowVisibleOnMobile) return;
    if (!pendingMobileAlignTabRef.current) return;

    requestAnimationFrame(() => {
      scrollTabIntoView(
        mobileStickyRowRef.current,
        pendingMobileAlignTabRef.current ?? "",
        MOBILE_ACTIVE_TAB_INSET_LEFT_PX
      );
      pendingMobileAlignTabRef.current = null;
    });
  }, [isStickyRowVisibleOnMobile, scrollTabIntoView]);

  const onCaptureClick = (e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  const tabButtons = categories.map(category => (
    <TabButton
      key={category.name}
      tab={category.name}
      active={activeTab === category.name}
      onClick={() => handleClick(category.name)}
    />
  ));

  return (
    <div
      className={cn(
        "desktop:top-142 desktop:z-30 desktop:sticky desktop:self-stretch relative w-full",
        className
      )}
    >
      <div className="desktop:hidden flex w-full flex-wrap justify-center gap-10 overflow-visible whitespace-normal bg-white px-16 py-20">
        {tabButtons}
      </div>

      <div
        ref={desktopStickyRowRef}
        className={cn(
          "hide-scrollbar desktop:gap-28 px-90 py-30 desktop:flex hidden w-full flex-row justify-start overflow-x-auto whitespace-nowrap bg-white",
          isDragging && "desktop:cursor-grabbing desktop:select-none",
          !isDragging && "desktop:cursor-grab"
        )}
        onMouseDown={onMouseDown}
        onClickCapture={onCaptureClick}
        style={{ scrollBehavior: isDragging ? "auto" : undefined }}
      >
        {tabButtons}
      </div>

      <div
        ref={mobileStickyRowRef}
        className={cn(
          "desktop:hidden hide-scrollbar gap-10",
          "top-74 duration-420 fixed left-0 right-0 z-30 flex w-full flex-nowrap overflow-x-auto whitespace-nowrap bg-white/90 px-16 py-16 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform ease-out",
          isStickyRowVisibleOnMobile
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        )}
      >
        {tabButtons}
      </div>
    </div>
  );
});

Tabs.displayName = "Tabs";
