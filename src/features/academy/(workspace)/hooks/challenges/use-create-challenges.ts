import { useMutation } from '@tanstack/react-query';

import createChallenges from '@/features/academy/(workspace)/api/post-academy-challenges';
import useChallengeModal from '@/features/academy/(workspace)/hooks/use-challenge-modal';

const useCreateChallenges = () => {
  const challengeModal = useChallengeModal();

  return useMutation({
    mutationFn: createChallenges,
    onSuccess: () => {
      challengeModal.onClose();
    },
  });
};
export default useCreateChallenges;
