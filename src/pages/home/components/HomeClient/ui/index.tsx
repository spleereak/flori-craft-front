"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { Bouquet, CategoriesProducts } from "@/src/entities/products/api";

import { usePrice } from "../../FilterPrice/model/index.model";
import { ProductsList } from "../../ProductsList/ui";
import { Tabs } from "../../Tabs/ui";

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

function getMinPrice(product: Bouquet): number | null {
  if ("variants" in product && product.variants?.length) {
    return Math.min(...product.variants.map(v => v.price));
  }

  if (typeof product.price === "number") {
    return product.price;
  }

  return null;
}

export function HomeClient({ catalog }: { catalog: CategoriesProducts[] }) {
  const minMax = useMemo(() => getMinMaxPrices(catalog), [catalog]);
  const { prices, debouncedPrices, updatePrice, updatePrices } = usePrice({
    priceMin: minMax.minPrice,
    priceMax: minMax.maxPrice,
  });

  const [activeTab, setActiveTab] = useState<string>(catalog[0]?.name || "");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  return (
    <div className="desktop:gap-106 gap-50 desktop:pb-160 desktop:pt-28 pb-100 flex min-h-screen w-full flex-col pt-40">
      <div className="desktop:px-90 px-16">
        <div className="desktop:h-335 h-145 desktop:rounded-2xl desktop:px-90 w-full rounded-md bg-[#D9D9D9] px-16" />
      </div>
      <div className="relative flex flex-col items-center">
        <h1 className="h1 desktop:pb-50 pb-14">Витрина</h1>
        {Array.isArray(catalog) && catalog.length > 0 && (
          <Tabs
            categories={catalog}
            onSelect={scrollToCategory}
            activeTab={activeTab}
            minPrice={minMax.minPrice}
            maxPrice={minMax.maxPrice}
            prices={prices}
            updatePrice={updatePrice}
            updatePrices={updatePrices}
          />
        )}
        <div className="gap-90 desktop:pt-50 pt-13 flex w-full flex-col">
          {filteredCatalog.map(category => {
            return (
              <ProductsList
                key={category.name}
                ref={el => {
                  sectionRefs.current[category.name] = el;
                }}
                category={category.name}
                products={category.products}
                className="desktop:px-90 px-16"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
