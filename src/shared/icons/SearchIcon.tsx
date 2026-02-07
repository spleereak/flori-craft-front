import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/search.png"
      alt=""
      width={22}
      height={22}
      className={cn("desktop:size-22 size-16", className)}
    />
  );
};
