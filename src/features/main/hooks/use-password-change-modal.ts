import { create } from 'zustand';

interface IUsePasswordChangeModal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const usePasswordChangeModal = create<IUsePasswordChangeModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePasswordChangeModal;
