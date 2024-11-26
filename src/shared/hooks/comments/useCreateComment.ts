import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postComment } from '@/shared/apis/comments';
import { queryKeys } from '@/shared/constants/query-keys';

function useCreateComment({
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
    mutationFn: postComment,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENT_LIST, { academyId }, { releasedChallengeId }, { studentChallengeLogId }] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useCreateComment;
