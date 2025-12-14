import * as React from "react";

import { cn } from "@/src/shared/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "placeholder:text-muted-foreground text_p desktop:h-61 h-39 desktop:w-160 w-98 flex rounded-2xl border border-[#03030640] bg-white px-12 py-8 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
