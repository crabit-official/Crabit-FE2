import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { releaseChallenge } from '@/shared/apis/market';
import { queryKeys } from '@/shared/constants/query-keys';

function useReleaseChallenge(academyId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: releaseChallenge,
    onSuccess: async () => {
      toast.success('우리학원에 챌린지를 배포하였습니다!');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.CHALLENGE_LIST] });
      router.replace(`/academy/${academyId}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useReleaseChallenge;
