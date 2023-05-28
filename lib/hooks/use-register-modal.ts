import { create } from 'zustand';

interface RegisterModalState {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModal = create<RegisterModalState>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));
