"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/src/shared/ui";

const YANDEX_METRIKA_ID = 106881811;
const STORAGE_KEY = "from_yookassa_ok";

export default function ThankYouPage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const fromYooKassa = sessionStorage.getItem(STORAGE_KEY);
    if (!fromYooKassa) {
      router.replace("/");
      return;
    }
    sessionStorage.removeItem(STORAGE_KEY);
    setAllowed(true);
  }, [router]);

  const handleReturnHome = () => {
    ym(YANDEX_METRIKA_ID, "reachGoal", "purchase_click");
    router.push("/");
  };

  if (allowed === null) {
    return (
      <div className="desktop:h-815 h-600 flex w-full items-center justify-center px-16">
        <div className="border-brown h-32 w-32 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return (
    <div className="desktop:gap-60 desktop:h-815 desktop:px-90 gap-25 pb-100 h-600 flex w-full flex-col items-center justify-center px-16 pt-40">
      <div className="desktop:gap-50 desktop:max-w-1080 gap-25 flex flex-col place-self-center">
        <h1 className="h1">Спасибо за покупку</h1>
        <p className="text_p text-grey-for-text">
          Ваш заказ успешно оплачен. Мы свяжемся с вами для уточнения деталей
          доставки.
        </p>
        <div className="mt-10">
          <Button onClick={handleReturnHome}>Вернуться на главную</Button>
        </div>
      </div>
    </div>
  );
}
// eslint-disable-next-line no-unused-vars
function ym(YANDEX_METRIKA_ID: number, arg1: string, arg2: string) {
  throw new Error("Function not implemented.");
}
