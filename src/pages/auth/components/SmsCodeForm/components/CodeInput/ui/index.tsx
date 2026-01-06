import React, {
  ClipboardEvent,
  KeyboardEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/src/shared/lib/utils/cn";

interface CodeInputProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export interface CodeInputRef {
  focusFirst: () => void;
}

export const CodeInput = forwardRef<CodeInputRef, CodeInputProps>(
  ({ value, onChange, disabled = false, className }, ref) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const digits = value.padEnd(4, " ").split("").slice(0, 4);

    useImperativeHandle(ref, () => ({
      focusFirst: () => {
        inputRefs.current[0]?.focus();
      },
    }));

    const handleChange = (index: number, newValue: string) => {
      if (disabled) return;

      const digit = newValue.replace(/\D/g, "").slice(-1);

      const newDigits = [...digits];
      newDigits[index] = digit || " ";
      const newCode = newDigits.join("").trim();
      onChange(newCode);

      if (digit && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (disabled) return;

      if (e.key === "Backspace" && !digits[index].trim() && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      if (e.key === "ArrowRight" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      if (disabled) return;

      const pastedData = e.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 4);
      onChange(pastedData);

      const focusIndex = Math.min(pastedData.length, 3);
      inputRefs.current[focusIndex]?.focus();
    };

    return (
      <div className={cn("desktop:gap-58 gap-37 flex items-center", className)}>
        {digits.map((digit, index) => (
          <React.Fragment key={index}>
            <input
              ref={el => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit.trim()}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={disabled}
              className={cn(
                "desktop:w-68 desktop:h-90 w-46 h-58 text_sms border-b-2 border-black bg-transparent text-center transition-colors",
                disabled && "cursor-not-allowed opacity-50",
                "focus:border-black focus:outline-none"
              )}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
);

CodeInput.displayName = "CodeInput";
