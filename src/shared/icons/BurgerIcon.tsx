import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const BurgerIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      alt=""
      src="/icons/menu.png"
      width={40}
      height={40}
      className={cn("desktop:size-40 size-28", className)}
    />
  );
};
