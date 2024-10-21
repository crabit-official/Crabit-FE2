import { create } from 'zustand';

interface IChallengeStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useChallengeModal = create<IChallengeStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useChallengeModal;
