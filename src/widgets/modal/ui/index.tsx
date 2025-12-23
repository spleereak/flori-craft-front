"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { cn } from "@/src/shared/lib/utils/cn";

const links = [
  {
    text: "Программа лояльности",
    link: "#",
  },
  {
    text: "Политика конфиденциальности",
    link: "/policy",
  },
  {
    text: "Публичная оферта",
    link: "#",
  },
  {
    text: "Возврат",
    link: "#",
  },
  {
    text: "Доставка",
    link: "#",
  },
  {
    text: "Уход за цветами",
    link: "#",
  },
];

export const Modal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose?: () => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAnimating(false);
    }
  }, [isOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-out",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "desktop:pt-60 pt-30 fixed inset-y-0 right-0 z-50 w-full bg-white shadow-2xl transition-all duration-500 ease-out",
          isAnimating
            ? "translate-x-0 scale-100 opacity-100"
            : "translate-x-[20%] scale-95 opacity-0"
        )}
        style={{
          transformOrigin: "right center",
        }}
      >
        <button
          onClick={onClose}
          className={cn(
            "desktop:right-90 desktop:top-44 hover:bg-light-grey absolute right-16 top-14 cursor-pointer rounded-full border border-white p-16 transition-all duration-500 hover:rotate-90 hover:border-black active:bg-gray-100",
            isAnimating ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
          )}
          aria-label="Закрыть меню"
        >
          <CloseIcon />
        </button>

        <div className="desktop:px-90 desktop:gap-40 gap-30 flex h-full w-full flex-col px-16">
          <div
            className={cn(
              "w-max transition-all duration-700 ease-out",
              isAnimating
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <LogoIcon />
          </div>

          <div className="desktop:gap-20 gap-15 desktop:ml-9 ml-4 flex flex-col">
            {links.map((link, i) => (
              <Link
                key={i}
                className={cn(
                  "h3 text-grey-for-text max-w-max transition-all duration-700 ease-out hover:translate-x-2 hover:text-black active:text-black",
                  isAnimating
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                )}
                style={{
                  transitionDelay: `${200 + i * 50}ms`,
                }}
                href={link.link}
                onClick={onClose}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
