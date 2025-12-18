import { create } from "zustand";

import { ToastState } from "../types";

let timer: ReturnType<typeof setTimeout>;

export const useToastStore = create<ToastState>(set => ({
  isOpen: false,
  open: () => {
    clearTimeout(timer);

    set({ isOpen: true });

    timer = setTimeout(() => {
      set({ isOpen: false });
    }, 5000);
  },
  close: () => {
    clearTimeout(timer);
    set({ isOpen: false });
  },
}));
