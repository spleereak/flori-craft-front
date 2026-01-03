import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/src/shared/lib/stores/authStore";

import { SmsCodeFormProps } from "../types";

export const useSmsForm = ({ mode, userData }: SmsCodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setAuth = useAuthStore(state => state.setAuth);
  const router = useRouter();
  const hasAutoSubmitted = useRef(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const verifyCode = async (codeToVerify: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Имитация проверки кода
    if (codeToVerify === "1234") {
      const userToSave =
        mode === "register"
          ? {
              name: userData.name,
              phone: userData.phone,
              gender: userData.gender,
              currentPoints: "500",
            }
          : {
              // При login эти данные должны прийти с бэкенда
              name: "Пользователь", // Заглушка
              phone: userData.phone,
              gender: "male" as const, // Заглушка
              currentPoints: "500", // Заглушка
            };

      setAuth(true, userToSave);
      router.push("/profile");
    } else {
      setError("Неверный код. Попробуйте 1234");
      setCode("");
      setIsSubmitting(false);
      hasAutoSubmitted.current = false;
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
    setError("");
    hasAutoSubmitted.current = false;

    if (value.length === 4 && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      verifyCode(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 4) {
      setError("Введите 4-значный код");
      return;
    }

    verifyCode(code);
  };

  const handleResendCode = () => {
    console.log("Повторная отправка SMS на номер:", userData.phone);
    console.log("Режим:", mode);
    setCode("");
    setError("");
    setTimeLeft(60);
    setCanResend(false);
    hasAutoSubmitted.current = false;
    // Здесь будет запрос на повторную отправку
  };

  return {
    code,
    error,
    canResend,
    timeLeft,
    isSubmitting,
    formatTime,
    handleCodeChange,
    handleSubmit,
    handleResendCode,
  };
};
