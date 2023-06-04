import { create } from 'zustand';

interface ModalState {
  show: boolean;
  open: () => void;
  close: () => void;
}

export const useRegisterModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useLoginModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));

export const useSearchModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));
export const useRentModal = create<ModalState>((set) => ({
  show: false,
  open: () => set({ show: true }),
  close: () => set({ show: false }),
}));
