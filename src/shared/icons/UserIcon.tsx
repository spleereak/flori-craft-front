import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const UserIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/user.png"
      alt=""
      width={40}
      height={40}
      className={cn("desktop:size-40 size-24", className)}
    />
  );
};
