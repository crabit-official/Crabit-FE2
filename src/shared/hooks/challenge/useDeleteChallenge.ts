import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { deleteChallenge } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

function useApprovalChallenge({ academyId }: { academyId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteChallenge,
    onSuccess: async () => {
      toast.success('삭제 되었습니다.');
      await queryClient.invalidateQueries({ queryKey: [queryKeys.CHALLENGE_LIST] });
      router.replace(`/academy/${academyId}/dashboard`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useApprovalChallenge;
