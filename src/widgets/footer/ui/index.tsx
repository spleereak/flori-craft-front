import Link from "next/link";

import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { TelegramIcon } from "@/src/shared/icons/TelegramIcon";
import { WhatsappIcon } from "@/src/shared/icons/WhatsappIcon";

export const Footer = () => {
  return (
    <footer className="desktop:gap-133 gap-15 desktop:px-90 desktop:items-center flex flex-row items-start bg-[url('/images/bg.png')] px-16 py-60 text-white">
      <LogoIcon
        className="desktop:w-215 desktop:h-140 w-84 h-55"
        mode="light"
      />
      <div className="desktop:gap-130 gap-25 flex flex-row flex-wrap">
        <div className="desktop:gap-43 gap-15 max-w-95 desktop:max-w-none flex flex-col">
          <h3 className="h3">Информация</h3>
          <div className="desktop:gap-18 flex flex-col gap-7">
            <Link href="#" className="caption">
              Доставка и оплата
            </Link>
            <Link href="#" className="caption">
              Программа лояльности
            </Link>
            <Link href="#" className="caption">
              Уход за цветами
            </Link>
          </div>
        </div>
        <div className="desktop:gap-43 gap-15 max-w-95 desktop:max-w-none flex flex-col">
          <h3 className="h3">Документы</h3>
          <div className="desktop:gap-18 flex flex-col gap-7">
            <Link href="#" className="caption">
              Оферта
            </Link>
            <Link href="#" className="caption">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="caption">
              Возврат
            </Link>
          </div>
        </div>
        <div className="desktop:gap-43 gap-15 flex flex-col">
          <h3 className="h3">Контакты</h3>
          <div className="flex flex-col gap-16">
            <p className="caption desktop:max-w-376 max-w-160">
              г. Москва, Береговой проезд, д.5А, к.1 ТЦ Фили Град, -1 этаж
            </p>
            <div className="desktop:gap-103 gap-76 flex flex-row items-end">
              <Link href="#" className="caption">
                +7 (901) 332-00-34
              </Link>
              <div className="gap-22 desktop:gap-30 flex flex-row">
                <Link href="#">
                  <TelegramIcon />
                </Link>
                <Link href="#">
                  <WhatsappIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
