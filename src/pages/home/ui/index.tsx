"use client";

import { useEffect, useRef, useState } from "react";

import { ProductsList } from "../components/ProductsList/ui";
import { Tabs } from "../components/Tabs/ui";

const catalog = [
  {
    category: "Монобукет",
    products: [
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
    ],
  },
  {
    category: "Монобукет",
    products: [
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
    ],
  },
  {
    category: "Монобукет",
    products: [
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке текст",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
      {
        price: 5999,
        name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
        imageSrc: "",
      },
    ],
  },
];

const categories = catalog.map((item, i) => {
  const name = item.category;
  const id = i.toString();
  return { name, id };
});

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>(categories[0].id);
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

  return (
    <div className="gap-106 desktop:pb-160 desktop:pt-28 pb-100 flex min-h-screen w-full flex-col pt-40">
      <div className="desktop:px-90 px-16">
        <div className="desktop:h-335 h-145 desktop:rounded-2xl desktop:px-90 w-full rounded-md bg-[#D9D9D9] px-16" />
      </div>
      <div className="relative flex flex-col items-center">
        <h1 className="h1 desktop:pb-50 pb-14">Витрина</h1>
        <Tabs
          categories={categories}
          onSelect={scrollToCategory}
          activeTab={activeTab}
        />
        <div className="gap-90 desktop:pt-50 pt-13 flex flex-col">
          {catalog.map((category, i) => {
            const id = i.toString();
            return (
              <ProductsList
                key={id}
                ref={el => {
                  sectionRefs.current[id] = el;
                }}
                category={category.category}
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
