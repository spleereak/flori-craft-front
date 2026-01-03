"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/src/shared/lib/stores/authStore";
import { formatBonus } from "@/src/shared/lib/utils/helpers";
import { Button } from "@/src/shared/ui";

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  if (!user || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="h2">Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="desktop:px-90 desktop:pb-147 gap-84 desktop:gap-104 flex w-full flex-col px-16 pb-80 pt-40">
      <div className="desktop:gap-20 desktop:mb-47 mb-25 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">{">"}</p>
        <p className="caption">Профиль</p>
      </div>
      <div className="desktop:p-45 max-w-792 desktop:gap-67 gap-23 bg-light-grey flex w-full flex-col place-self-center rounded-2xl p-16">
        <h3 className="h3">Профиль</h3>
        <div className="flex w-full flex-col gap-12">
          <div className="desktop:py-20 desktop:px-22 desktop:rounded-2xl w-full rounded-md bg-white">
            <p className="caption">{user.name}</p>
          </div>
          <div className="desktop:py-20 desktop:px-22 desktop:rounded-2xl w-full rounded-md bg-white">
            <p className="caption">{user.phone}</p>
          </div>
        </div>
        <div className="gap-23 desktop:gap-45 flex flex-col">
          <h3 className="h3">Программа лояльности</h3>
          <div className="desktop:gap-14 flex flex-col gap-8">
            <p className="caption">Оплачивайте до 15% от заказа бонусами</p>
            <div className="desktop:py-20 desktop:px-22 desktop:rounded-2xl desktop:w-345 w-full rounded-md bg-white">
              <p className="caption">
                {formatBonus(Number(user.currentPoints))}
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => handleLogout()}
          className="bg-red desktop:w-234 desktop:h-66 w-156 h-33"
        >
          Выйти
        </Button>
      </div>
    </div>
  );
}
