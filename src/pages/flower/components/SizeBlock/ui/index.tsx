import { Dispatch, SetStateAction } from "react";

import { cn } from "@/src/shared/lib/utils/cn";

import { SizeButton } from "../../SizeButton/ui";

export const SizeBlock = ({
  sizes,
  activeSize,
  setActiveSize,
  className,
}: {
  sizes: string[];
  activeSize?: string;
  setActiveSize: Dispatch<SetStateAction<string>>;
  className?: string;
}) => {
  return (
    <div className={cn("desktop:gap-10 flex flex-row gap-16", className)}>
      {sizes.map((size, i) => (
        <SizeButton
          key={i}
          active={activeSize === size}
          onClick={() => setActiveSize(size)}
        >
          {size}
        </SizeButton>
      ))}
    </div>
  );
};
