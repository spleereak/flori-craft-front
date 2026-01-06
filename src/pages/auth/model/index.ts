import { useState } from "react";

import { authApi } from "@/src/entities/user/api";

type AuthStep = "form" | "sms";

export const useAuth = () => {
  const [activeAuth, setActiveAuth] = useState<"register" | "login">(
    "register"
  );
  const [authStep, setAuthStep] = useState<AuthStep>("form");
  const [userData, setUserData] = useState<{
    name: string;
    phone: string;
    gender: string;
  } | null>(null);

  const handleFormSuccess = async (data: {
    name: string;
    phone: string;
    gender: string;
  }) => {
    setUserData(data);
    setAuthStep("sms");
    // Здесь будет запрос на отправку SMS когда backend готов
    try {
      await authApi.sendSms({ phone: data.phone });
    } catch (error) {
      console.error("Ошибка отправки SMS: ", error);
    }
  };

  const handleChangeAuthType = (type: "register" | "login") => {
    setActiveAuth(type);
    setAuthStep("form");
    setUserData(null);
  };

  return {
    activeAuth,
    authStep,
    userData,
    handleFormSuccess,
    handleChangeAuthType,
  };
};
