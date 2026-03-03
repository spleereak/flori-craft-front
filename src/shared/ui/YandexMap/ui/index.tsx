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
    <div className={cn("desktop:h-374 h-206 w-full", className)}>
      <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YMAPS_API_KEY }}>
        <Map
          state={{ center: [coordsX, coordsY], zoom: zoomLvl }}
          className="desktop:h-374 h-206 desktop:max-w-624 w-full"
        >
          <Placemark
            geometry={[coordsX, coordsY]}
            options={{
              iconLayout: "default#image",
              iconImageHref: "/icons/marker-icon.png",
              iconImageSize: [34, 41],
            }}
            properties={{
              hintContent: "FloriCraft",
              balloonContent:
                "<strong>Фили Град Береговой проезд 5Ак1</strong>",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}
