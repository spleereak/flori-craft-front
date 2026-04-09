"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { CategoriesProducts } from "@/src/entities/products/api";
import { consumeHomeScrollRestore } from "@/src/shared/lib/home-scroll-restore";

import { Hero } from "../../Hero";
import { I_Hero } from "../../Hero/props";
import { ProductsList } from "../../ProductsList/ui";
import { Tabs, type TabsRef } from "../../Tabs/ui";

function getCategoryAtViewportCenter(
  sections: Record<string, HTMLDivElement | null>
): string | null {
  const mid = window.innerHeight / 2;
  for (const [id, el] of Object.entries(sections)) {
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) {
      return id;
    }
  }
  return null;
}

export function HomeClient({
  catalog,
  hero_data,
}: {
  catalog: CategoriesProducts[];
  hero_data?: Omit<I_Hero, "className">;
}) {
  const [activeTab, setActiveTab] = useState<string>(catalog[0]?.name || "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<TabsRef>(null);
  const activeTabLockRef = useRef<string | null>(null);
  const activeTabLockTimeoutRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    const result = consumeHomeScrollRestore();
    if (result.kind === "none") {
      return;
    }
    const top = result.kind === "position" ? result.y : 0;
    window.scrollTo({ top, left: 0, behavior: "auto" });

    if (result.kind !== "position") {
      return;
    }

    const category =
      result.categoryName ?? getCategoryAtViewportCenter(sectionRefs.current);

    if (!category) {
      return;
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tabsRef.current?.scrollCategoryTabIntoView(category);
      });
    });
  }, []);

  const scrollToCategory = (id: string) => {
    const target = sectionRefs.current[id];
    if (!target) return;

    const firstCategoryName = filteredCatalog[0]?.name;
    if (id === firstCategoryName) {
      const y = window.scrollY + target.getBoundingClientRect().top - 110;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleTabSelect = (id: string) => {
    activeTabLockRef.current = id;
    if (activeTabLockTimeoutRef.current !== null) {
      window.clearTimeout(activeTabLockTimeoutRef.current);
    }
    activeTabLockTimeoutRef.current = window.setTimeout(() => {
      activeTabLockRef.current = null;
      activeTabLockTimeoutRef.current = null;
    }, 900);

    setActiveTab(id);
    scrollToCategory(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("data-id");
          if (!id) return;

          if (activeTabLockRef.current && activeTabLockRef.current !== id) {
            return;
          }

          if (activeTabLockRef.current === id) {
            activeTabLockRef.current = null;
            if (activeTabLockTimeoutRef.current !== null) {
              window.clearTimeout(activeTabLockTimeoutRef.current);
              activeTabLockTimeoutRef.current = null;
            }
          }

          setActiveTab(id);
        });
      },
      {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    Object.entries(sectionRefs.current).forEach(([id, el]) => {
      if (!el) return;
      el.setAttribute("data-id", id);
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (activeTabLockTimeoutRef.current !== null) {
        window.clearTimeout(activeTabLockTimeoutRef.current);
      }
    };
  }, []);

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const filteredCatalog = useMemo(
    () => catalog.filter(category => category.products.length > 0),
    [catalog]
  );

  const effectiveActiveTab = useMemo(() => {
    const names = new Set(filteredCatalog.map(c => c.name));
    return names.has(activeTab) ? activeTab : (filteredCatalog[0]?.name ?? "");
  }, [filteredCatalog, activeTab]);

  return (
    <div className="desktop:gap-106 gap-50 desktop:pb-160 desktop:pt-28 pb-100 flex min-h-screen w-full flex-col pt-40">
      <div className="desktop:px-90 desktop:rounded-2xl rounded-md px-16">
        {hero_data ? (
          <Hero
            activeTemplate={hero_data.activeTemplate}
            firstTemplate={hero_data.firstTemplate}
            secondTemplate={hero_data.secondTemplate}
            onOrderClick={() => {
              const { click, link } = hero_data.firstTemplate;
              if (click === "ссылка") {
                window.open(link ?? "https://t.me/floricraftlab", "_blank");
              } else if (click === "скролл") {
                const firstCategoryName = filteredCatalog[0]?.name ?? "";
                setActiveTab(firstCategoryName);
                scrollToCategory(firstCategoryName);
              }
            }}
          />
        ) : (
          <div className="desktop:h-335 h-145 desktop:rounded-2xl desktop:px-90 w-full rounded-md bg-[#D9D9D9] px-16" />
        )}
      </div>
      <div className="relative flex flex-col items-center">
        {Array.isArray(catalog) && catalog.length > 0 && (
          <>
            <h1 className="h1 desktop:pb-50 pb-14">Витрина</h1>
            <Tabs
              ref={tabsRef}
              categories={filteredCatalog}
              onSelect={handleTabSelect}
              activeTab={effectiveActiveTab}
            />
          </>
        )}
        <div className="gap-90 desktop:pt-50 pt-13 flex w-full flex-col">
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map((category, index) => (
              <ProductsList
                key={category.name}
                ref={el => {
                  sectionRefs.current[category.name] = el;
                }}
                category={category.name}
                products={category.products}
                isFirstCategory={index === 0}
                className="desktop:px-90 px-16"
              />
            ))
          ) : (
            <div className="desktop:pt-81 pt-146 flex min-h-[40vh] w-full flex-col items-center justify-center">
              <h2 className="empty desktop:pb-5 pb-6">
                Нет товаров в каталоге
              </h2>
              <p className="caption desktop:pb-41 pb-29">
                Товары появятся позже
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
