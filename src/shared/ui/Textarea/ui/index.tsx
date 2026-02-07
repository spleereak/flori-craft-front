import React, {
  type TextareaHTMLAttributes,
  forwardRef,
  useState,
} from "react";

import { cn } from "@/src/shared/lib/utils/cn";

interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "placeholder"
> {
  label: string;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, value, defaultValue, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!(value || defaultValue));

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const isLabelFloating = isFocused || hasValue;

    return (
      <div className="relative w-full">
        <textarea
          className={cn(
            "bg-light-grey p-25 desktop:w-627 caption w-full resize-none rounded-[0.9375rem] border-none outline-none",
            className
          )}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        <label
          className={cn(
            "left-25 caption text-grey-for-text absolute transition-all duration-200 ease-out",
            isLabelFloating
              ? "desktop:text-[0.7rem] top-3 text-[0.6rem]"
              : "desktop:text-[1rem] top-10 text-[0.75rem]"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
