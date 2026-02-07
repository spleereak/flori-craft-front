"use client";

import {
  addYears,
  format,
  isSunday,
  lastDayOfMonth,
  previousSunday,
  startOfDay,
} from "date-fns";
import { ru } from "date-fns/locale";

import { Calendar } from "@/src/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/shared/components/ui/popover";
import { ArrowDown } from "@/src/shared/icons/ArrowDown";
import { CalendarIcon } from "@/src/shared/icons/CalendarIcon";
import { cn } from "@/src/shared/lib/utils/cn";

import { useAddressGrid } from "../model";

const inputStyles =
  "desktop:rounded-2xl caption py-13 desktop:py-20 desktop:px-22 ring-none w-full rounded-md bg-light-grey px-16 transition-all duration-300 ease-in-out focus:border-2 focus:border-black focus:outline-none";

const getLastSundayOfNovember = (year: number): Date => {
  const lastDayOfNov = lastDayOfMonth(new Date(year, 10));
  if (isSunday(lastDayOfNov)) {
    return lastDayOfNov;
  }
  return previousSunday(lastDayOfNov);
};

const isDisabledDate = (date: Date, today: Date, maxDate: Date): boolean => {
  if (date < today || date > maxDate) return true;

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  // 13 и 14 февраля
  if (month === 1 && (day === 13 || day === 14)) return true;

  // 7 и 8 марта
  if (month === 2 && (day === 7 || day === 8)) return true;

  // Последнее воскресенье ноября и день перед ним (суббота)
  const lastSundayNov = getLastSundayOfNovember(year);
  if (
    month === 10 &&
    (day === lastSundayNov.getDate() || day === lastSundayNov.getDate() - 1) &&
    year === lastSundayNov.getFullYear()
  ) {
    return true;
  }

  return false;
};

interface AddressGridProps {
  className?: string;
  errors?: {
    date?: string;
    time?: string;
  };
  onFieldChange?: (field: "date" | "time") => void;
}

export const AddressGrid = ({
  className,
  errors,
  onFieldChange,
}: AddressGridProps) => {
  const {
    fields,
    isCalendarOpen,
    isTimeOpen,
    availableTimeSlots,
    setIsCalendarOpen,
    setIsTimeOpen,
    handleFieldChange,
    handleDateSelect,
    handleTimeSelect,
    formatDate,
  } = useAddressGrid();

  const today = startOfDay(new Date());
  const maxDate = addYears(today, 1);

  return (
    <div
      className={cn(
        "desktop:gap-13 grid grid-cols-2 grid-rows-3 gap-7",
        className
      )}
    >
      <input
        type="text"
        value={fields.apartment}
        onChange={e => handleFieldChange("apartment", e.target.value)}
        placeholder="Квартира"
        className={cn(inputStyles)}
      />
      <input
        type="text"
        value={fields.floor}
        onChange={e => handleFieldChange("floor", e.target.value)}
        placeholder="Этаж"
        className={cn(inputStyles)}
      />
      <input
        type="text"
        value={fields.entrance}
        onChange={e => handleFieldChange("entrance", e.target.value)}
        placeholder="Подъезд"
        className={cn(inputStyles)}
      />
      <input
        type="text"
        value={fields.intercom}
        onChange={e => handleFieldChange("intercom", e.target.value)}
        placeholder="Домофон"
        className={cn(inputStyles)}
      />
      <div className="flex flex-col gap-2">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                inputStyles,
                "flex cursor-pointer items-center justify-between text-left"
              )}
            >
              <span
                className={fields.date ? "text-black" : "text-grey-for-text"}
              >
                {fields.date ? formatDate(fields.date) : "Выберите дату"}
              </span>
              <CalendarIcon />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={fields.date}
              onSelect={date => {
                handleDateSelect(date);
                onFieldChange?.("date");
              }}
              disabled={date => isDisabledDate(date, today, maxDate)}
              defaultMonth={today}
              formatters={{
                formatCaption: date => {
                  const formatted = format(date, "LLLL yyyy", { locale: ru });
                  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
                },
              }}
            />
          </PopoverContent>
        </Popover>
        {errors?.date && (
          <p className="caption text-red-500">{errors.date}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Popover open={isTimeOpen} onOpenChange={setIsTimeOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                inputStyles,
                "flex cursor-pointer items-center justify-between text-left"
              )}
            >
              <span
                className={fields.time ? "text-black" : "text-grey-for-text"}
              >
                {fields.time || "Выберите время"}
              </span>
              <ArrowDown
                className={cn(
                  "transition-transform duration-200",
                  isTimeOpen && "rotate-180"
                )}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-200 p-0" align="start">
            <div className="flex flex-col">
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      handleTimeSelect(slot);
                      onFieldChange?.("time");
                    }}
                    className={cn(
                      "caption hover:bg-light-grey px-16 py-12 text-left transition-colors",
                      fields.time === slot && "bg-light-grey font-medium"
                    )}
                  >
                    {slot}
                  </button>
                ))
              ) : (
                <p className="caption px-16 py-12 text-grey-for-text">
                  На сегодня нет доступных слотов
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        {errors?.time && (
          <p className="caption text-red-500">{errors.time}</p>
        )}
      </div>
    </div>
  );
};
