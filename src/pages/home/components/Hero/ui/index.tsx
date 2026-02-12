"use client";

import Markdown from "react-markdown";

import strapiImageLoader from "@/src/config/strapi-loader";
import { cn } from "@/src/shared/lib/utils/cn";

import { I_Hero } from "../props";

export const Hero = ({
  className,
  title,
  text,
  image,
  color,
  text_color,
  bg_color,
  mobile_image,
}: I_Hero) => {
  return (
    <div
      className={cn(
        "desktop:h-335 h-145 desktop:px-90 max-desktop:items-center desktop:rounded-2xl relative flex w-full rounded-md px-10",
        className
      )}
      style={{ backgroundColor: bg_color }}
    >
      <div className="desktop:gap-25 desktop:pt-60 flex flex-col gap-10">
        <h1
          className="h1 text-[1.0625rem]! desktop:text-[4.875rem]!"
          style={{ color: color }}
        >
          {title}
        </h1>
        <div
          className="text_p--switch max-desktop:max-w-185 desktop:max-w-661"
          style={{ color: text_color }}
        >
          <Markdown>{text}</Markdown>
        </div>
      </div>
      <img
        className="desktop:w-900 desktop:h-full w-190 h-170 max-desktop:hidden absolute right-0 top-0"
        src={strapiImageLoader({ src: image.url, quality: 100 })}
        alt="Image"
        width={190}
        height={175}
      />
      <img
        className="desktop:w-700 desktop:h-full w-190 desktop:hidden absolute right-0 top-0 h-full object-cover"
        src={strapiImageLoader({ src: mobile_image.url, quality: 100 })}
        alt="Image"
        width={190}
        height={175}
      />
    </div>
  );
};
