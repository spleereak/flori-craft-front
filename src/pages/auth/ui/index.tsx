"use client";
import Link from "next/link";

import { cn } from "@/src/shared/lib/utils/cn";

import { AuthTabs, Form, SmsCodeForm } from "../components";
import { useAuth } from "../model";

export default function AuthPage() {
  const {
    activeAuth,
    authStep,
    userData,
    handleFormSuccess,
    handleChangeAuthType,
  } = useAuth();

  return (
    <div className="desktop:px-90 max-desktop:min-h-screen desktop:pb-160 flex flex-col px-16 pt-40">
      <div className="desktop:gap-20 desktop:mb-13 mb-33 flex flex-row items-center gap-10">
        <Link href="/" className="caption text-grey-for-text">
          Главная
        </Link>
        <p className="caption text-grey-for-text">&gt;</p>
        <p
          className={cn(
            "caption",
            authStep === "sms" ? "text-grey-for-text" : "text-black"
          )}
        >
          {activeAuth === "register" ? "Регистрация" : "Вход"}
        </p>
        {authStep === "sms" && (
          <div className="contents">
            <p className="caption text-grey-for-text">&gt;</p>
            <p className="caption">Смс с кодом</p>
          </div>
        )}
      </div>
      <div className="desktop:gap-62 flex flex-col items-center gap-40">
        {authStep === "form" ? (
          <>
            <AuthTabs
              className="desktop:max-w-732 max-w-260"
              activeAuth={activeAuth}
              registerClick={() => handleChangeAuthType("register")}
              loginClick={() => handleChangeAuthType("login")}
            />
            <Form mode={activeAuth} onSuccess={handleFormSuccess} />
          </>
        ) : (
          <SmsCodeForm userData={userData!} mode={activeAuth} />
        )}
      </div>
    </div>
  );
}
