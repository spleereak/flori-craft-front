"use client";

import { addYears, format, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

import {
  DateRestrictions,
  isOrderDateDisabled,
  MOTHERS_DAY_DATE_HINT,
} from "@/src/pages/order/lib/deliveryDateRules";
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

interface AddressGridProps {
  className?: string;
  dateRestrictions: DateRestrictions;
  errors?: {
    date?: string;
    time?: string;
  };
  // eslint-disable-next-line no-unused-vars
  onFieldChange?: (field: "date" | "time") => void;
}

export const AddressGrid = ({
  className,
  dateRestrictions,
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
              disabled={date =>
                dateRestrictions.status !== "ready" ||
                isOrderDateDisabled(
                  date,
                  today,
                  maxDate,
                  dateRestrictions.hasMothersDayProducts
                )
              }
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
        {dateRestrictions.status === "ready" &&
          dateRestrictions.hasMothersDayProducts && (
            <p className="caption text-grey-for-text">{MOTHERS_DAY_DATE_HINT}</p>
          )}
        {dateRestrictions.status === "loading" && (
          <p className="caption text-grey-for-text">Проверяем доступные даты...</p>
        )}
        {dateRestrictions.status === "error" && (
          <p className="caption text-red-500">
            Не удалось проверить доступные даты. Обновите страницу.
          </p>
        )}
        {errors?.date && <p className="caption text-red-500">{errors.date}</p>}
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
                <p className="caption text-grey-for-text px-16 py-12">
                  На сегодня нет доступных слотов
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
        {errors?.time && <p className="caption text-red-500">{errors.time}</p>}
      </div>
    </div>
  );
};
