import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import createChallenges from '@/features/academy/(workspace)/api/post-academy-challenges';
import { queryKeys } from '@/shared/constants/query-keys';

const useCreateChallenges = (academyId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: createChallenges,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.CHALLENGE_LIST] });
      toast.success('챌린지가 생성되었습니다.');
      router.replace(`/academy/${academyId}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export default useCreateChallenges;
