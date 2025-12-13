import Image from "next/image";

import { cn } from "../lib/utils/cn";

export const LogoIcon = ({
  className,
  mode = "dark",
}: {
  className?: string;
  mode?: "dark" | "light";
}) => {
  return (
    <Image
      src={mode === "dark" ? "/icons/logo.png" : "/icons/logo-white.png"}
      alt=""
      width={250}
      height={162}
      loading="eager"
      className={cn("desktop:w-250 desktop:h-162 w-94 h-61", className)}
    />
  );
};
