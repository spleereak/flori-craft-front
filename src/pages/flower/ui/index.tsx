import { ArrowLeft } from "lucide-react";

import Link from "next/link";

import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { formatPrice } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";

import { ImagesBlock } from "../components/ImagesBlock/ui";
import { SizeBlock } from "../components/SizeBlock/ui";

const product = {
  name: "Орхидеи с ажурными розами и эвкалиптом в коробке",
  price: 5999,
  images: [
    "https://placehold.co/600x400/png",
    "https://placehold.co/80x80/png",
    "https://placehold.co/90x90/png",
  ],
  availableSizes: ["S", "M", "L"],
  info: [
    "Нежный и тёплый букет в мягких пастельных тонах — розовые гортензии и  солнечные жёлтые розы словно передают настроение южного утра. Лёгкий  ветер, аромат цветов и первые лучи солнца на тёплой террасе. Композиция сочетает в себе романтику и светлую радость, создавая ощущение уюта и гармонии.",
    "Букет будет подобным, в случае с живыми цветами копию собрать невозможно. Для вас создадим авторский букет, ориентируясь на фото-пример и свежие цветы в наличии.",
  ],
};

export default function ProductPage() {
  return (
    <div className="desktop:flex-row desktop:gap-184 desktop:flex w-full">
      <Link
        href="/"
        className="desktop:flex hidden max-h-max flex-row items-center gap-12"
      >
        <ArrowLeft className="h-33 w-24" />
        <p className="text_p max-h-max">На главную</p>
      </Link>
      <div className="desktop:max-w-1054 desktop:flex-row desktop:gap-24 relative flex w-full flex-col">
        <Link
          href="/"
          className="desktop:hidden absolute left-16 top-16 flex size-28 items-center justify-center rounded-full bg-white transition-all duration-300 active:opacity-80"
        >
          <CloseIcon />
        </Link>
        <ImagesBlock images={product.images} />
        <div className="desktop:pt-50 desktop:max-w-491 desktop:px-0 flex flex-col px-16 pt-12">
          <h3 className="h3 desktop:mb-46 mb-22">{product.name}</h3>
          <div className="desktop:flex-col desktop:gap-24 desktop:justify-start desktop:mb-51 mb-22 flex flex-row-reverse justify-between">
            <h3 className="h3">{formatPrice(product.price)} ₽</h3>
            <SizeBlock sizes={product.availableSizes} />
          </div>
          <div className="desktop:mb-30 desktop:flex-col max-desktop:fixed desktop:p-0 bottom-0 left-0 flex w-full flex-row gap-10 bg-white p-16">
            <Button>Добавить в корзину</Button>
            <Button appearance="outline">Купить сейчас</Button>
          </div>
          <div className="desktop:gap-24 text-grey-for-text flex flex-col">
            {product.info.map((text, i) => (
              <p key={i} className="caption">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
