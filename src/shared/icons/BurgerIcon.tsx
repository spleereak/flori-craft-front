import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const BurgerIcon = ({ className }: { className?: string }) => {
  return (
    <div className="desktop:size-56 hover:bg-light-grey flex size-44 cursor-pointer items-center justify-center rounded-full border border-black bg-white transition-all duration-300 ease-in-out hover:opacity-80">
      <Image
        alt=""
        src="/icons/menu.png"
        width={40}
        height={40}
        className={cn("desktop:size-26 size-18", className)}
      />
    </div>
  );
};
