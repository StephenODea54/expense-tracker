import { create } from "zustand";

interface ExpenseIdState {
  id: string;
  setId: (id: string) => void;
  resetId: () => void;
}

export const useExpenseIdStore = create<ExpenseIdState>()((set) => ({
  id: "",
  setId: (id: string) => set((state) => ({ id: state.id + id })),
  resetId: () => set({ id: "" }),
}));
