import Link from "next/link";

import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { Button } from "@/src/shared/ui";

export default function NotFound() {
  return (
    <div className="desktop:justify-center relative flex min-h-screen w-full flex-col items-center">
      <LogoIcon className="max-desktop:hidden absolute left-1/2 top-5 -translate-x-1/2" />
      <div className="desktop:gap-41 gap-29 max-desktop:pt-234 flex flex-col items-center">
        <div className="flex flex-col items-center gap-5">
          <p className="desktop:text-[2rem] text-[0.875rem] font-medium leading-[1.1]">
            Ошибка 404
          </p>
          <h3 className="desktop:text-[3.375rem] text-[1.5rem] font-bold leading-none">
            Такой страницы нет
          </h3>
          <p className="caption">Но есть много других — начните с главной</p>
        </div>
        <Link href="/">
          <Button appearance="outline" className="desktop:max-w-235 max-w-98">
            Главная
          </Button>
        </Link>
      </div>
    </div>
  );
}
