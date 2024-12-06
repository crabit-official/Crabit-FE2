import { create } from 'zustand';

interface IServiceModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useServiceModal = create<IServiceModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useServiceModal;
