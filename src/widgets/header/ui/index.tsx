"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCartStore } from "@/src/entities/cart/model/cart.store";
import { BurgerIcon } from "@/src/shared/icons/BurgerIcon";
import { CartIcon } from "@/src/shared/icons/CartIcon";
import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { UserIcon } from "@/src/shared/icons/UserIcon";
import { useAuthStore } from "@/src/shared/lib/stores/authStore";
import { cn } from "@/src/shared/lib/utils/cn";

import { Modal } from "../../modal";

export const Header = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const items = useCartStore(state => state.items);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const router = useRouter();

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setShouldRender(false), 500);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }

    return () => (document.body.style.overflow = "hidden");
  }, [isOpen]);

  return (
    <header
      className={cn(
        "desktop:py-5 py-15 desktop:px-90 fixed z-50 w-full overflow-hidden bg-white px-16 shadow-[0_4px_4px_rgba(0,0,0,0.2)]",
        className
      )}
    >
      <div className="desktop:h-132 relative flex flex-row items-center justify-end">
        <Link
          href="/"
          className="desktop:left-1/2 desktop:-translate-x-1/2 absolute left-0"
        >
          <LogoIcon />
        </Link>
        <div className="flex flex-row gap-10">
          <Link href="/cart">
            <div className="relative flex items-center justify-center">
              {items.length > 0 && (
                <div className="desktop:size-27 size-18 bg-brown desktop:-right-6 desktop:-top-6 absolute -right-4 -top-4 z-50 flex items-center justify-center rounded-full">
                  <p className="desktop:!text-[0.875rem] caption max-h-max !text-[0.6rem] text-white">
                    {items.length}
                  </p>
                </div>
              )}
              <CartIcon />
            </div>
          </Link>
          <button onClick={handleUserIconClick}>
            <UserIcon />
          </button>
          <div onClick={() => setIsOpen(true)} className="cursor-pointer">
            <BurgerIcon />
          </div>
        </div>
      </div>
      {shouldRender && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </header>
  );
};
