import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const TelegramSecondaryIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "desktop:size-56 hover:bg-light-grey flex size-44 cursor-pointer items-center justify-center rounded-full border border-black bg-white transition-all duration-300 ease-in-out hover:opacity-80",
        className
      )}
    >
      <Image
        src="/icons/telegram-secondary.png"
        alt=""
        width={26}
        height={26}
        className="desktop:size-26 size-18"
      />
    </div>
  );
};
