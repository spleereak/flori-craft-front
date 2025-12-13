/* eslint-disable no-unused-vars */
"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";

import React from "react";

import { cn } from "../../lib/utils/cn";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const RangeSlider = React.forwardRef(
  (
    {
      className,
      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = React.useState(initialValue);

    React.useEffect(() => {
      // Update localValues when the external value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max]);
    }, [min, max, value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn(
          "relative mb-24 flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="bg-brown/20 relative h-3 w-full grow overflow-hidden rounded-full">
          <SliderPrimitive.Range className="bg-brown absolute h-full" />
        </SliderPrimitive.Track>
        {localValues.map((_, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="border-brown/50 focus-visible:ring-ring bg-brown desktop:h-40 desktop:w-40 block h-16 w-16 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

RangeSlider.displayName = SliderPrimitive.Root.displayName;

export { RangeSlider };
