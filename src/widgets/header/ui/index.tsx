import { CartIcon } from "@/src/shared/icons/CartIcon";
import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { UserIcon } from "@/src/shared/icons/UserIcon";
import { cn } from "@/src/shared/lib/utils/cn";

export const Header = ({ className }: { className?: string }) => {
  return (
    <header
      className={cn(
        "desktop:py-5 py-15 desktop:px-90 fixed z-50 flex w-full flex-row items-center justify-between overflow-x-hidden bg-white px-16 shadow-[0_4px_4px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <div className="desktop:flex desktop:flex-row desktop:gap-48 desktop:items-center contents">
        <LogoIcon />
        <p className="p max-w-376 desktop:block text-grey-for-text hidden">
          г. Москва, Береговой проезд, д.5А, к.1 ТЦ Фили Град, -1 этаж
        </p>
      </div>
      <div className="desktop:gap-46 gap-27 flex flex-row">
        <CartIcon />
        <div className="desktop:flex desktop:flex-row desktop:gap-21 desktop:items-center contents">
          <UserIcon />
          <div className="desktop:flex p text-grey-for-text hidden flex-row items-center gap-24">
            <p>Вход</p>
            <p>/</p>
            <p>Регистрация</p>
          </div>
        </div>
      </div>
    </header>
  );
};
