import Markdown from "react-markdown";

import Image from "next/image";

import { cn } from "@/src/shared/lib/utils/cn";

import { I_Hero } from "../props";

export const Hero = ({ className, title, text, image, color }: I_Hero) => {
  return (
    <div className={cn("desktop:px-90 px-16", className)}>
      <div className="desktop:h-335 h-145 desktop:rounded-2xl desktop:px-90 relative flex w-full rounded-md bg-[#FFF5F5]">
        <div className="desktop:gap-25 flex flex-col gap-10">
          <h1 className="h1" style={{ color: color }}>
            {title}
          </h1>
          <div className="text_p--switch">
            <Markdown>{text}</Markdown>
          </div>
        </div>
        <Image
          className="absolute right-0 top-0 object-cover"
          src={image.url}
          alt="Image"
          width={190}
          height={175}
        />
      </div>
    </div>
  );
};
