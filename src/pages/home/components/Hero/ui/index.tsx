"use client";

import Markdown from "react-markdown";

import strapiImageLoader from "@/src/config/strapi-loader";
import { cn } from "@/src/shared/lib/utils/cn";
import { Button } from "@/src/shared/ui";

import { I_Hero } from "../props";

export const Hero = ({
  className,
  onOrderClick,
  activeTemplate,
  firstTemplate,
  secondTemplate,
}: I_Hero) => {
  const {
    title_first,
    typeofButton,
    image_first,
    image_mobile_first,
    title_color,
    buttonText,
  } = firstTemplate;

  const { bg_color, text_color, color, title, text, mobile_image, image } =
    secondTemplate;

  if (activeTemplate === "firstTemplate") {
    return (
      <div
        className={cn(
          "desktop:h-335 h-145 desktop:px-90 desktop:rounded-2xl relative flex w-full items-center justify-center rounded-md px-10",
          "relative",
          className
        )}
      >
        <img
          className="max-desktop:hidden desktop:rounded-2xl max-desktop:object-cover absolute left-0 top-0 z-10 h-full w-full rounded-md"
          src={strapiImageLoader({ src: image_first.url, quality: 100 })}
          alt="Image"
        />
        <img
          className="desktop:hidden absolute left-0 top-0 z-10 h-full w-full rounded-md"
          src={strapiImageLoader({ src: image_mobile_first.url, quality: 100 })}
          alt="Image"
        />
        <div className="desktop:gap-50 z-30 flex flex-col items-center gap-20">
          <h1
            className="desktop:text-6xl text-[1.25rem] font-bold"
            style={{ color: title_color }}
          >
            {title_first}
          </h1>
          <Button
            appearance={typeofButton}
            className="desktop:h-auto desktop:w-auto rounded-[5.625rem]! desktop:px-70 desktop:py-16 desktop:text-[1.5rem]! text-[0.625rem]! h-auto w-auto border-white px-24 py-11 text-white"
            onClick={onOrderClick}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }

  if (activeTemplate === "secondTemplate") {
    return (
      <div
        className={cn(
          "desktop:h-335 h-145 desktop:px-90 max-desktop:items-center desktop:rounded-2xl relative flex w-full rounded-md px-10",
          className
        )}
        style={{ backgroundColor: bg_color }}
      >
        <div className="desktop:gap-25 desktop:pt-60 flex flex-col gap-10">
          <div
            className="h1 text-[1.0625rem]! desktop:text-[4.875rem]! z-100"
            style={{ color: color }}
          >
            <Markdown>{title}</Markdown>
          </div>
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
  }
};
