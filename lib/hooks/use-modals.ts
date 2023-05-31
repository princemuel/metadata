import { create } from 'zustand';

interface ModalState {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRegisterModal = create<ModalState>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export const useLoginModal = create<ModalState>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export const useSearchModal = create<ModalState>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));
export const useRentModal = create<ModalState>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));
