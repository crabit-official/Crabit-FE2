import { create } from 'zustand';

interface IInvitationModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useInvitationModal = create<IInvitationModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInvitationModal;
