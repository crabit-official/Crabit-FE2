import { QueryClient } from '@tanstack/query-core';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import createChallenges from '@/features/academy/(workspace)/api/post-academy-challenges';
import useChallengeModal from '@/features/academy/(workspace)/hooks/use-challenge-modal';
import { queryKeys } from '@/shared/constants/query-keys';

const useCreateChallenges = () => {
  const challengeModal = useChallengeModal();
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: createChallenges,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.CHALLENGE_LIST] });
      toast.success('챌린지가 생성되었습니다.');
      challengeModal.onClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
export default useCreateChallenges;
