import React, { forwardRef } from "react";

import { cn } from "@/src/shared/lib/utils/cn";

import { ProductCard } from "../../ProductCard/ui";
import { ProductsListProps } from "../types";

export const ProductsList = forwardRef<HTMLDivElement, ProductsListProps>(
  ({ className, category, products }, ref) => {
    return (
      <div
        className={cn(
          "gap-30 scroll-mt-180 desktop:scroll-mt-300 flex flex-col",
          className
        )}
        ref={ref}
      >
        <h1 className="h1">{category}</h1>
        <div className="desktop:grid-cols-3 desktop:gap-x-135 desktop:gap-y-80 gap-y-18 grid grid-cols-2 gap-x-7">
          {products.map((product, i) => (
            <ProductCard
              price={product.price}
              imageSrc={product.imageSrc}
              name={product.name}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
);

ProductsList.displayName = "ProductsList";
