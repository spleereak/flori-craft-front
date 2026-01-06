"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { authApi } from "@/src/entities/user/api";
import { ProfileResponse } from "@/src/entities/user/api/authApi";
import { ExitIcon } from "@/src/shared/icons/ExitIcon";
import { cookies } from "@/src/shared/lib/utils/cookies";

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileResponse | null>();
  const router = useRouter();

  const handleLogout = () => {
    cookies.removeUserId();
    router.push("/auth");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = cookies.get("user_id");

        if (!userId) {
          router.push("/auth");
          return;
        }

        const profile = await authApi.getProfile(userId);
        setUser(profile);
      } catch (error) {
        console.error("Ошибка загрузки пользователя", error);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h2 className="h2">Загрузка...</h2>
      </div>
    );
  }

  return (
    <div className="desktop:px-90 gap-84 desktop:gap-104 flex min-h-screen w-full flex-col px-16 pb-80 pt-40">
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
          <div className="desktop:py-20 desktop:px-22 desktop:rounded-2xl w-full rounded-md bg-white p-16">
            <p className="text_p">{user.name}</p>
          </div>
          <div className="desktop:py-20 desktop:px-22 desktop:rounded-2xl w-full rounded-md bg-white p-16">
            <p className="text_p">{user.phone}</p>
          </div>
        </div>
        <div
          className="desktop:gap-12 flex cursor-pointer flex-row items-center gap-9"
          onClick={() => handleLogout()}
        >
          <ExitIcon />
          <p className="text-red text_p">Выйти</p>
        </div>
      </div>
    </div>
  );
}
