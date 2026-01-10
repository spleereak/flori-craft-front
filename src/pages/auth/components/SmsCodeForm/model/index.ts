"use client";

import React, { useEffect, useRef, useState } from "react";

import { authApi } from "@/src/entities/user/api";
import { cookies } from "@/src/shared/lib/utils/cookies";

import { SmsCodeFormProps } from "../types";

interface CodeInputRef {
  focusFirst: () => void;
}

export const useSmsForm = ({ mode, userData }: SmsCodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasAutoSubmitted = useRef(false);
  const codeInputRef = useRef<CodeInputRef>(null);

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

    try {
      let response;
      if (mode === "login") {
        response = await authApi.verifyLogin({
          phone: userData.phone,
          code: codeToVerify,
        });
      } else {
        response = await authApi.verifyRegister({
          phone: userData.phone,
          name: userData.name,
          gender: userData.gender,
          code: codeToVerify,
        });
      }
      cookies.setUserId(response.id);
      window.location.href = "/profile";
    } catch (error) {
      console.error("Ошибка при проверке: ", error);
      setError("Неверный код");
      setCode("");
      setIsSubmitting(false);
      hasAutoSubmitted.current = false;

      setTimeout(() => {
        codeInputRef.current?.focusFirst();
      }, 0);
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

  const handleResendCode = async () => {
    setCode("");
    setError("");
    setTimeLeft(60);
    setCanResend(false);
    hasAutoSubmitted.current = false;
    try {
      await authApi.sendSms({ phone: userData.phone });
    } catch (error) {
      console.error("Ошибка повторной отправки SMS: ", error);
    }
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
    codeInputRef,
  };
};
