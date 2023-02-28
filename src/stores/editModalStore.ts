import { create } from 'zustand'

interface EditModalState {
  open: boolean;
  setOpen: () => void
}

export const useEditModalStore = create<EditModalState>()((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
}));
