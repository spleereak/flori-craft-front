"use client";

import Link from "next/link";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { CartIcon } from "@/src/shared/icons/CartIcon";
import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { UserIcon } from "@/src/shared/icons/UserIcon";
import { cn } from "@/src/shared/lib/utils/cn";

export const Header = ({ className }: { className?: string }) => {
  const items = useCartStore(state => state.items);

  return (
    <header
      className={cn(
        "desktop:py-5 py-15 desktop:px-90 fixed z-50 flex w-full flex-row items-center justify-between overflow-x-hidden bg-white px-16 shadow-[0_4px_4px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <div className="desktop:flex desktop:flex-row desktop:gap-48 desktop:items-center contents">
        <Link href="/">
          <LogoIcon />
        </Link>
        <p className="text_p max-w-376 desktop:block text-grey-for-text hidden">
          г. Москва, Береговой проезд, д.5А, к.1 ТЦ Фили Град, -1 этаж
        </p>
      </div>
      <div className="desktop:gap-46 gap-27 flex flex-row">
        <Link href="/cart">
          <div className="relative flex items-center justify-center">
            {items.length > 0 && (
              <div className="desktop:size-27 size-15 bg-brown desktop:-right-10 desktop:-top-10 absolute -right-4 -top-4 flex items-center justify-center rounded-full">
                <p className="desktop:!text-[0.875rem] caption !text-[0.5rem] text-white">
                  {items.length}
                </p>
              </div>
            )}
            <CartIcon />
          </div>
        </Link>
        <div className="desktop:flex desktop:flex-row desktop:gap-21 desktop:items-center contents">
          <UserIcon />
          <div className="desktop:flex text_p text-grey-for-text hidden flex-row items-center gap-24">
            <p>Вход</p>
            <p>/</p>
            <p>Регистрация</p>
          </div>
        </div>
      </div>
    </header>
  );
};
