import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const TelegramBlackIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/telegram-icon-solid.png"
      alt=""
      width={30}
      height={30}
      className={cn("desktop:size-30 size-25", className)}
    />
  );
};
