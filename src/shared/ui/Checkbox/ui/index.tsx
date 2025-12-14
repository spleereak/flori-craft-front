import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

export const Checkbox = ({
  className,
  checked,
  onChange,
}: {
  className?: string;
  checked: boolean;
  onChange: () => void;
}) => {
  return (
    <div
      className={cn(
        "desktop:py-8 desktop:px-6 flex max-h-max max-w-max items-center justify-center px-2 py-3",
        "border-3 border-brown desktop:rounded-md cursor-pointer rounded-sm",
        "transition-all duration-300 ease-in-out",
        "hover:opacity-80",
        "active:opacity-80",
        "focus:outline-none",
        "focus:ring-0",
        "focus:ring-offset-0",
        "focus:ring-offset-transparent",
        "focus:ring-offset-transparent",
        className
      )}
      onClick={onChange}
    >
      {checked ? (
        <Image
          src="/icons/check.png"
          alt=""
          width={16}
          height={12}
          className="desktop:min-h-12 desktop:min-w-16"
        />
      ) : (
        <div className="desktop:h-12 desktop:w-16 h-8 w-10" />
      )}
    </div>
  );
};
