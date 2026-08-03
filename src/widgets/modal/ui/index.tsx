"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { CloseIcon } from "@/src/shared/icons/CloseIcon";
import { LogoIcon } from "@/src/shared/icons/LogoIcon";
import { TelegramBlackIcon } from "@/src/shared/icons/TelegramBlackIcon";
import { MaxIcon } from "@/src/shared/icons/MaxIcon";
import { cn } from "@/src/shared/lib/utils/cn";

const links = [
  {
    text: "Каталог",
    link: "/",
  },
  {
    text: "Возврат",
    link: "/money-back",
  },
  {
    text: "Доставка",
    link: "/delivery",
  },
  {
    text: "Уход за цветами",
    link: "/flower-care",
  },
  {
    text: "Публичная оферта",
    link: "/public-offer",
  },
  {
    text: "Политика конфиденциальности",
    link: "/policy",
  },
  {
    text: "Войти в аккаунт",
    link: "/auth",
  },
  {
    text: "Контакты",
    link: "",
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
  const [contactsHovered, setContactsHovered] = useState(false);
  const [contactsClicked, setContactsClicked] = useState(false);
  const contactsExpanded = contactsHovered || contactsClicked;

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
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-in-out",
          isAnimating ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "desktop:pt-60 pt-30 fixed inset-y-0 right-0 z-50 w-full bg-white shadow-2xl transition-all duration-500 ease-in-out",
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
            "desktop:right-90 desktop:top-44 hover:bg-light-grey absolute right-16 top-14 cursor-pointer rounded-full border border-white p-16 transition-all duration-300 ease-in-out hover:rotate-90 hover:border-black active:bg-gray-100",
            isAnimating ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
          )}
          aria-label="Закрыть меню"
        >
          <CloseIcon />
        </button>

        <div className="desktop:px-90 desktop:gap-40 gap-30 flex h-full w-full flex-col px-16">
          <div
            className={cn(
              "w-max transition-all duration-300 ease-in-out",
              isAnimating
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            )}
          >
            <LogoIcon />
          </div>

          <div className="desktop:gap-20 gap-15 desktop:ml-9 ml-4 flex flex-col">
            {links.map((link, i) => {
              if (link.text === "Контакты") {
                return (
                  <div
                    className="desktop:gap-15 desktop:mb-3 relative -mb-7 flex w-full max-w-max cursor-pointer flex-col gap-4"
                    key={i}
                    onMouseEnter={() => setContactsHovered(true)}
                    onMouseLeave={() => setContactsHovered(false)}
                  >
                    <h3
                      role="button"
                      tabIndex={0}
                      className={cn(
                        "h3 text-grey-for-text max-w-max cursor-pointer transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-black active:text-black",
                        isAnimating
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-8 opacity-0",
                        contactsExpanded && "translate-x-2 text-black"
                      )}
                      onClick={() => setContactsClicked(prev => !prev)}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setContactsClicked(prev => !prev);
                        }
                      }}
                    >
                      {link.text}
                    </h3>
                    <div
                      className={cn(
                        "grid w-full transition-[grid-template-rows] duration-300 ease-in-out",
                        contactsExpanded
                          ? "desktop:mt-5 grid-rows-[1fr]"
                          : "desktop:-mt-20 grid-rows-[0fr]"
                      )}
                    >
                      <div
                        className={cn(
                          "desktop:gap-23 gap-27 flex min-h-0 items-center overflow-hidden transition-opacity duration-300",
                          !contactsExpanded && "pointer-events-none opacity-0"
                        )}
                      >
                        <a href="tel:+79013320034">
                          <p className="text_p pl-15">+7(901)332-00-34</p>
                        </a>
                        <a href="https://max.ru/89013320034">
                          <MaxIcon />
                        </a>
                        <a href="https://t.me/floricraftlab">
                          <TelegramBlackIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={i}
                  className={cn(
                    "h3 text-grey-for-text max-w-max transition-all duration-300 ease-in-out hover:translate-x-2 hover:text-black active:text-black",
                    isAnimating
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-8 opacity-0"
                  )}
                  href={link.link}
                  onClick={onClose}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
