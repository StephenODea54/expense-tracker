import { create } from 'zustand'

interface AddModalState {
  open: boolean;
  setOpen: () => void
}

export const useAddModalStore = create<AddModalState>()((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
}));
