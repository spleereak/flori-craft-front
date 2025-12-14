import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const TrashIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/trash.png"
      alt=""
      width={30}
      height={30}
      className={cn("size-30 cursor-pointer", className)}
    />
  );
};
