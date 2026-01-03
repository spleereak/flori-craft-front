"use client";

import { useState } from "react";

import Link from "next/link";

import { AuthTabs, Form } from "../components";

export default function AuthPage() {
  const [activeAuth, setActiveAuth] = useState<"register" | "login">(
    "register"
  );

  return (
    <div className="desktop:px-90 max-desktop:min-h-screen desktop:pb-160 flex flex-col px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-13 mb-33 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">&gt;</p>
        <p className="caption">
          {activeAuth === "register" ? "Регистрация" : "Вход"}
        </p>
      </div>
      <div className="desktop:gap-62 flex flex-col items-center gap-40">
        <AuthTabs
          className="desktop:max-w-732 max-w-260"
          activeAuth={activeAuth}
          registerClick={() => setActiveAuth("register")}
          loginClick={() => setActiveAuth("login")}
        />
        <Form mode={activeAuth} />
      </div>
    </div>
  );
}
