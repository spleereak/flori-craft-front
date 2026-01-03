import { useState } from "react";

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

  const handleFormSuccess = (data: {
    name: string;
    phone: string;
    gender: string;
  }) => {
    setUserData(data);
    setAuthStep("sms");
    // Здесь будет запрос на отправку SMS когда backend готов
    console.log("Отправка SMS на номер:", data.phone);
    console.log("Режим:", activeAuth);
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
