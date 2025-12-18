"use client";

import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

import { CloseIcon } from "@/src/shared/icons/CloseIcon";

import { useToastStore } from "../model/toast.store";

export const CartToast = () => {
  const { isOpen, close } = useToastStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="desktop:top-40 w-330 desktop:w-618 z-70 desktop:px-40 desktop:py-30 desktop:gap-92 gap-42 bg-light-grey desktop:rounded-2xl fixed left-1/2 top-10 flex h-max -translate-x-1/2 flex-col items-center rounded-md p-16"
        >
          <div
            className="desktop:size-40 desktop:right-20 desktop:top-20 absolute right-7 top-7 flex size-28 cursor-pointer items-center justify-center rounded-full bg-white transition-all duration-300 active:opacity-80"
            onClick={close}
          >
            <CloseIcon />
          </div>
          <p className="text_p">Товар добавлен в корзину</p>
          <div className="flex w-full flex-row justify-between">
            <Link
              className="text_p text-grey-for-text w-max text-center"
              href="/cart"
              onClick={close}
            >
              Перейти в корзину
            </Link>
            <Link className="text_p w-max text-center" href="/" onClick={close}>
              Продолжить покупки
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
