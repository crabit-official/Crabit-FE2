import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { applyPublicChallenge } from '@/shared/apis/market';
import { queryKeys } from '@/shared/constants/query-keys';

function useApplyChallenge(academyId: number) {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyPublicChallenge,
    onSuccess: async () => {
      toast.success('챌린지 추가 완료! 챌린지를 시작해보세요');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.STUDENT_CHALLENGE_LIST, { academyId }] });
      router.push(`/academy/${academyId}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useApplyChallenge;
