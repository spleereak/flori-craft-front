import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const CalendarIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/icons/calendar.png"
      alt=""
      width={20}
      height={20}
      className={cn("desktop:size-20 size-16", className)}
    />
  );
};
