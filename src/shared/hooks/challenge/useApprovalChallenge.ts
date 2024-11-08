import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { approvalStudentChallengeResult } from '@/shared/apis/challenge';
import { queryKeys } from '@/shared/constants/query-keys';

function useApprovalChallenge({ academyId, releasedChallengeId }: { academyId: number; releasedChallengeId: number }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approvalStudentChallengeResult,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.CHALLENGE_STUDENT_PROGRESS_LIST, { academyId }, { releasedChallengeId }] });
      toast.success('승인 변경 완료');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useApprovalChallenge;
