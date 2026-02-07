import { format, isToday } from "date-fns";
import { ru } from "date-fns/locale";

import { useState } from "react";

import { TIME_SLOTS, useOrderStore } from "../../../../../model/order.store";

export { TIME_SLOTS };

const MIN_HOURS_BEFORE_DELIVERY = 2;

/**
 * Получает доступные временные слоты для выбранной даты.
 * Если выбран сегодняшний день, фильтрует слоты так, чтобы
 * начало слота было минимум через 2 часа от текущего времени.
 */
export const getAvailableTimeSlots = (selectedDate: Date | undefined): string[] => {
  if (!selectedDate || !isToday(selectedDate)) {
    return [...TIME_SLOTS];
  }

  const now = new Date();
  const minDeliveryTime = new Date(now.getTime() + MIN_HOURS_BEFORE_DELIVERY * 60 * 60 * 1000);
  const minHour = minDeliveryTime.getHours();
  const minMinutes = minDeliveryTime.getMinutes();

  return TIME_SLOTS.filter(slot => {
    // Извлекаем начальный час слота (например, "10:00 - 12:00" -> 10)
    const slotStartHour = parseInt(slot.split(":")[0], 10);
    // Слот доступен, если начинается после минимального времени
    return slotStartHour > minHour || (slotStartHour === minHour && minMinutes === 0);
  });
};

/**
 * Проверяет, доступен ли выбранный временной слот для указанной даты.
 */
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

  // Получаем доступные слоты для выбранной даты
  const availableTimeSlots = getAvailableTimeSlots(delivery.date);

  const handleFieldChange = (
    field: "apartment" | "floor" | "entrance" | "intercom",
    value: string
  ) => {
    setDelivery({ [field]: value });
  };

  const handleDateSelect = (date: Date | undefined) => {
    // Проверяем, доступен ли текущий выбранный слот для новой даты
    const currentTime = delivery.time;
    const newAvailableSlots = getAvailableTimeSlots(date);

    // Если текущий слот недоступен для новой даты - сбрасываем время
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
