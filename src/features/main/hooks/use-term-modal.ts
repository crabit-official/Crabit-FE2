import { create } from 'zustand';

interface ITermModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useTermModal = create<ITermModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useTermModal;
