"use client";

import React from "react";

import { cn } from "@/src/shared/lib/utils/cn";
import { TabButton } from "@/src/shared/ui/TabButton";

import { FilterPrice } from "../../FilterPrice/ui";
import { TabsProps } from "../types";

export const Tabs: React.FC<TabsProps> = ({
  className,
  categories,
  activeTab,
  onSelect,
}) => {
  const handleClick = (id: string) => {
    onSelect?.(id);
  };

  return (
    <div
      className={cn(
        "desktop:gap-28 desktop:top-172 top-90 z-5 hide-scrollbar desktop:py-30 desktop:px-90 sticky flex w-full flex-row gap-10 overflow-x-auto whitespace-nowrap bg-white px-16 py-20",
        className
      )}
    >
      <FilterPrice />
      {categories.map(category => (
        <TabButton
          key={category.id}
          tab={category.name}
          active={activeTab === category.id}
          onClick={() => handleClick(category.id)}
        />
      ))}
    </div>
  );
};
