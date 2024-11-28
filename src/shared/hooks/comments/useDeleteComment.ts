import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteComment } from '@/shared/apis/comments';
import { queryKeys } from '@/shared/constants/query-keys';

function useDeleteComment({
  academyId,
  studentChallengeLogId,
  releasedChallengeId,
}: {
  academyId: number;
  releasedChallengeId: number;
  studentChallengeLogId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENT_LIST, { academyId }, { releasedChallengeId }, { studentChallengeLogId }] });
      toast.success('삭제되었습니다.');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export default useDeleteComment;
