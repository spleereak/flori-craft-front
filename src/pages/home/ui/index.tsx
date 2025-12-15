"use client";

import { useEffect, useRef, useState } from "react";

import { ProductsList } from "../components/ProductsList/ui";
import { Tabs } from "../components/Tabs/ui";

const catalog = [
  {
    category: "Букеты",
    products: [
      {
        productId: "1",
        priceList: [
          {
            size: "S",
            price: 11250,
          },
          {
            size: "M",
            price: 12250,
          },
          {
            size: "L",
            price: 13250,
          },
        ],
        name: "Букет Утро в Провансе",
        images: ["", ""],
      },
      {
        productId: "2",
        priceList: [
          {
            size: "S",
            price: 12000,
          },
          {
            size: "M",
            price: 13000,
          },
          {
            size: "L",
            price: 14000,
          },
        ],
        name: "Букет Розовое облако",
        images: ["", ""],
      },
      {
        productId: "3",
        priceList: [
          {
            size: "S",
            price: 7500,
          },
          {
            size: "M",
            price: 8500,
          },
          {
            size: "L",
            price: 9500,
          },
        ],
        name: "Букет из 15 роз",
        images: ["", ""],
      },
      {
        productId: "4",
        priceList: [
          {
            size: "S",
            price: 10500,
          },
          {
            size: "M",
            price: 11500,
          },
          {
            size: "L",
            price: 12500,
          },
        ],
        name: "Букет Сильва",
        images: ["", ""],
      },
      {
        productId: "5",
        priceList: [
          {
            size: "S",
            price: 11500,
          },
          {
            size: "M",
            price: 12500,
          },
          {
            size: "L",
            price: 13500,
          },
        ],
        name: "Букет Лилия",
        images: ["", ""],
      },
    ],
  },
  {
    category: "Композиции",
    products: [
      {
        productId: "6",
        priceList: [
          {
            size: "S",
            price: 17000,
          },
          {
            size: "M",
            price: 18000,
          },
          {
            size: "L",
            price: 19000,
          },
        ],
        name: "Композиция Лето",
        images: ["", ""],
      },
      {
        productId: "7",
        priceList: [
          {
            size: "S",
            price: 15000,
          },
          {
            size: "M",
            price: 16000,
          },
          {
            size: "L",
            price: 17000,
          },
        ],
        name: "Композиция Признание",
        images: ["", ""],
      },
      {
        productId: "8",
        priceList: [
          {
            size: "S",
            price: 2700,
          },
          {
            size: "M",
            price: 3700,
          },
          {
            size: "L",
            price: 4700,
          },
        ],
        name: "Цветочный WOK",
        images: ["", ""],
      },
      {
        productId: "9",
        priceList: [
          {
            size: "S",
            price: 9000,
          },
          {
            size: "M",
            price: 10000,
          },
          {
            size: "L",
            price: 11000,
          },
        ],
        name: "Композиция в плетённом кашпо",
        images: ["", ""],
      },
    ],
  },
  {
    category: "Вазы",
    products: [
      {
        productId: "10",
        priceList: [
          {
            size: "M",
            price: 2000,
          },
          {
            size: "L",
            price: 2500,
          },
        ],
        name: "Ваза Лед",
        images: ["", ""],
      },
      {
        productId: "11",
        priceList: [
          {
            size: "M",
            price: 2000,
          },
        ],
        name: "Ваза прямоугольная",
        images: ["", ""],
      },
      {
        productId: "12",
        priceList: [
          {
            size: "M",
            price: 4000,
          },
          {
            size: "L",
            price: 4500,
          },
        ],
        name: "Ваза интерьерная",
        images: ["", ""],
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
    <div className="desktop:gap-106 gap-50 desktop:pb-160 desktop:pt-28 pb-100 flex min-h-screen w-full flex-col pt-40">
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
