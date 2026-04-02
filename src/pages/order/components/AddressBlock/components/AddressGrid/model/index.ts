import { addDays, format, isToday, startOfDay } from "date-fns";
import { ru } from "date-fns/locale";

import { useState } from "react";

import { TIME_SLOTS, useOrderStore } from "../../../../../model/order.store";

export { TIME_SLOTS };

const MIN_HOURS_BEFORE_DELIVERY = 2;
const CUTOFF_HOUR_FOR_NEXT_DAY = 21;

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
    const minDeliveryTime = new Date(
      now.getTime() + MIN_HOURS_BEFORE_DELIVERY * 60 * 60 * 1000
    );
    const minHour = minDeliveryTime.getHours();
    const minMinutes = minDeliveryTime.getMinutes();

    return TIME_SLOTS.filter(slot => {
      const slotStartHour = parseInt(slot.split(":")[0], 10);
      return (
        slotStartHour > minHour ||
        (slotStartHour === minHour && minMinutes === 0)
      );
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
