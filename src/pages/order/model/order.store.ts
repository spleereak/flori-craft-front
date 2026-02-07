import { create } from "zustand";

interface PersonData {
  name: string;
  phone: string;
}

export type DeliveryZoneType = "JK" | "FILI" | "MKAD" | "NMKAD";

export const DELIVERY_PRICES: Record<DeliveryZoneType, number | null> = {
  JK: 350,
  FILI: 750,
  MKAD: 1200,
  NMKAD: null, // индивидуально
};

export const TIME_SLOTS = [
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
] as const;

export const TIME_SLOT_TO_API: Record<string, string> = {
  "10:00 - 12:00": "1",
  "12:00 - 14:00": "2",
  "14:00 - 16:00": "3",
  "16:00 - 18:00": "4",
  "18:00 - 20:00": "5",
  "20:00 - 22:00": "6",
};

interface DeliveryData {
  fullAddress: string;
  apartment: string;
  entrance: string;
  floor: string;
  intercom: string;
  date: Date | undefined;
  time: string;
}

interface OrderState {
  sender: PersonData;
  recipient: PersonData;
  delivery: DeliveryData;
  postcard: string;
  isSameAsSource: boolean;
  deliveryZone: DeliveryZoneType;

  setSender: (data: Partial<PersonData>) => void;
  setRecipient: (data: Partial<PersonData>) => void;
  setDelivery: (data: Partial<DeliveryData>) => void;
  setPostcard: (value: string) => void;
  setIsSameAsSource: (value: boolean) => void;
  setDeliveryZone: (zone: DeliveryZoneType) => void;
  getDeliveryPrice: () => number | null;
  fillRecipientFromSender: () => void;
  fillRecipientFromUser: (userData: PersonData) => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  sender: {
    name: "",
    phone: "",
  },
  recipient: {
    name: "",
    phone: "",
  },
  delivery: {
    fullAddress: "",
    apartment: "",
    entrance: "",
    floor: "",
    intercom: "",
    date: undefined,
    time: "",
  },
  postcard: "",
  isSameAsSource: false,
  deliveryZone: "JK",

  setSender: data =>
    set(state => ({
      sender: { ...state.sender, ...data },
    })),

  setRecipient: data =>
    set(state => ({
      recipient: { ...state.recipient, ...data },
    })),

  setDelivery: data =>
    set(state => ({
      delivery: { ...state.delivery, ...data },
    })),

  setPostcard: value => set({ postcard: value }),

  setIsSameAsSource: value => set({ isSameAsSource: value }),

  setDeliveryZone: zone => set({ deliveryZone: zone }),

  getDeliveryPrice: () => {
    const { deliveryZone } = get();
    return DELIVERY_PRICES[deliveryZone];
  },

  fillRecipientFromSender: () => {
    const { sender } = get();
    set({ recipient: { ...sender } });
  },

  fillRecipientFromUser: userData => {
    set({ recipient: { ...userData } });
  },
}));
