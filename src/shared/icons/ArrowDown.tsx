import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const ArrowDown = ({ className }: { className?: string }) => {
  return (
    <Image
      src="http://localhost:3000/icons/arrow-down.png"
      alt=""
      width={10}
      height={16}
      className={cn(
        "desktop:w-16 desktop:h-16 h-16 w-10 object-contain",
        className
      )}
    />
  );
};
