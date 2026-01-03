import { ChangeEvent, FormEvent, useState } from "react";

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
      newErrors.phone = true;
    }

    if (!formData.agreedToPolicy) {
      newErrors.agreedToPolicy = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
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
