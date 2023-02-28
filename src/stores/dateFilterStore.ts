import { create } from 'zustand'

interface DateFilterStore {
  date: string;
  setDate: (date: string) => void;
}

export const useDateFilterStore = create<DateFilterStore>()((set) => ({
  date: new Date().toISOString().slice(0, 7),
  setDate: (date: string) => set(() => ({ date: date })),
}));
