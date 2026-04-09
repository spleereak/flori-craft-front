import React, { forwardRef } from "react";

import Link from "next/link";

import { saveHomeScrollPosition } from "@/src/shared/lib/home-scroll-restore";
import { cn } from "@/src/shared/lib/utils/cn";

import { ProductCard } from "../../ProductCard/ui";
import { ProductsListProps } from "../types";

export const ProductsList = forwardRef<HTMLDivElement, ProductsListProps>(
  ({ className, category, products, isFirstCategory = false }, ref) => {
    return (
      <div
        className={cn(
          "gap-30 scroll-mt-180 desktop:scroll-mt-300 flex w-full flex-col",
          className
        )}
        ref={ref}
        data-first-category={isFirstCategory ? "true" : undefined}
      >
        <h1
          className="h1"
          data-first-category-title={isFirstCategory ? "true" : undefined}
        >
          {category}
        </h1>
        <div className="desktop:grid-cols-3 desktop:gap-x-135 desktop:gap-y-80 gap-y-18 grid grid-cols-2 gap-x-7">
          {products.map((product, index) => (
            <Link
              href={`/flowers/${product.id}`}
              key={product.id}
              onClick={() => saveHomeScrollPosition(category)}
              data-first-product-card={
                isFirstCategory && index === 0 ? "true" : undefined
              }
            >
              <ProductCard
                id={product.id}
                image_urls={product.image_urls}
                title={product.title}
                variants={product.variants}
                price={product.price ?? null}
                description={product.description}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }
);

ProductsList.displayName = "ProductsList";
