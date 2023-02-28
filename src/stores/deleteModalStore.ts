import { create } from 'zustand'

interface DeleteModalState {
  open: boolean;
  setOpen: () => void
}

export const useDeleteModalStore = create<DeleteModalState>()((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
}));
