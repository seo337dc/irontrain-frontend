import { create } from "zustand";

interface DateStore {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const useDateStore = create<DateStore>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set(() => ({ selectedDate: date })),
}));

export default useDateStore;
