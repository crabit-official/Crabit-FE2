import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { blockComment } from '@/shared/apis/comments';
import { queryKeys } from '@/shared/constants/query-keys';

function useBlockComment({
  academyId,
  releasedChallengeId,
  studentChallengeLogId,
}: {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockComment,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENT_LIST, { academyId }, { releasedChallengeId }, { studentChallengeLogId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useBlockComment;
