import { create } from 'zustand';

interface IRegisterModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useRegisterModal = create<IRegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRegisterModal;
