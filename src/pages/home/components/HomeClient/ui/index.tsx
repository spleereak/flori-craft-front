"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Bouquet, CategoriesProducts } from "@/src/entities/products/api";
import { consumeHomeScrollRestore } from "@/src/shared/lib/home-scroll-restore";
import { Button } from "@/src/shared/ui";

import { usePrice } from "../../FilterPrice/model/index.model";
import { Hero } from "../../Hero";
import { I_Hero } from "../../Hero/props";
import { ProductsList } from "../../ProductsList/ui";
import { Tabs, type TabsRef } from "../../Tabs/ui";

function getProductPrice(product: Bouquet): number | null {
  if ("variants" in product && product.variants?.length) {
    return Math.min(...product.variants.map(v => v.price));
  }

  if (typeof product.price === "number") {
    return product.price;
  }

  return null;
}

export function getMinMaxPrices(catalog: CategoriesProducts[]) {
  let min = Infinity;
  let max = -Infinity;

  for (const category of catalog) {
    for (const product of category.products) {
      const price = getProductPrice(product);
      if (price === null) continue;

      if (price < min) min = price;
      if (price > max) max = price;
    }
  }

  return {
    minPrice: min === Infinity ? 0 : min,
    maxPrice: max === -Infinity ? 100000 : max,
  };
}

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

function getMinPrice(product: Bouquet): number | null {
  if ("variants" in product && product.variants?.length) {
    return Math.min(...product.variants.map(v => v.price));
  }

  if (typeof product.price === "number") {
    return product.price;
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
  const minMax = useMemo(() => getMinMaxPrices(catalog), [catalog]);
  const { prices, debouncedPrices, updatePrice, updatePrices } = usePrice({
    priceMin: minMax.minPrice,
    priceMax: minMax.maxPrice,
  });

  const [activeTab, setActiveTab] = useState<string>(catalog[0]?.name || "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<TabsRef>(null);

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
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.getAttribute("data-id");
          if (!id) return;
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

    return () => observer.disconnect();
  }, []);

  const filteredCatalog = useMemo(() => {
    return catalog
      .map(category => {
        const filteredProducts = category.products.filter(product => {
          const price = getMinPrice(product);
          if (price === null) return false;

          return (
            price >= debouncedPrices.priceFrom &&
            price <= debouncedPrices.priceTo
          );
        });

        return {
          ...category,
          products: filteredProducts,
        };
      })
      .filter(category => category.products.length > 0);
  }, [catalog, debouncedPrices]);

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
              onSelect={scrollToCategory}
              activeTab={effectiveActiveTab}
              minPrice={minMax.minPrice}
              maxPrice={minMax.maxPrice}
              prices={prices}
              updatePrice={updatePrice}
              updatePrices={updatePrices}
            />
          </>
        )}
        <div className="gap-90 desktop:pt-50 pt-13 flex w-full flex-col">
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map(category => (
              <ProductsList
                key={category.name}
                ref={el => {
                  sectionRefs.current[category.name] = el;
                }}
                category={category.name}
                products={category.products}
                className="desktop:px-90 px-16"
              />
            ))
          ) : (
            <div className="desktop:pt-81 pt-146 flex min-h-[40vh] w-full flex-col items-center justify-center">
              <h2 className="empty desktop:pb-5 pb-6">
                Нет товаров в каталоге
              </h2>
              <p className="caption desktop:pb-41 pb-29">
                {catalog.length > 0
                  ? "Измените диапазон цен, чтобы увидеть товары"
                  : "Товары появятся позже"}
              </p>
              {catalog.length > 0 && (
                <Button
                  appearance="secondary"
                  className="desktop:w-235 desktop:h-65 w-98 h-34"
                  onClick={() =>
                    updatePrices([minMax.minPrice, minMax.maxPrice])
                  }
                >
                  Сбросить
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
