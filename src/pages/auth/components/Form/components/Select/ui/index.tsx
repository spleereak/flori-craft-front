import React, { ChangeEvent } from "react";

import { cn } from "@/src/shared/lib/utils/cn";

import { SelectProps } from "../types";

export const Select: React.FC<SelectProps> = ({
  className,
  value,
  onChange,
}) => {
  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.value);

  return (
    <div
      className={cn(
        "desktop:gap-50 gap-30 flex flex-row items-center",
        className
      )}
    >
      <label className="desktop:gap-12 flex cursor-pointer flex-row items-center gap-11">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={value === "male"}
          onChange={handleGenderChange}
          className="peer hidden"
        />
        <div className="desktop:size-28 flex size-20 items-center justify-center rounded-full border border-black text-white transition-all peer-checked:bg-black peer-checked:[&>svg]:opacity-100">
          <svg
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="desktop:h-10 desktop:w-14 h-7 w-10 text-white opacity-0 transition-opacity"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.6543 0.388672C14.1322 0.888973 14.1121 1.68017 13.6096 2.15587L5.68628 9.65588C5.4446 9.88465 5.12142 10.0083 4.78804 9.99957C4.45466 9.99083 4.13847 9.85041 3.90921 9.60929L0.343726 5.8593C-0.132974 5.35793 -0.111153 4.56678 0.392465 4.09221C0.896083 3.61763 1.69079 3.63936 2.16749 4.14073L4.86789 6.98087L11.8792 0.344125C12.3817 -0.131573 13.1765 -0.111628 13.6543 0.388672Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text_p">Мужчина</p>
      </label>
      <label className="desktop:gap-12 flex cursor-pointer flex-row items-center gap-11">
        <input
          type="radio"
          name="gender"
          value="female"
          checked={value === "female"}
          onChange={handleGenderChange}
          className="peer hidden"
        />
        <div className="desktop:size-28 flex size-20 items-center justify-center rounded-full border border-black text-white transition-all peer-checked:bg-black peer-checked:[&>svg]:opacity-100">
          <svg
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="desktop:h-10 desktop:w-14 h-7 w-10 text-white opacity-0 transition-opacity"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.6543 0.388672C14.1322 0.888973 14.1121 1.68017 13.6096 2.15587L5.68628 9.65588C5.4446 9.88465 5.12142 10.0083 4.78804 9.99957C4.45466 9.99083 4.13847 9.85041 3.90921 9.60929L0.343726 5.8593C-0.132974 5.35793 -0.111153 4.56678 0.392465 4.09221C0.896083 3.61763 1.69079 3.63936 2.16749 4.14073L4.86789 6.98087L11.8792 0.344125C12.3817 -0.131573 13.1765 -0.111628 13.6543 0.388672Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text_p">Женщина</p>
      </label>
    </div>
  );
};
