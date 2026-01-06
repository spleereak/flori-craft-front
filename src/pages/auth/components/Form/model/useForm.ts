import { ChangeEvent, FormEvent, useState } from "react";

import { authApi } from "@/src/entities/user/api";

import { FormData, FormErrors, FormProps } from "../types";

export const useForm = ({ mode, onSuccess }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "male",
    phone: "",
    agreedToPolicy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const clearError = (field: keyof FormErrors) => {
    setErrors(prev => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handlePhoneChange = (value: string) => {
    const input = value;
    const formatted = input.replace(/\D/g, "");

    setFormData(prev => ({
      ...prev,
      phone: formatted,
    }));

    clearError("phone");
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    clearError("name");
  };

  const handleCheckboxChange = () => {
    setFormData(prev => ({
      ...prev,
      agreedToPolicy: !prev.agreedToPolicy,
    }));

    clearError("agreedToPolicy");
  };

  const handleChangeGender = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender: gender,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() && mode === "register") {
      newErrors.name = true;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "").slice(1);
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Неправильно введен номер телефона";
    }

    if (!formData.agreedToPolicy) {
      newErrors.agreedToPolicy = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await authApi.checkPhone({ phone: formData.phone });

    const errorText =
      mode === "login"
        ? "Пользователя с таким номером телефона не существует"
        : "Пользователь с таким номером телефона уже существует";

    if (
      (response.exists && mode === "register") ||
      (!response.exists && mode === "login")
    ) {
      setErrors({
        ...errors,
        phone: errorText,
      });
      return;
    }

    onSuccess({
      name: formData.name,
      phone: formData.phone,
      gender: formData.gender,
    });
  };

  return {
    handleSubmit,
    handlePhoneChange,
    formData,
    handleCheckboxChange,
    handleChangeGender,
    handleNameChange,
    errors,
  };
};
