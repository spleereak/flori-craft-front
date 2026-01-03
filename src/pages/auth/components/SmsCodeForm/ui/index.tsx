import React from "react";

import { cn } from "@/src/shared/lib/utils/cn";
import { Button } from "@/src/shared/ui";

import { CodeInput } from "../components";
import { useSmsForm } from "../model";
import { SmsCodeFormProps } from "../types";

export const SmsCodeForm: React.FC<SmsCodeFormProps> = ({ userData, mode }) => {
  const {
    handleCodeChange,
    handleResendCode,
    handleSubmit,
    error,
    canResend,
    code,
    isSubmitting,
    formatTime,
    timeLeft,
  } = useSmsForm({ mode, userData });

  return (
    <form
      className={cn(
        "bg-light-grey desktop:max-w-732 desktop:p-45 flex w-full flex-col items-center rounded-2xl p-16"
      )}
      onSubmit={handleSubmit}
    >
      <h3 className="h3 desktop:mb-34 mb-12">Введите код из SMS</h3>

      <p className="caption text-grey-for-text desktop:mb-42 mb-17">
        Мы отправили четырёхзначный код на номер {userData.phone}
      </p>

      <div className="desktop:mb-48 mb-37 desktop:gap-28 gap-17 flex flex-col items-center">
        <CodeInput
          value={code}
          onChange={handleCodeChange}
          disabled={isSubmitting}
          error={!!error}
        />
        {error && <p className="caption text-red">{error}</p>}
      </div>

      {canResend ? (
        <Button
          type="button"
          appearance="accent"
          className="desktop:w-334 w-204 text_p max-w-none bg-white"
          onClick={handleResendCode}
        >
          Отправить ещё один код
        </Button>
      ) : (
        <p className="text_p text-grey-for-text">
          Следующий код через {formatTime(timeLeft)}
        </p>
      )}
    </form>
  );
};
