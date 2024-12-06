import { create } from 'zustand';

interface IMarketingModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useMarketingModal = create<IMarketingModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useMarketingModal;
