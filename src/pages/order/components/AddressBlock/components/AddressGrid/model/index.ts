import { addDays, format, isToday, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

import { useState } from "react";

import { TIME_SLOTS, useOrderStore } from "../../../../../model/order.store";

export { TIME_SLOTS };

const CUTOFF_HOUR_FOR_NEXT_DAY = 21;

/** Начало интервала вида «10:00 - 12:00» в локальной дате выбранного дня */
function getSlotStartOnSelectedDay(
  slot: string,
  selectedDate: Date
): Date | null {
  const parts = slot.split(" - ");
  if (parts.length < 2) return null;
  const [sh, sm] = parts[0]!
    .trim()
    .split(":")
    .map(s => parseInt(s, 10));
  if (Number.isNaN(sh) || Number.isNaN(sm)) return null;
  return new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    sh,
    sm,
    0,
    0
  );
}

export const getAvailableTimeSlots = (
  selectedDate: Date | undefined
): string[] => {
  if (!selectedDate) {
    return [...TIME_SLOTS];
  }

  const now = new Date();
  const currentHour = now.getHours();

  const isNextDayAfterCutoff =
    !isToday(selectedDate) &&
    currentHour >= CUTOFF_HOUR_FOR_NEXT_DAY &&
    selectedDate >= startOfDay(addDays(now, 1));

  if (isNextDayAfterCutoff) {
    return TIME_SLOTS.slice(1);
  }

  if (isToday(selectedDate)) {
    return TIME_SLOTS.filter(slot => {
      const slotStart = getSlotStartOnSelectedDay(slot, selectedDate);
      if (!slotStart) return true;
      return slotStart > now;
    });
  }

  return [...TIME_SLOTS];
};

export const isTimeSlotAvailable = (
  selectedDate: Date | undefined,
  timeSlot: string
): boolean => {
  const availableSlots = getAvailableTimeSlots(selectedDate);
  return availableSlots.includes(timeSlot);
};

export const useAddressGrid = () => {
  const { delivery, setDelivery } = useOrderStore();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const fields = {
    apartment: delivery.apartment,
    floor: delivery.floor,
    entrance: delivery.entrance,
    intercom: delivery.intercom,
    date: delivery.date,
    time: delivery.time,
  };

  const availableTimeSlots = getAvailableTimeSlots(delivery.date);

  const handleFieldChange = (
    field: "apartment" | "floor" | "entrance" | "intercom",
    value: string
  ) => {
    setDelivery({ [field]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    const currentTime = delivery.time;
    const newAvailableSlots = getAvailableTimeSlots(date);

    if (currentTime && !newAvailableSlots.includes(currentTime)) {
      setDelivery({ date, time: "" });
    } else {
      setDelivery({ date });
    }
    setIsCalendarOpen(false);
  };

  const handleTimeSelect = (time: string) => {
    setDelivery({ time });
    setIsTimeOpen(false);
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return format(date, "d MMM", { locale: ru }).replace(".", "");
  };

  return {
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
  };
};
