"use client";

import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import { cn } from "@/src/shared/lib/utils/cn";

import { I_YandexMap } from "../props";

export default function YandexMap({
  coordsX,
  coordsY,
  className,
  zoomLvl,
}: I_YandexMap) {
  return (
    <div className={cn("lg:h-600 w-full", className)}>
      <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YMAPS_API_KEY }}>
        <Map
          state={{ center: [coordsX, coordsY], zoom: zoomLvl }}
          className="lg:h-600 h-438 desktop:max-w-624 w-full"
        >
          <Placemark
            geometry={[coordsX, coordsY]}
            options={{
              iconLayout: "default#image",
              iconImageHref: "/icons/marker-icon.png",
              iconImageSize: [34, 41],
            }}
            properties={{
              hintContent: "Корлаб",
              balloonContent:
                "<strong>Спартаковская улица, 2А, Казань</strong>",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}
